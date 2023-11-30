import { Ingredient } from "./Ingredient"

export interface IngredientType {
  id: IngredientTypeId
  name : IngredientTypeName
  ingredients: Ingredient[]
}

export type IngredientTypeId = number
export type IngredientTypeName = string