import React from 'react'
import style from './Button.module.scss'

export const Button: React.FC<ButtonProps> = ({ text, icon, onClick, outline = true, variant = "secondary", type = 'button' }) => {
  return (
    <button
      className={`
        ${style.button} 
        ${!outline ? style['button--no-border'] : ''} 
        ${variant === 'primary' ? style['button--primary'] : style['button--secondary'] }
      `}
      onClick={onClick}
    >
      {icon ?? undefined}
      {text}
    </button>
  )
}

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  outline?: boolean
  variant?: 'primary' | 'secondary'
  text: string
  icon?: React.ReactNode
  onClick?: () => void
}
