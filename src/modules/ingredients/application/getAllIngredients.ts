import { Ingredient } from '../domain/Ingredient'
import { IngredientsRepository } from '../domain/IngredientsRepository'

export async function getAllIngredients(repository: IngredientsRepository): Promise<Ingredient[]> {
  return await repository.getAllIngredients()
}
