import { Table } from "../domain/Table";
import { TableRepository } from "../domain/TableRepository";

export async function getAllDishes(repository: TableRepository): Promise<Table[]> {
  return await repository.getAllTables()
}
