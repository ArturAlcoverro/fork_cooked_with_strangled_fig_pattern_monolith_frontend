import { Recipe } from '../domain/Recipe'
import { RecipesRepository } from '../domain/RecipesRepository'

export async function createRecipe(repository: RecipesRepository, recipe: Recipe): Promise<boolean> {
  return await repository.createRecipe(recipe)
}
