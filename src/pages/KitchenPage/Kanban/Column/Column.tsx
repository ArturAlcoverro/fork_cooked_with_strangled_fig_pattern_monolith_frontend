import { useDroppable } from '@dnd-kit/core'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { useEffect, useRef, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

export const Column: React.FC<ColumnProps> = ({ columnName, children, status }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  })

  const hoverStyles = !isOver
    ? 'border-[3px] box- border-[var(--background-color-600)]'
    : 'border-[3px] box- border-[var(--primary-color-500)]'

  return (
    <div className="flex-1 gap-5 flex flex-col min-w-[250px]">
      <div
        className={`w-full h-full bg-[var(--background-color-600)] flex-grow-1 rounded-xl ${hoverStyles} box-border flex flex-col`}
      >
        <h3 className="flex-grow-0 p-5 pb-1">{columnName}</h3>
        <div ref={setNodeRef} className="relative flex-grow h-full p-4">
          <div className="flex flex-col h-full gap-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

interface ColumnProps {
  columnName: string
  status: string
  children?: React.ReactNode
}
