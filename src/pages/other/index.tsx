import DocumentHead from '../../components/document-head'
import { NoContents } from '@/components/blog-parts'

import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '@/lib/notion/client'
import posts from '.contents/posts.json'
import { Container, List } from '@chakra-ui/react'
import { FeedList } from '@/features/rss/components/FeedList'

export async function getStaticProps() {
  const posts = await getPosts()
  const firstPost = await getFirstPost()
  const rankedPosts = await getRankedPosts()
  const tags = await getAllTags()

  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPosts = ({}) => {
  return (
    <div>
      <DocumentHead title="Other Posts" />

      <Container>
        <NoContents contents={posts} />
        <List>
          <FeedList posts={posts} />
        </List>
      </Container>
    </div>
  )
}

export default RenderPosts
