import { IngredientType } from '../domain/IngredientType'
import { IngredientsRepository } from '../domain/IngredientsRepository'

export async function getIngredientTypes(repository: IngredientsRepository): Promise<IngredientType[]> {
  return await repository.getIngredientTypes()
}
