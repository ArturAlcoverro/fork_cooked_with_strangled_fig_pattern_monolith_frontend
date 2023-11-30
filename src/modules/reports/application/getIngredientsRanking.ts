import { ReportsRepository } from '../domain/ReportsRepository'

export async function getIngredientsRanking(repository: ReportsRepository): Promise<any> {
  return await repository.getIngredientsRanking()
}