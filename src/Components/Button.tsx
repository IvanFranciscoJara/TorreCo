import React from 'react'
import './sass/Button.sass'

interface Props {
  text?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  loading?: boolean
  disabled?: boolean
}

const Button: React.FC<Props> = ({ text, onClick, loading, disabled }: Props) => {
  return (
    <button className="ButtonContainer" onClick={onClick} type="button" disabled={disabled}>
      {loading ? (
        <div className="loading">
          <div></div>
        </div>
      ) : (
        text
      )}
    </button>
  )
}
export default Button
