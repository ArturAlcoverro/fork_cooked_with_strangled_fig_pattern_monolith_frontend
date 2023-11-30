import getAllTables from 'src/services/Tables/getAllTables'
import addTable from 'src/services/Tables/addTable'
import removeTable from 'src/services/Tables/removeTable'
import { useEffect, useState } from 'react'

export default function useTables() {
  const [tables, setTables] = useState<any>([])
  function _refreshTables() { 
    getAllTables().then((res) => {
      setTables(res)
    })
  }

  function _addTable() {
    addTable().then(() => _refreshTables())
  }

  function _removeTable(id: number) {
    removeTable(id).then(() => {
      _refreshTables()
    })
  }

  useEffect(() => {
    _refreshTables()
  }, [])

  return {
    tables,
    addTable: _addTable,
    removeTable: _removeTable,
    refreshTables: _refreshTables,
  }
}
