import { ReportsRepository } from "../domain/ReportsRepository";

export class APIReportsRepository implements ReportsRepository {
  baseUrl = import.meta.env.VITE_REPORTS_API_URL
  endpoint = '/reports'

  getIngredientsRanking(): Promise<any> {
    console.log(`${this.baseUrl}${this.endpoint}/ingredientsRanking?page=1&pageSize=100000`);
    return fetch(`${this.baseUrl}${this.endpoint}/ingredientsRanking?page=1&pageSize=100000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Response Error on "${this.endpoint}"`)
        return res.json()
      }).then((json) => json.data)
  }

  getDishesRanking(): Promise<any> {
    return fetch(`${this.baseUrl}${this.endpoint}/dishesRanking?page=1&pageSize=100000`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Response Error on "${this.endpoint}"`)
        return res.json()
      }).then((json) => json.data)
    }
}