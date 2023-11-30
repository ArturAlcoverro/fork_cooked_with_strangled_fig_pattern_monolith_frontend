import React from 'react'
import '../../styles/tailwind.css'
import styles from './Table.module.scss'
import { Table as FlowbiteTable } from 'flowbite-react'

export const Table: React.FC<TableProps> = ({ headers, rows }) => {
  interface TableStyle {
    [key: string]: string | number
  }
  const tableStyle: TableStyle = {
    '--num-columns': headers.length,
  }
  return (
    <>
      <div className={`relative overflow-x-auto ${styles.styles}`} style={tableStyle}>
        <FlowbiteTable hoverable>
          <FlowbiteTable.Head>
            {headers.map((header: string, index) => (
              <FlowbiteTable.HeadCell key={index}>{header}</FlowbiteTable.HeadCell>
            ))}
          </FlowbiteTable.Head>
          <FlowbiteTable.Body className={'divide-y'}>
            {rows.map((row: TableRow, index) => (
              <FlowbiteTable.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                {row.rowCells.map((cell: TableCell, index) => (
                  <FlowbiteTable.Cell key={index}>{cell.cellValue}</FlowbiteTable.Cell>
                ))}
              </FlowbiteTable.Row>
            ))}
          </FlowbiteTable.Body>
        </FlowbiteTable>
      </div>
    </>
  )
}

export interface TableProps {
  headers: string[]
  rows: TableRow[]
}

export interface TableCell {
  cellValue: string
}

export interface TableRow {
  rowCells: TableCell[]
}
