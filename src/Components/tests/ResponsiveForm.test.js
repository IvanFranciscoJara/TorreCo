import React from 'react'
import { getByTestId, render, screen, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'
import ResponsiveForm from '../ResponsiveForm'

it('Submit', () => {
  const mockOnSubmit = jest.fn()
  const { debug, getByTestId } = render(
    <ResponsiveForm onSubmit={mockOnSubmit}>
      <button>Click</button>
      <button type="button">Click2</button>
    </ResponsiveForm>,
  )
  const form = getByTestId('form')
  fireEvent.submit(form)
  expect(mockOnSubmit).toHaveBeenCalled()
})

it('NotSubmit', () => {
  const mockOnSubmit = jest.fn()
  const { debug, getByRole } = render(
    <ResponsiveForm onSubmit={mockOnSubmit}>
      <button>Click</button>
      <button type="button">Click2</button>
    </ResponsiveForm>,
  )
  const button = getByRole('button', { name: 'Click2' })
  user.click(button)
  expect(mockOnSubmit).toHaveBeenCalledTimes(0)
})
