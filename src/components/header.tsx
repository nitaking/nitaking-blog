import Link from 'next/link'
import { useRouter } from 'next/router'
import { Stack, Heading } from '@chakra-ui/react'

import { NEXT_PUBLIC_URL } from '../lib/notion/server-constants'

import { SITE_TITLE } from './document-head'
import styles from '../styles/header.module.css'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const { asPath } = useRouter()
  const url = new URL(asPath, NEXT_PUBLIC_URL)

  const navItems: NavItem[] = [
    { label: 'ホーム', path: '/' },
    { label: 'ブログ', path: '/blog' },
  ]

  return (
    <header className={styles.header}>
      <Link href="/" passHref>
        <Stack direction="row" justifyContent="center" alignItems="center">
          {/*<Image*/}
          {/*  src="/icon/profile.jpg"*/}
          {/*  boxSize="3rem"*/}
          {/*  objectFit="cover"*/}
          {/*  borderRadius="xl"*/}
          {/*/>*/}

          <Heading as="h1" fontSize="3xl">
            {SITE_TITLE}
          </Heading>
        </Stack>
      </Link>

      <ul>
        {navItems.map(({ label, path }) => (
          <li key={label}>
            <Link href={path} passHref>
              <a className={url.pathname === path ? 'active' : null}>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
