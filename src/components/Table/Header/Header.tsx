import React from 'react'
import './Header.scss'
import { ReactComponent as ExpandMoreIcon } from '@assets/icons/expand_more.svg'

export const Header: React.FC<HeaderProps> = ({ index, selectedIndex, title }) => {
  let className = selectedIndex.order === 1 ? '' : 'inverted'

  if (index === selectedIndex.index) {
    return (
      <div className={`header-styles text-sm ${className}`}>
        {title}
        <ExpandMoreIcon className='w-3' />
      </div>
    )
  } else return <div className='text-sm'>{title}</div>
}

interface HeaderProps {
  index: number
  selectedIndex: { index: number; order: number }
  title: string
}
