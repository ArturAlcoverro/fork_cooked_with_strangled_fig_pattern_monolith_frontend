export interface Table {
  id: {
    value: TableId
  }
  active: TableActive
}

export type TableId = number

export type TableActive = boolean
