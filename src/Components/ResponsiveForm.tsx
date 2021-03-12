import React from 'react'
import './sass/ResponsiveForm.sass'
interface Props {
  Children?: React.ReactNode
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

const ResponsiveForm: React.FC<Props> = ({ children, onSubmit }) => {
  return (
    <div className="ContainerResponsiveForm">
      <form onSubmit={onSubmit} data-testid="form">
        {children}
      </form>
    </div>
  )
}

export default ResponsiveForm
