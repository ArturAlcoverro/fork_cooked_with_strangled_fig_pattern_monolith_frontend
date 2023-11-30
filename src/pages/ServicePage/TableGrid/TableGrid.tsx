import { ReactComponent as AddIcon } from '@assets/icons/add.svg'
import { ReactComponent as TrashIcon } from '@assets/icons/trash.svg'
import { Button } from '@components/Button/Button'
import { Dish } from '@modules/dishes/domain/Dish'
import { useEffect, useState } from 'react'
import { useDishesContext } from 'src/contexts/DishesContext'
import { Table } from './Table/Table'
import style from './TableGrid.module.scss'
import useOrders from '../../../hooks/useOrders'
import useTables from './useTables'

export const TableGrid: React.FC = () => {
  const { tables, addTable, removeTable } = useTables()

  const [deleteMode, setDeleteMode] = useState(false)
  const [dishes, setDishes] = useState<Dish[]>([])

  const { getAllDishes } = useDishesContext()

  useEffect(() => {
    getAllDishes().then((dishes) => {
      setDishes(dishes)
    })
  }, [])

  function _removeTable(id: number) {
    removeTable(id)
    setDeleteMode(false)
  }

  return (
    <div className={style.table_grid}>
      <div className={style.head}>
        <h1>Restaurant service</h1>
        <div className={style.actions}>
          <Button text="Add table" icon={<AddIcon />} onClick={addTable} />
          <Button
            text={!deleteMode ? 'Remove table' : 'Cancel'}
            icon={<TrashIcon />}
            onClick={() => {
              setDeleteMode(!deleteMode)
            }}
          />
        </div>
      </div>
      <div className={style.grid}>
        {tables.map((table: any, i: number) => (
          <Table
            dishes={dishes}
            key={table.id.value}
            id={table.id.value}
            number={i + 1}
            deleteMode={deleteMode}
            deleteFunction={_removeTable}
          />
        ))}
      </div>
    </div>
  )
}
