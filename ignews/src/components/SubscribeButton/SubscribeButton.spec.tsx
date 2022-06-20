import { render, screen, fireEvent } from '@testing-library/react'
import { signIn, useSession } from 'next-auth/react'
import { mocked } from 'ts-jest/utils'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/react')
jest.mock('next/router')

describe('SubscribeButton', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' })

    render(<SubscribeButton />)

    expect(screen.getByText('subscribe now')).toBeInTheDocument()
  })

  it('Redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: 'loading' })

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('subscribe now')
    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a susbscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: 'John Doe' },
        expires: '100000',
        activeSubscription: 'fake-active-subscription',
      },
      status: 'authenticated',
    })

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<SubscribeButton />)
    const subscribeButton = screen.getByText('subscribe now')
    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('posts')
  })
})
