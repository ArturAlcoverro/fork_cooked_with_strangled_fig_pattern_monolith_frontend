import { useCallback, useEffect, useState } from 'react'
import style from './Table.module.scss'
import { ReactComponent as TrashIcon } from '@assets/icons/trash.svg'
import { useTableDishes } from './useTableDishes'
import useModal from '@components/Modal/useModal'
import { DishesModal } from '../DishesModal/DishesModal'
import { Dish } from '@modules/dishes/domain/Dish'

export const Table: React.FC<TableProps> = ({ id, number, deleteMode, deleteFunction, dishes }) => {
  const { hasOrder, orderDishes, notCompletedOrderDishes, refreshDishes } = useTableDishes(id)
  const { modalRef, setOpen } = useModal()

  const clickHandler = useCallback(async () => {
    if (deleteMode) {
      deleteFunction(id)
    } else {
      setOpen(true)
    }
  }, [id, deleteMode])

  function onClose() {
    refreshDishes()
  }

  let dishesStrings = []

  for (let i = 0; i < notCompletedOrderDishes.length; i++) {
    if (i === 4) {
      dishesStrings.push(`and ${notCompletedOrderDishes.length - 4} more`)
      break
    }
    dishesStrings.push(`x${notCompletedOrderDishes[i].quantity} - ${notCompletedOrderDishes[i].name}`)
  }

  return (
    <div
      className={`
        ${style.table} 
        ${deleteMode ? style['table--delete'] : ''} 
        ${!hasOrder ? style['table--no-order'] : ''}
      `}
      onClick={clickHandler}
    >
      <div className={style.table__chairs}>
        <div className={style.table__chairs__chair} />
        <div className={style.table__chairs__chair} />
      </div>

      <div className={style.table__table}>
        <p className={style.table__table__id}>{number > 9 ? '' + number : '0' + number}</p>
        <div className={style.table__table__dishes}>
          {dishesStrings.map((str: string) => (
            <p key={str} className="small-text">{str}</p>
          ))}
        </div>
      </div>

      {deleteMode && (
        <div className={style.table__close_icon}>
          <TrashIcon />
        </div>
      )}

      <DishesModal
        modalRef={modalRef}
        setOpen={setOpen}
        tableId={id}
        dishes={dishes}
        onClose={onClose}
        orderDishes={orderDishes}
      />

      <div className={style.table__chairs}>
        <div className={style.table__chairs__chair} />
        <div className={style.table__chairs__chair} />
      </div>
    </div>
  )
}

interface TableProps {
  dishes: Dish[]
  id: number
  number: number
  deleteMode: boolean
  deleteFunction: (id: number) => void
}
