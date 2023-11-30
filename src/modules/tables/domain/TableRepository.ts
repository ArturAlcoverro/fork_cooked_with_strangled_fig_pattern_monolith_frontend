import { Table, TableId } from "./Table";

export interface TableRepository {
  getAllTables(): Promise<Table[]> | Table[];
  addTable(): Promise<Table> | Table;
  removeTable(id: TableId): Promise<boolean> | boolean;
}