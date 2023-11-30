import style from './NewTable.module.scss'

import { ReactComponent as AddIcon } from '@assets/icons/add.svg'

export const NewTable: React.FC<NewTableProps> = ({ onClick }) => {
  return (
    <div className={style.new_table}>
      <div className={style.new_table__padding} />

      <button onClick={onClick} className={style.new_table__button}>
        <AddIcon />
        New Table
      </button>

      <div className={style.new_table__padding} />
    </div>
  )
}

export interface NewTableProps {
  onClick: () => void
}
