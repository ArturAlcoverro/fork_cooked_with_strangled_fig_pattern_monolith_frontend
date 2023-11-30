import { Order, OrderId, OrderStatus } from "../domain/Order";
import { OrderRepository } from "../domain/OrderRepository";

export async function updateOrderStatus(repository: OrderRepository, orderId: OrderId, status: OrderStatus): Promise<boolean> {
  return await repository.updateOrderStatus(orderId, status)
}