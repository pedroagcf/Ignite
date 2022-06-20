import { render, screen } from '@testing-library/react'
import { client } from '../../services/prismic'
import Posts, { getStaticProps } from '.'
import { mocked } from 'ts-jest/utils'

const posts = [
  {
    slug: 'my-new-post',
    title: 'My new Post',
    excerpt: 'Post excerpt',
    updatedAt: 'March, 10',
  },
]
jest.mock('../../services/prismic', () => {
  return {
    client: {
      getAllByType: jest.fn(),
    },
  }
})

describe('Posts', () => {
  test('renders correctly', () => {
    render(<Posts posts={posts} />)
    expect(screen.getByText('My new Post')).toBeInTheDocument()
  })

  test('loads initial data', async () => {
    const prismicClientMocked = mocked(client)

    prismicClientMocked.getAllByType.mockReturnValueOnce([
      {
        uid: 'fake-slug',
        data: {
          title: [
            {
              type: 'heading1',
              text: 'Fake title 1',
            },
          ],
          content: [
            {
              type: 'paragraph',
              text: 'Fake excerpt 1',
            },
          ],
        },
        last_publication_date: '2022-04-22T03:00:00.000Z',
      },
    ] as any)

    const response = await getStaticProps({ previewData: undefined })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'fake-slug',
              title: 'Fake title 1',
              excerpt: 'Fake excerpt 1',
              updatedAt: '22 de abril de 2022',
            },
          ],
        },
      })
    )
  })
})
