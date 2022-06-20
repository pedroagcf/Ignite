import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/react'
import { SignInButton } from '.'

jest.mock('next-auth/react')

describe('SignInButton', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' })

    render(<SignInButton />)

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: 'John Doe' },
        expires: '100000',
      },
      status: 'authenticated',
    })

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
