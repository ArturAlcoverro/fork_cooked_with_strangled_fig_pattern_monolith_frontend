import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/OrderRepository";

export async function getAllOrders(repository: OrderRepository): Promise<Order[]> {
  return await repository.getAllOrders()
}