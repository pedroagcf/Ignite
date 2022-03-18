import Image from 'next/image'
import { ActiveLink } from '../ActiveLink'
import { SignInButton } from '../singInButton'

import styles from './styles.module.scss'
export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src='/images/logo.svg' width='110' height='31' alt='ig.news' />
        <nav>
          <ActiveLink activeClassName={styles.active} href='/'>
            <a>home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href='/posts' prefetch>
            <a>posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}
