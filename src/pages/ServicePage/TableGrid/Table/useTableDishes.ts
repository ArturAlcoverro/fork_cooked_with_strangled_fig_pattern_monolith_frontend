import { ORDER_STATUS_COMPLETED, ORDER_STATUS_FINISHED, Order } from '@modules/orders/domain/Order'
import { TableId } from '@modules/tables/domain/Table'
import { useEffect, useState } from 'react'
import { useOrdersContext } from 'src/contexts/OrdersContext'

export function useTableDishes(id: TableId) {
  const [orderDishes, setOrderDishes] = useState<any[]>([])
  const [notCompletedOrderDishes, setNotCompletedOrderDishes] = useState<any[]>([])
  const [hasOrder, setHasOrder] = useState<boolean>(false)
  const { getOrdersByTableId } = useOrdersContext()

  function refreshDishes() {
    getOrdersByTableId(id).then((orders) => {
      setHasOrder(orders.length > 0)
      setOrderDishes(parseOrders(orders))
      setNotCompletedOrderDishes(parseOrders(
        orders.filter((order) => ![ORDER_STATUS_COMPLETED].includes(order.status))
      ))
    })
  }

  useEffect(refreshDishes, [])

  return { hasOrder, orderDishes, notCompletedOrderDishes, refreshDishes }
}

function parseOrders(orders: Order[]) {
  const orderDishes = orders.reduce((acc: any[], order: Order) => {
    
    const orderDishes = order.dishes.map((dish) => {
      return {
        id: dish.dish.id,
        image: dish.dish.image,
        name: dish.dish.name,
        price: dish.dish.price,
        quantity: dish.quantity,
      }
    })
    return [...acc, ...orderDishes]
  }, [])

  const dishesSummationMap = new Map<number, any>()

  orderDishes.forEach((dish: any) => {
    if (dishesSummationMap.has(dish.id)) {
      const currentDish = dishesSummationMap.get(dish.id)
      dishesSummationMap.set(dish.id, { ...dish, quantity: currentDish.quantity + dish.quantity })
    } else {
      dishesSummationMap.set(dish.id, dish)
    }
  })

  return Array.from(dishesSummationMap.values())
}
