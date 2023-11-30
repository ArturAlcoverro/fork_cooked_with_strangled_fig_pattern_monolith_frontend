import { RecipesRepository } from '@modules/recipes/domain/RecipesRepository'
import React, { useContext } from 'react'
import { getAllRecipes as _getAllRecipes} from '@modules/recipes/application/getAllRecipes'
import { createRecipe as _createRecipe} from '@modules/recipes/application/createRecipe'
import { updateRecipe as _updateRecipe} from '@modules/recipes/application/updateRecipe'
import { Recipe } from '@modules/recipes/domain/Recipe'

export interface ContextState {
  getAllRecipes: () => Promise<Recipe[]>
  createRecipe: (recipe: Recipe) => Promise<boolean>
  updateRecipe: (recipe: Recipe) => Promise<boolean>
}

export const RecipesContext = React.createContext({} as RecipesRepository)

export const RecipesContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: ContextState }>) => {
  
  async function getAllRecipes(): Promise<Recipe[]> {
    return await _getAllRecipes(repository)
  }

  async function createRecipe(recipe: Recipe): Promise<boolean> {
    return await _createRecipe(repository, recipe)
  }

  async function updateRecipe(recipe: Recipe): Promise<boolean> {
    return await _updateRecipe(repository, recipe)
  }

  return (
    <RecipesContext.Provider value={{ getAllRecipes, createRecipe, updateRecipe }}>
      {children}
    </RecipesContext.Provider>
  )
}

export const useRecipesContext = () => useContext(RecipesContext)
