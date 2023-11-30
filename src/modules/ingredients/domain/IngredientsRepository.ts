import { Ingredient, IngredientId } from "./Ingredient";
import { IngredientType } from "./IngredientType";

export interface IngredientsRepository {
  getAllIngredients(): Promise<Ingredient[]> | Ingredient[];
  addIngredient(body: any): Promise<boolean> | boolean;
  getIngredientTypes(): Promise<IngredientType[]> | IngredientType[] 
  setIngredientStock(id: IngredientId, quantity: number): any
}