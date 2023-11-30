import { Dish } from '../domain/Dish'
import { DishesRepository } from '../domain/DishesRepository'

export class APIDishesRepository implements DishesRepository {
  baseUrl = import.meta.env.VITE_BACKEND_API_URL

  getAllDishes(): Promise<Dish[]> {
    const endpoint = '/dish'
    return fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (!res.ok) throw new Error(`Response Error on "${endpoint}"`)
      return res.json() as Promise<Dish[]>
    })
  }
}
