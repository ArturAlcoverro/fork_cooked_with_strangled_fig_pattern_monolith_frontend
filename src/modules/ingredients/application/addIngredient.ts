import { IngredientsRepository } from '../domain/IngredientsRepository'

export async function addIngredient(
  repository: IngredientsRepository,
  body: { name: string; typeId: number; unit: string; image?: string },
): Promise<boolean> {
  return await repository.addIngredient(body)
}
