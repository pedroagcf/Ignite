import { render, screen } from '@testing-library/react'
import { getSession } from 'next-auth/react'
import { mocked } from 'ts-jest/utils'
import Post, { getServerSideProps } from './[slug]'
import { client } from '../../services/prismic'

const post = {
  slug: 'my-new-post',
  title: 'My new Post',
  content: '<h1>Post excerpt</h1>',
  updatedAt: 'March, 10',
}

jest.mock('next-auth/react')
jest.mock('../../services/prismic', () => {
  return {
    client: {
      getByUID: jest.fn(),
    },
  }
})

describe('Post', () => {
  test('renders correctly', () => {
    render(<Post post={post} />)
    expect(screen.getByText('My new Post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
  })

  test('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' },
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        }),
      })
    )
  })

  test('loads initial data', async () => {
    const getSessionMocked = mocked(getSession)
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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any)

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' },
    } as any)

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
