import { Recipe } from '../domain/Recipe'
import { RecipesRepository } from '../domain/RecipesRepository'

export async function getAllRecipes(repository: RecipesRepository): Promise<Recipe[]> {
  return await repository.getAllRecipes()
}
