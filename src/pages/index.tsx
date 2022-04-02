import DocumentHead from '../components/document-head'
import { FeedList } from '@/features/rss/components/FeedList'
import { getRssItems } from '@/lib/rss/client'
import {
  Box,
  Container,
  Heading,
  ListItem,
  UnorderedList,
  Text,
  Spacer,
} from '@chakra-ui/react'
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
  <Container>
    <DocumentHead />

    <Box>
      <Heading as="h2" size="lg">
        About
      </Heading>
      <Box p={2}>
        <Text>Tipsやちょっとした小技が好きな、自称ツールおじさんです。</Text>
        <Text>以下の話題について投稿していきます。</Text>
      </Box>

      <Box p={2} pt={0}>
        <UnorderedList px={3}>
          <ListItem>ツールの紹介</ListItem>
          <ListItem>こんなツールの使い方見つけた！</ListItem>
          <ListItem>ライフハック術</ListItem>
          <ListItem>コードハック術</ListItem>
        </UnorderedList>
      </Box>
    </Box>

    <Spacer h={2} />

    <Box>
      <Heading as="h2" size="lg">
        Tech Post
      </Heading>
      <Box p={2}>
        <FeedList posts={articles.slice(0, 8)} />
      </Box>
    </Box>
  </Container>
)

export default RenderPage
