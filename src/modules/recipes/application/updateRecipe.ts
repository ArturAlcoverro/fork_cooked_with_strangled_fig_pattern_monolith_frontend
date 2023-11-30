import { Recipe } from '../domain/Recipe'
import { RecipesRepository } from '../domain/RecipesRepository'

export async function updateRecipe(repository: RecipesRepository, recipe: Recipe): Promise<boolean> {
  return await repository.updateRecipe(recipe)
}
