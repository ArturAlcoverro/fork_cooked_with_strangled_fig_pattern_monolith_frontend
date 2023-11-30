import { ReportsRepository } from '../domain/ReportsRepository'

export async function getDishesRanking(repository: ReportsRepository): Promise<any> {
  return await repository.getDishesRanking()
}
