import { Ingredient, IngredientId } from '../domain/Ingredient'
import { IngredientType } from '../domain/IngredientType'
import { IngredientsRepository } from '../domain/IngredientsRepository'

export class APIIngredientsRepository implements IngredientsRepository {
  baseUrl = import.meta.env.VITE_BACKEND_API_URL
  warehouseEndpoint = '/warehouse'
  ingredientsEndpoint = '/ingredient'
  ingredientTypesEndpoint = '/ingredient_type'

  getAllIngredients(): Promise<Ingredient[]> | Ingredient[] {
    return fetch(`${this.baseUrl}${this.warehouseEndpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Response Error on "${this.warehouseEndpoint}"`)
        return res.json()
      })
      .then((json) => {
        return json.map((obj: any) => {
          const i: Ingredient = {
            id: obj.ingredient.id,
            name: obj.ingredient.name,
            type: obj.ingredient.ingredientType.id,
            quantity: obj.quantity,
          }
          return i
        })
      })
  }

  getIngredientTypes() {
    return fetch(`${this.baseUrl}${this.ingredientTypesEndpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Response Error on "${this.ingredientTypesEndpoint}"`)
        return res.json()
      })
      .then((json) => {
        return json.map((obj: any) => {
          const i: IngredientType = {
            id: obj.id,
            name: obj.name,
            ingredients: [],
          }
          return i
        })
      })
  }

  async addIngredient(body: { name: string; typeId: number; unit: string; image?: string }): Promise<boolean> {
    body.image = 'image.png'
    const raw = JSON.stringify(body)

    let res = await fetch(`${this.baseUrl}${this.ingredientsEndpoint}`, {
      method: 'POST',
      body: raw,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) return false

    res = await this.setIngredientStock((await res.json()).id)

    return res.ok
  }

  async setIngredientStock(id: IngredientId, quantity: number = 0) {
    const raw = JSON.stringify({ ingredientId: id, quantity: quantity })

    return fetch(`${this.baseUrl}${this.warehouseEndpoint}/add`, {
      method: 'POST',
      body: raw,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
