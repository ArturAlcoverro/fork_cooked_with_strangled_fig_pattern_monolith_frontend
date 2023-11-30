import { useEffect, useState } from 'react'
import { getAllOrders } from '@modules/orders/application/getAllOrders'
import { APIOrderRepository } from '@modules/orders/infrastructure/APIOrderRepository'
import { Order, OrderTable } from '@modules/orders/domain/Order'

export default function useOrders() {
  const [orders, setOrders] = useState<Map<OrderTable, Order>>(new Map())

  function refreshOrders() {
    const _orders = new Map<number, any>()
    getAllOrders(new APIOrderRepository()).then((res) => {
      res.map((order: Order) => {
        _orders.set(order.table, order)
      })
      setOrders(_orders)
    })
  }

  useEffect(() => {
    refreshOrders()
  }, [])

  return {
    orders,
    refreshOrders,
  }
}
