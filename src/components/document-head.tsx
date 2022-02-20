import Head from 'next/head'
import { useRouter } from 'next/router'

import { NEXT_PUBLIC_URL } from '../lib/notion/server-constants'

export const SITE_TITLE = 'nitaking.dev'
export const SITE_DESCRIPTION =
  '自称ツールおじさんとして、ツールのTips、ソフトウェア開発のTipsを中心に発信するブログ'

const DocumentHead = ({ title = '', description = '', urlOgImage = '' }) => {
  const { asPath, pathname } = useRouter()

  const currentURL = new URL(asPath, NEXT_PUBLIC_URL)

  return (
    <Head>
      <title>{title ? `${title} - ${SITE_TITLE}` : SITE_TITLE}</title>
      <meta
        name="description"
        content={description ? description : SITE_DESCRIPTION}
      />
      <meta property="og:url" content={currentURL.toString()} />
      <meta property="og:title" content={title ? title : SITE_TITLE} />
      <meta
        property="og:description"
        content={description ? description : SITE_DESCRIPTION}
      />
      {urlOgImage ? <meta property="og:image" content={urlOgImage} /> : null}
      <meta
        name="twitter:card"
        content={
          pathname === '/blog/[slug]' && urlOgImage
            ? 'summary_large_image'
            : 'summary'
        }
      />
      {urlOgImage ? <meta name="twitter:image" content={urlOgImage} /> : null}
      <link rel="canonical" href={currentURL.toString()} />
    </Head>
  )
}

export default DocumentHead
