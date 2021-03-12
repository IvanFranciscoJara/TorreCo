import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import Button from '../Button'

it('Onclick', () => {
  const mockOnClick = jest.fn()
  const { debug, getByRole } = render(<Button text="Button text" onClick={mockOnClick} />)
  const button = getByRole('button')
  user.click(button)
  expect(mockOnClick).toHaveBeenCalled()
  expect(mockOnClick).toHaveBeenCalledTimes(1)
})

it('disable', () => {
  const mockOnClick = jest.fn()
  const { debug, getByRole } = render(<Button text="Button text" disabled={true} onClick={mockOnClick} />)
  const button = getByRole('button')
  user.click(button)
  expect(mockOnClick).toHaveBeenCalledTimes(0)
})

it('loading', () => {
  const { debug, getByRole, container } = render(<Button text="Button text" loading={true} />)
  const button = getByRole('button')
  expect(button).toHaveTextContent('')
})
