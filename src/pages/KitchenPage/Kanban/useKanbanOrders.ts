import { Order, OrderStatus } from '@modules/orders/domain/Order'
import { useEffect, useState } from 'react'
import { useOrdersContext } from 'src/contexts/OrdersContext'
import { useTablesContext } from 'src/contexts/TablesContext'

export function useKanbanOrders() {
  const { getAllOrders, updateOrderStatus } = useOrdersContext()
  const { getTablesNumber } = useTablesContext()
  const [orders, setOrders] = useState<Order[]>([])
  const [tablesNumbers, setTablesNumbers] = useState<Map<number, number>>(new Map())

  async function refreshOrders() {
    getAllOrders().then((orders) => {
      setOrders(orders)
    })
  }

  async function updateStatus(id: number, status: OrderStatus) {
    const _orders: Order[] = []

    orders.forEach((order) => {
      if (order.id === id) {
        order.status = status
      }
      _orders.push(order)
    })

    setOrders(_orders)

    return await updateOrderStatus(id, status)
  }

  useEffect(() => {
    getTablesNumber().then((tablesNumbers) => {
      setTablesNumbers(tablesNumbers)
      refreshOrders()
    })
  }, [])

  return { orders, updateOrderStatus: updateStatus, refreshOrders, tablesNumbers }
}
