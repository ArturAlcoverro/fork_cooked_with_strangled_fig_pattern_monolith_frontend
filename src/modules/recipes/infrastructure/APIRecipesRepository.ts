import { Recipe } from '../domain/Recipe'
import { RecipesRepository } from '../domain/RecipesRepository'

export class APIRecipesRepository implements RecipesRepository {
  baseUrl = import.meta.env.VITE_BACKEND_API_URL
  endpoint = '/recipes'

  getAllRecipes(): Promise<Recipe[]> {
    return fetch(`${this.baseUrl}${this.endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Response Error on "${this.endpoint}"`)
        return res.json()
      })
      .then((json) => {
        return json.map((recipe: any): Recipe => {
          return {
            id: recipe.id,
            name: recipe.name,
            image: recipe.image,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
          }
        })
      })
  }

  async createRecipe(recipe: Recipe): Promise<boolean> {
    const raw = JSON.stringify(recipe)

    return fetch(`${this.baseUrl}${this.endpoint}`, {
      method: 'POST',
      body: raw,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.ok
    })
  }

  async updateRecipe(recipe: Recipe): Promise<boolean> {
    const raw = JSON.stringify(recipe)

    return fetch(`${this.baseUrl}${this.endpoint}/${recipe.id}`, {
      method: 'PUT',
      body: raw,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.ok
    })
  }
}
