export interface ReportsRepository {
  getIngredientsRanking(): Promise<any> | any
  getDishesRanking(): Promise<any> | any
}