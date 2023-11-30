import { Modal } from '@components/Modal/Modal'
import { Order } from '@modules/orders/domain/Order'
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg'
import style from './OrderModal.module.scss'

export const OrderModal: React.FC<OrderModalProps> = ({ order, modalRef, setOpen }) => {
  return (
    <Modal modalRef={modalRef} setOpen={setOpen} outsideClose={true} className={style.modal}>
      <div className={style.header}>
        <h2>{`Order #${order.id}`}</h2>
        <button
          onClick={() => {
            setOpen(false)
          }}
          type="button"
          className="text-white  hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
        >
          <CloseIcon className="w-4 h-4" fill="var(--font-color-secondary)" />
        </button>
      </div>
      <div className={style.divider} />
      <div className={style.order}>
        {order.dishes.map((dish: any) => (
          <div className={style.order__dish} key={dish.dish.id}>
            <p className={style.order__dish__quantity}>x{dish.quantity}</p>
            <p className={style.order__dish__name}>{dish.dish.name}</p>
          </div>
        ))}
      </div>
    </Modal>
  )
}

interface OrderModalProps {
  order: Order
  modalRef: React.RefObject<HTMLDialogElement>
  setOpen: (bool: boolean) => void
}
