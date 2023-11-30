import { useState } from 'react'
import {Header} from './Header/Header'
import style from './Table.module.scss'

const ASC = 0
const DESC = 1

export const Table: React.FC<TableProps> = ({ data, structure, defaultSortIndex }) => {
  const [sortIndex, setSortIndex] = useState({ index: defaultSortIndex, order: ASC })

  function getSortIndex(index: number) {
    let _sortIndex = { index: index, order: ASC }
    if (sortIndex.index === index) {
      _sortIndex.order = sortIndex.order === ASC ? DESC : ASC
    }
    return _sortIndex
  }

  return (
    <div className={style.styles}>
      <div className={style["table-container"]}>
        <table>
          <thead>
            <tr>
              {structure.map((e: any, i: any) => (
                <th className={`${style[e.titleClassName]} ${style[e.align]}`} onClick={(e) => setSortIndex(getSortIndex(i))}>
                  <Header title={e.title} index={i} selectedIndex={sortIndex} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortData(data, structure, sortIndex).map((e: any) => (
              <tr className='hover:bg-[var(--background-color-600)] rounded'>
                {structure.map((s: any) => (
                  <td className={`text-sm align-top ${style[s.labelClassName]} ${style[s.align]}`}>
                    {s.format !== undefined ? s.format(e[s.datakey]) : e[s.datakey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

interface TableProps {
  data: any
  structure: StructureField[]
  defaultSortIndex: any
} 

export interface StructureField {
  datakey: string
  title: string
  align: string
  format?: (value: any) => any
  defaultSortAsc?: boolean
  titleClassName?: string
  labelClassName?: string
}

function sortData(data: any, structure: any, index: any) {
  let order = index.order === ASC ? 1 : -1
  const attr = structure[index.index].datakey

  order = structure[index.index].defaultSortAsc === false ? order * -1 : order

  data.sort(function (a:any , b: any) {
    if (a[attr] > b[attr]) return 1 * order
    if (a[attr] < b[attr]) return -1 * order
    return 0
  })

  return data
}