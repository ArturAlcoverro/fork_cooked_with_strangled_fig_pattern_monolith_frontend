import { Recipe } from "@modules/recipes/domain/Recipe"
import { useEffect, useState } from "react"
import { useRecipesContext } from "src/contexts/RecipesContext"

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const { getAllRecipes } = useRecipesContext()

  useEffect(() => {
    refreshRecipes()
  }
  , [])

  function refreshRecipes(){
    getAllRecipes().then((res: Recipe[]) => {
      setRecipes(res)
    })
  }

  return {
    recipes,
    refreshRecipes,
  }
}

