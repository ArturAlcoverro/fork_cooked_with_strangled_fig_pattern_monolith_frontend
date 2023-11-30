import { IngredientId } from '../domain/Ingredient'
import { IngredientType } from '../domain/IngredientType'
import { IngredientsRepository } from '../domain/IngredientsRepository'

export async function setIngredientStock(repository: IngredientsRepository, id: IngredientId, quantity: number): Promise<any> {
  return await repository.setIngredientStock(id, quantity)
}
