import { Table, TableId } from "../domain/Table";
import { TableRepository } from "../domain/TableRepository";

export async function removeTable(repository: TableRepository, id: TableId): Promise<boolean> {
  return await repository.removeTable(id)
}
