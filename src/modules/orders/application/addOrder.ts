import { OrderRepository } from "../domain/OrderRepository";

export async function addOrder(repository: OrderRepository, body: any): Promise<void> {
  await repository.addOrder(body)
}