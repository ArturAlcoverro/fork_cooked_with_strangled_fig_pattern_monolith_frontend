import { Table, TableId } from '../domain/Table'
import { TableRepository } from '../domain/TableRepository'

export class APITableRepository implements TableRepository {
  baseUrl = import.meta.env.VITE_BACKEND_API_URL
  endpoint = '/table'

  getAllTables(): Promise<Table[]> {
    return fetch(`${this.baseUrl}${this.endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Response Error on "${this.endpoint}"`)
        return res.json()
      })
      .then((res) => res.filter((table: any) => table.active).sort((a: any, b: any) => a.id.value - b.id.value))
  }

  addTable(): Promise<Table> {
    const raw = JSON.stringify({
      active: true,
    })

    return fetch(`${this.baseUrl}${this.endpoint}`, {
      method: 'POST',
      body: raw,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Response Error on "${this.endpoint}"`)
      return res.json()
    })
  }

  removeTable(id: TableId): Promise<boolean> {
    return fetch(`${this.baseUrl}${this.endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Response Error on "${this.endpoint}"`)
      return true
    })
  }
}
