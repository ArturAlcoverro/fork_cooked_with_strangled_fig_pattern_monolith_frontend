import { DndContext, useSensors, useSensor, PointerSensor } from '@dnd-kit/core'
import { useState } from 'react'
import { Column } from './Column/Column'
import { OrderItem } from './OrderItem/OrderItem'
import { useKanbanOrders } from './useKanbanOrders'
import { ORDER_STATUS_REQUESTED, ORDER_STATUS_PENDING, ORDER_STATUS_COMPLETED } from '@modules/orders/domain/Order'

const COLUMN_REQUESTED = 'Requested'
const COLUMN_IN_PROGRESS = 'In progress'
const COLUMN_COMPLETED = 'Completed'

const columns = [
  {
    label: COLUMN_REQUESTED,
    status: ORDER_STATUS_REQUESTED,
  },
  {
    label: COLUMN_IN_PROGRESS,
    status: ORDER_STATUS_PENDING,
  },
  {
    label: COLUMN_COMPLETED,
    status: ORDER_STATUS_COMPLETED,
  },
]

export const Kanban: React.FC<KanbanProps> = ({}) => {
  const [dragging, setDragging] = useState<boolean>(false)
  const [disableDragging, setDisableDragging] = useState<boolean>(false)
  const { orders, updateOrderStatus, refreshOrders, tablesNumbers } = useKanbanOrders()
  // const { orders, refreshOrders } = useOrders()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  function onDragStartHandler(event: any) {
    setDragging(true)
  }

  function onDragEndHandler(event: any) {
    const orderId = event.active.id
    const prevStatus = event.active.data.current.status
    const status = event.over?.id

    setDisableDragging(true)

    if (status && prevStatus !== status) {
      updateOrderStatus(orderId, status).then(() => {
        refreshOrders().then(() => {
          setDisableDragging(false)
        })
      })
    } else {
      setDisableDragging(false)
    }
    setDragging(false)
  }

  function onDragCancelHandler(event: any) {
    setDragging(false)
  }

  const styles = dragging ? 'overflow-hidden' : 'overflow-x-scroll overflow-y-visible '

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      onDragCancel={onDragCancelHandler}
    >
      <div className={`pt-5 flex flex-1 gap-5 px-5 ${styles}`}>
        {columns.map(({ label, status }) => (
          <Column key={label} columnName={label} status={status}>
            {orders
              .filter((order) => order.status === status)
              .map((order) => (
                <OrderItem
                  key={order.id}
                  tableNumber={tablesNumbers.get(order.table) ?? 0}
                  order={order}
                  disable={disableDragging}
                />
              ))}
          </Column>
        ))}
      </div>
    </DndContext>
  )
}

interface KanbanProps {}
