import { TableId } from '@modules/tables/domain/Table'
import { Order } from '../domain/Order'
import { OrderRepository } from '../domain/OrderRepository'

export async function getTableOrders(repository: OrderRepository, tableId: TableId): Promise<Order[]> {
  return await repository.getOrdersByTableId(tableId)
}
