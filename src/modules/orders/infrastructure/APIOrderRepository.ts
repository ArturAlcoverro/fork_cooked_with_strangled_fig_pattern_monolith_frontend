import { Table, TableId } from '@modules/tables/domain/Table'
import { ORDER_STATUS_FINISHED, Order, OrderId, OrderStatus } from '../domain/Order'
import { OrderRepository } from '../domain/OrderRepository'

export class APIOrderRepository implements OrderRepository {
  baseUrl = import.meta.env.VITE_BACKEND_API_URL
  endpoint = '/order'

  getAllOrders(): Promise<Order[]> {
    return fetch(`${this.baseUrl}${this.endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Response Error on "${this.endpoint}"`)
        return res.json()
      })
      .then((json) => {
        return json.map((order: any) => {
          return {
            id: order.id,
            table: order.table,
            status: order.status.toUpperCase(),
            dishes: order.dishes
          }
        })
      })
  }

  async getOrdersByTableId(id: TableId): Promise<Order[]> {
    const orders = (await this.getAllOrders()) as Order[]
    return orders
      .filter((order: Order) => order.table === id)
      .filter((order) => ![ORDER_STATUS_FINISHED].includes(order.status))
  }

  async finishTableOrder(id: TableId): Promise<void> {
    const orders = (await this.getOrdersByTableId(id)) as Order[]

    orders.forEach((order) => {
      this.updateOrderStatus(order.id, ORDER_STATUS_FINISHED)
    })
  }

  async addOrder(order: any): Promise<void> {
    const raw = JSON.stringify(order)

    return fetch(`${this.baseUrl}${this.endpoint}`, {
      method: 'POST',
      body: raw,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Response Error on "${this.endpoint}"`)
      return res.json()
    })
  }

  async updateOrderStatus(id: OrderId, status: OrderStatus): Promise<boolean> {
    const raw = JSON.stringify({ status })

    return fetch(`${this.baseUrl}${this.endpoint}/${id}`, {
      method: 'PUT',
      body: raw,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.ok
      })
      .catch((err) => {
        return false
      })
  }
}
