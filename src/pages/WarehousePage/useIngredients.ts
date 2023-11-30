import { IngredientType } from '@modules/ingredients/domain/IngredientType'
import { useEffect, useState } from 'react'
import { useIngredientsContext } from 'src/contexts/IngredientsContext'

export function useIngredients() {
  const { getAllIngredients, getIngredientTypes } = useIngredientsContext()
  const [ingredientTypes, setIngredientTypes] = useState<IngredientType[]>([])

  useEffect(() => {
    getIngredientTypes().then((res) => {
      _refreshIngredients(res)
    })
  }, [])

  function refreshIngredients() {
    const types = structuredClone(ingredientTypes)
    _refreshIngredients(types)
  }

  function _refreshIngredients(types: IngredientType[]) {
    getAllIngredients().then((ingredients) => {
      for (let type of types) {
        type.ingredients = ingredients.filter((ingredient) => ingredient.type == type.id)
      }
      setIngredientTypes(types)
    })
  }

  return {
    ingredientTypes,
    refreshIngredients
  }
}
