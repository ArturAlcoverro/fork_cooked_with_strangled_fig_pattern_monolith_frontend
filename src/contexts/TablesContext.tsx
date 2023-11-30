import { TableId, Table } from '@modules/tables/domain/Table'
import { TableRepository } from '@modules/tables/domain/TableRepository'
import React, { useContext } from 'react'

export interface ContextState {
  getAllTables: () => Promise<Table[]>
  removeTable: (id: TableId) => Promise<boolean>
  addTable: () => Promise<Table>
  getTablesNumber: () => Promise<Map<number, number>>
}
export const TablesContext = React.createContext({} as ContextState)

export const TablesContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: TableRepository }>) => {

  async function getAllTables() {
    return await repository.getAllTables()
  }

  async function removeTable(id: TableId) {
    return await repository.removeTable(id)
  }

  async function addTable() {
    return await repository.addTable()
  }

  async function getTablesNumber() {
    const tables = (await repository.getAllTables())
    const map = new Map<number, number>()
    
    tables.forEach((table: Table, i) => {
      map.set(table.id.value, i+1)
    })

    return map
  }

  return (
    <TablesContext.Provider
      value={{
        getAllTables,
        removeTable,
        addTable,
        getTablesNumber
      }}
    >
      {children}
    </TablesContext.Provider>
  )
}

export const useTablesContext = () => useContext(TablesContext)
