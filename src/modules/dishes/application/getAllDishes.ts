import { Dish } from '../domain/Dish'
import { DishesRepository } from '../domain/DishesRepository'

export async function getAllDishes(repository: DishesRepository): Promise<Dish[]> {
  return await repository.getAllDishes()
}
