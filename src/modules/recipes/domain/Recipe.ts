import { IngredientId } from "@modules/ingredients/domain/Ingredient"

// Recipe Entity
export interface Recipe {
  id?: RecipeId,
  name: RecipeName,
  image: RecipeImage,
  ingredients: RecipeIngredient[],
  steps: RecipeStep[],
}

// Recipe Value Objects
export type RecipeId = number
export type RecipeName = string
export type RecipeImage = string

export interface RecipeIngredient {
  id: IngredientId,
  quantity: number,
}

export interface RecipeStep {
  id: RecipeStepId,
  name: RecipeStepName,
  description: RecipeStepDescription,
  order: RecipeStepOrder,
}

export type RecipeStepId = number
export type RecipeStepName = string
export type RecipeStepDescription = string
export type RecipeStepOrder = number
