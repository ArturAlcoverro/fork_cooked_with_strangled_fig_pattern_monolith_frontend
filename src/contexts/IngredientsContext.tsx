import { Ingredient, IngredientId } from '@modules/ingredients/domain/Ingredient'
import { IngredientsRepository } from '@modules/ingredients/domain/IngredientsRepository'
import React, { useContext } from 'react'
import { getAllIngredients as _getAllIngredients } from '@modules/ingredients/application/getAllIngredients'
import { getIngredientTypes as _getIngredientTypes } from '@modules/ingredients/application/getIngredientTypes'
import { addIngredient as _addIngredient } from '@modules/ingredients/application/addIngredient'
import { setIngredientStock as _setIngredientStock } from '@modules/ingredients/application/setIngredientStock'
import { IngredientType } from '@modules/ingredients/domain/IngredientType'

export interface ContextState {
  getAllIngredients: () => Promise<Ingredient[]>
  getIngredientTypes: () => Promise<IngredientType[]>
  addIngredient: (body: { name: string; typeId: number; unit: string; image?: string }) => Promise<boolean>
  setIngredientStock: (id: IngredientId, quantity: number) => Promise<any>
}

export const IngredientsContext = React.createContext({} as ContextState)

export const IngredientsContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: IngredientsRepository }>) => {
  async function getAllIngredients(): Promise<Ingredient[]> {
    return await _getAllIngredients(repository)
  }

  async function getIngredientTypes(): Promise<IngredientType[]> {
    return await _getIngredientTypes(repository)
  }

  async function addIngredient(body: { name: string; typeId: number; unit: string; image?: string }): Promise<boolean> {
    return await _addIngredient(repository, body)
  }

  async function setIngredientStock(id: IngredientId, quantity: number): Promise<any> {
    return await _setIngredientStock(repository, id, quantity)
  }

  return (
    <IngredientsContext.Provider value={{ getAllIngredients, getIngredientTypes, addIngredient, setIngredientStock }}>
      {children}
    </IngredientsContext.Provider>
  )
}

export const useIngredientsContext = () => useContext(IngredientsContext)
