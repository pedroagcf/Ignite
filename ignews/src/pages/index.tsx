import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { createClient } from '../services/prismic'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'
import * as prismic from '@prismicio/client'
import fetch from 'node-fetch'

interface HomeProps {
  product: {
    priceId: string
    amount: number
  }
}

// Client-side
// Server-side
// Static Site Generation

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.News </title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get Access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <img src='/images/avatar.svg' alt='girl coding' />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KYproA8C29F0w9t056LeJ5v', {
    expand: ['product'],
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  const routes = [
    // Define routes for your Custom Types.
    {
      type: 'post', // Documents of type "page"
      path: '/posts', // will have this URL structure.
    },
  ]

  const accessToken = process.env.PRISMIC_ACESS_TOKEN

  const repoName = 'IgnewsByPedro'
  const endpoint = prismic.getEndpoint(repoName)
  const client = prismic.createClient(endpoint, { routes, fetch, accessToken })

  const page = await client.getAllByType('post')

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
