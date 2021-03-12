import React, { useEffect, useRef } from 'react'
import { IconEquis } from '../GlobalFiles/Icons'
import './sass/Modal.sass'
const Modal = ({ handleClose, open, children }: { handleClose: any; open: any; children: any }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const handleClickOutside = (e: any) => {
    if (!modalRef.current?.contains(e.target)) {
      handleClose(!open) //outside click
    }
  }
  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])
  return (
    <div ref={modalRef} className={`ContainerModal ${open ? 'show' : 'hide'}`}>
      <div className="Container">
        <div className="MF__Close" onClick={() => handleClose(!open)}>
          <IconEquis />
        </div>
        {/* <div className="MF__Title">
          <h3>Filters</h3>
        </div> */}
        {children}
      </div>
    </div>
  )
}

export default Modal
