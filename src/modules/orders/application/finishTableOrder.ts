import { Order } from "../domain/Order";
import { OrderRepository } from "../domain/OrderRepository";

export async function finishTableOrder(repository: OrderRepository, tableId: number): Promise<void> {
  await repository.finishTableOrder(tableId)
}