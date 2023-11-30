import { Modal } from '@components/Modal/Modal'
import style from './DishesModal.module.scss'
import { Button } from '@components/Button/Button'

import { ReactComponent as AddIcon } from '@assets/icons/add.svg'
import { ReactComponent as MinusIcon } from '@assets/icons/minus.svg'
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg'

import { useDishes } from './useDishes'
import { Dish } from '@modules/dishes/domain/Dish'
import { useState } from 'react'
import { useOrdersContext } from 'src/contexts/OrdersContext'

export const DishesModal: React.FC<DishesModalProps> = ({
  dishes,
  tableId,
  modalRef,
  orderDishes = [],
  setOpen,
  onClose = () => {},
}) => {
  const { selectedDishes, increaseSelectedDish, decreaseSelectedDish, clearSelectedDishes } = useDishes(dishes)
  const [dishesView, setDishesView] = useState<boolean>(true)
  const { finishTableOrder, addOrder } = useOrdersContext()

  function closeModal() {
    onClose()
    setOpen(false)
    setDishesView(true)
    clearSelectedDishes()
  }

  function finishOrder() {
    finishTableOrder(tableId).then(() => {
      setTimeout(() => {
        closeModal()
      }, 300)
    })
  }

  function createOrder(tableId: number, dishes: Map<number, number>) {
    const orderDishes = Array.from(selectedDishes).map(([dishId, quantity]) => ({
      dishId,
      quantity,
    }))

    if (orderDishes.length === 0) return closeModal()

    addOrder({ tableId: tableId, orderDishes: orderDishes }).then(() => {
      closeModal()
    })
  }

  return (
    <Modal modalRef={modalRef} setOpen={setOpen} outsideClose={true} className={style.modal}>
      <div className={style.header}>
        <h2>{dishesView ? 'Dishes' : 'Order'}</h2>
        <button
          onClick={closeModal}
          type="button"
          className="text-white  hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
        >
          <CloseIcon className="w-4 h-4" fill="var(--font-color-secondary)" />
        </button>
      </div>
      <div className={style.divider} />
      {dishesView ? (
        <div className={style.dishes}>
          {dishes.map((dish: Dish) => (
            <div key={dish.id}>
              <div className={style.dishItem} key={dish.id}>
                <div className={style.img}>
                  <object data={`/img/${dish.name.replace(/ /g, '+')}.jpg`} type="image/jpg">
                    <img src={dish.image} alt={`${dish.name} image`} />
                  </object>
                </div>
                <div className={style.name}>
                  <p>{dish.name}</p>
                </div>
              </div>
              <div className={style.counter}>
                <button onClick={() => decreaseSelectedDish(dish.id)}>
                  <MinusIcon />
                </button>
                <div className={style.count}>{selectedDishes.get(dish.id) ?? 0}</div>
                <button onClick={() => increaseSelectedDish(dish.id)}>
                  <AddIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.order}>
          {orderDishes.map((dish: any) => (
            <div className={style.order__dish} key={dish.id}>
              <p className={style.order__dish__quantity}>x{dish.quantity}</p>
              <p className={style.order__dish__name}>{dish.name}</p>
              <p className={style.order__dish__price}>{`
                ${(dish.quantity * dish.price).toFixed(2)} €`}</p>
            </div>
          ))}
        </div>
      )}
      <div className={style.divider} />
      {!dishesView && (
        <div className={style.total}>
          <p>Total:</p>
          <p>{orderDishes.reduce((acc: number, dish: any) => {
            return acc + dish.quantity * dish.price
          }, 0).toFixed(2)} €</p>
        </div>
      )}
      <div className={style.footer}>
        <Button
          text={dishesView ? 'View order' : 'Order dishes'}
          onClick={() => {
            setDishesView(!dishesView)
          }}
        />
        {dishesView ? (
          <div>
            <Button
              text="Cancel"
              outline={false}
              onClick={() => {
                closeModal()
              }}
            />
            <Button
              variant="primary"
              text="Order"
              onClick={() => {
                createOrder(tableId, selectedDishes)
              }}
            />
          </div>
        ) : (
          <div>
            <Button variant="primary" text="Finish order" onClick={finishOrder} />
          </div>
        )}
      </div>
    </Modal>
  )
}

export interface DishesModalProps {
  dishes: Dish[]
  tableId: number
  modalRef: React.RefObject<HTMLDialogElement>
  orderDishes: any[]
  setOpen: (bool: boolean) => void
  onClose?: () => void
}
