import { useRef, useState } from 'react'

export default function useModal() {
  const modalRef = useRef<HTMLDialogElement>(null)
  const [open, _setOpen] = useState<boolean>(false)

  function setOpen(open: boolean) {
    if (modalRef.current) {
      _setOpen(open)
      open ? modalRef.current.showModal() : modalRef.current.close()
    }
  }

  return {
    modalRef,
    open,
    setOpen,
  }
}
