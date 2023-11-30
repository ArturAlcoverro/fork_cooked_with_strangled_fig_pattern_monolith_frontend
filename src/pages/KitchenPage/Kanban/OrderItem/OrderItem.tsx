import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Order } from '@modules/orders/domain/Order'
import { OrderModal } from './OrderModal/OrderModal'
import useModal from '@components/Modal/useModal'

export const OrderItem: React.FC<OrderItemProps> = ({ order, tableNumber, disable = false }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: order.id,
    data: order,
    disabled: disable,
  })

  const { modalRef, setOpen } = useModal()

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        rotate: "4deg",
        zIndex: 10,
      }
    : undefined

  const dishesStrings = []

  for (let i = 0; i < order.dishes.length; i++) {
    if (i === 4) {
      dishesStrings.push(`and ${order.dishes.length - 4} more`)
      break
    }
    dishesStrings.push(`x${order.dishes[i].quantity} - ${order.dishes[i].dish.name}`)
  }

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-white rounded-lg py-2 px-4 shadow-[0_0_20px_0_rgba(202,211,235,0.37)]"
        onClick={() => setOpen(true)}
      >
        <div className="flex justify-between">
          <p className="font-bold">Order #{order.id}</p>
          <p className="font-bold">Table #{tableNumber > 9 ? tableNumber : `0${tableNumber}`}</p>
        </div>
        <div className="mt-2">
          {dishesStrings.map((str: string) => (
            <p key={str} className="pl-2 truncate text-[var(--font-color-secondary)]">
              {str}
            </p>
          ))}
        </div>
      </div>
      <OrderModal modalRef={modalRef} setOpen={setOpen} order={order} />
    </>
  )
}

interface OrderItemProps {
  order: Order
  tableNumber: number
  disable?: boolean
}
