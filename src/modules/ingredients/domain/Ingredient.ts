import { IngredientTypeId } from "./IngredientType"

export interface Ingredient {
  id: IngredientId
  name: IngredientName
  type: IngredientTypeId
  quantity: IngredientQuantity
}

export type IngredientId = number
export type IngredientName = string
export type IngredientQuantity = number
