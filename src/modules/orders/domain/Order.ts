export interface Order {
  id: OrderId
  status: OrderStatus 
  table: OrderTable
  dishes: OrderDish[]
}

export interface OrderDish {
  quantity: number
  dish: {
    id: number
    name: string
    price: number
    image: string
  }
}

export type OrderId = number

export const ORDER_STATUS_REQUESTED = "REQUESTED";
export const ORDER_STATUS_PENDING = "PENDING";
export const ORDER_STATUS_COMPLETED = "COMPLETED";
export const ORDER_STATUS_FINISHED = "FINISHED";

export type OrderStatus = "REQUESTED" | "PENDING" | "COMPLETED" | "FINISHED";

export type OrderTable = number