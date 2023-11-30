import { Dish } from './Dish'

export interface DishesRepository {
  getAllDishes(): Promise<Dish[]> | Dish[]
}
