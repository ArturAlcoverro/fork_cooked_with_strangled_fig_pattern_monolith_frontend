import { DialogHTMLAttributes } from 'react'
import style from './Modal.module.scss'

export const Modal: React.FC<ModalProps> = ({
  outsideClose = false,
  children,
  modalRef,
  setOpen,
  className,
  onClose = () => {},
  ...props
}) => {
  
  function avoidCloseModal(event: any) {
    if (outsideClose) event.stopPropagation()
  }

  function clickOutside() {
    if (outsideClose) {
      onClose()
      setOpen(false)
    }
  }

  return (
    <dialog ref={modalRef} onClick={clickOutside} className={style.modal} {...props}>
      <div onClick={avoidCloseModal} className={className}>
        {children}
      </div>
    </dialog>
  )
}

export interface ModalProps extends DialogHTMLAttributes<HTMLDialogElement> {
  modalRef: React.RefObject<HTMLDialogElement>
  className?: string
  setOpen: (bool: boolean) => void
  onClose?: () => void
  children?: React.ReactNode
  outsideClose?: boolean
}
