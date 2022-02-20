import DocumentHead from '../components/document-head'
import styles from '../styles/page.module.css'
import { FeedList } from '@/features/rss/components/FeedList'
import { getRssItems } from '@/lib/rss/client'
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'

export async function getStaticProps() {
  const articles = await getRssItems()

  return {
    props: {
      articles,
    },
    revalidate: 60,
  }
}

const RenderPage = ({ articles = [] }) => (
  <div className={styles.container}>
    <DocumentHead />

    <Box>
      <Text as="h2">About</Text>
      <p>ツールや Tips が大好きな、自称ツールおじさんです。</p>
      <p>以下の話題について投稿していきます</p>

      <UnorderedList p={3}>
        <ListItem>ツールの紹介</ListItem>
        <ListItem>こんなツールの使い方見つけた！</ListItem>
        <ListItem>ライフハック術</ListItem>
        <ListItem>コードハック術</ListItem>
      </UnorderedList>
    </Box>

    <Box>
      <Text as="h2">Outputs</Text>
      <FeedList posts={articles.slice(0, 8)} />
    </Box>
  </div>
)

export default RenderPage
