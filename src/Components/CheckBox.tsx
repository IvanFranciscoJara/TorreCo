import React from 'react'
import './sass/CheckBox.sass'
import { IconCheck } from '../GlobalFiles/Icons'

interface Props {
  text?: string
  checked?: boolean
  onChange?: () => void
}

const CheckBox: React.FC<Props> = ({ text, checked, onChange }: Props) => {
  return (
    <div className={`ContainerCheckBox ${checked && 'checked'}`} onClick={onChange}>
      <IconCheck />
    </div>
  )
}

export default CheckBox
