import { TableId } from "@modules/tables/domain/Table";
import { Order, OrderStatus } from "./Order";

export interface OrderRepository {
  getAllOrders(): Promise<Order[]> | Order[];
  getOrdersByTableId(id: TableId): Promise<Order[]> | Order[];
  finishTableOrder(id: TableId): Promise<void> | void;
  updateOrderStatus(id: number, status: OrderStatus): Promise<boolean> | boolean;
  addOrder(body: any): Promise<void> | void;
}
