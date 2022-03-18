import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import fetch from 'node-fetch'
import sm from '../../sm.json'

const routes = [
  {
    type: 'post',
    path: '/posts',
  },
]

export const endpoint = sm.apiEndpoint
export const repositoryName = prismic.getRepositoryName(endpoint)

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc) {
  switch (doc.type) {
    case 'home':
      return '/'
    case 'posts':
      return '/posts'
    // return `/${doc.uid}`
    default:
      return null
  }
}

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}

const accessToken = process.env.PRISMIC_ACESS_TOKEN

// const repoName = 'IgnewsByPedro'
const endPoint = prismic.getEndpoint(repositoryName)
export const client = prismic.createClient(endPoint, { routes, fetch, accessToken })
