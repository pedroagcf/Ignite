import { render, screen } from '@testing-library/react'
import { Header } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      }
    },
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return { data: null, status: 'unauthenticated' }
    },
  }
})

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />)

    // screen.logTestingPlaygroundURL()

    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('posts')).toBeInTheDocument()
  })
})
