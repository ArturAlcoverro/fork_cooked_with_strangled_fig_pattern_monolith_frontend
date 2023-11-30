import { Recipe, RecipeId } from "./Recipe"

export interface RecipesRepository {
  getAllRecipes(): Promise<Recipe[]>
  createRecipe(recipe: Recipe): Promise<boolean>
  updateRecipe(recipe: Recipe): Promise<boolean>
}