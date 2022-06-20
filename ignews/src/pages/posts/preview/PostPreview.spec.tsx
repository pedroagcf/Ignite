import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'
import Post, { getStaticProps } from './[slug]'
import { client } from '../../../services/prismic'

const post = {
  slug: 'my-new-post',
  title: 'My new Post',
  content: '<h1>Post excerpt</h1>',
  updatedAt: 'March, 10',
}

jest.mock('next-auth/react')
jest.mock('next/router')
jest.mock('../../../services/prismic', () => {
  return {
    client: {
      getByUID: jest.fn(),
    },
  }
})

describe('PostPreview', () => {
  test('renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'unauthenticated',
    })
    render(<Post post={post} />)
    expect(screen.getByText('My new Post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue Reading?')).toBeInTheDocument()
  })

  test('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-active-subscription',
        expires: null,
      },
      status: 'authenticated',
    })

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<Post post={post} />)

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  })

  test('loads initial data', async () => {
    const prismicClientMocked = mocked(client)

    prismicClientMocked.getByUID.mockReturnValueOnce({
      data: {
        title: [
          {
            type: 'heading',
            text: 'My new post',
          },
        ],
        content: [
          {
            type: 'paragraph',
            text: 'Post content',
          },
        ],
      },
      last_publication_date: '2022-04-22T03:00:00.000Z',
    } as any)

    const response = await getStaticProps({ params: { slug: 'my-new-post' } })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '22 de abril de 2022',
          },
        },
      })
    )
  })
})
