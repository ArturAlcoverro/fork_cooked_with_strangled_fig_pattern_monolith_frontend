import { Table } from "../domain/Table";
import { TableRepository } from "../domain/TableRepository";

export async function addTable(repository: TableRepository): Promise<Table> {
  return await repository.addTable()
}
