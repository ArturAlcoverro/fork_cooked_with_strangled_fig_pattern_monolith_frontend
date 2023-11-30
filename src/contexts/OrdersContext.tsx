import { Order, OrderStatus, OrderId } from '@modules/orders/domain/Order'
import { OrderRepository } from '@modules/orders/domain/OrderRepository'
import { TableId } from '@modules/tables/domain/Table'
import React, { useContext } from 'react'

export interface ContextState {
  getAllOrders: () => Promise<Order[]>
  getOrdersByTableId: (id: TableId) => Promise<Order[]>
  updateOrderStatus: (id: OrderId, status: OrderStatus) => Promise<boolean>
  finishTableOrder: (id: TableId) => Promise<void>
  addOrder: (body: any) => Promise<void>
}
export const OrdersContext = React.createContext({} as ContextState)

export const OrdersContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: OrderRepository }>) => {
  async function getAllOrders(): Promise<Order[]> {
    return await repository.getAllOrders()
  }

  async function getOrdersByTableId(id: TableId): Promise<Order[]> {
    return await repository.getOrdersByTableId(id)
  }

  async function finishTableOrder(id: TableId): Promise<void> {
    return await repository.finishTableOrder(id)
  }

  async function addOrder(body: any): Promise<void> {
    return await repository.addOrder(body)
  }

  async function updateOrderStatus(id: OrderId, status: OrderStatus): Promise<boolean> {
    return await repository.updateOrderStatus(id, status)
  }

  return (
    <OrdersContext.Provider
      value={{
        getAllOrders,
        getOrdersByTableId,
        updateOrderStatus,
        finishTableOrder,
        addOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrdersContext = () => useContext(OrdersContext)
