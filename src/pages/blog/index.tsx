import DocumentHead from '../../components/document-head'
import {
  BlogPostLink,
  BlogTagLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
} from '@/components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '@/lib/notion/client'
import { Box, Container, Spacer } from '@chakra-ui/react'
import { getRssItems } from '@/lib/rss/client'
import React from 'react'

export async function getStaticProps() {
  const posts = await getPosts()
  const firstPost = await getFirstPost()
  const rankedPosts = await getRankedPosts()
  const tags = await getAllTags()

  const articles = await getRssItems()

  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      tags,
      articles,
    },
    revalidate: 60,
  }
}

const RenderPosts = ({
  posts = [],
  firstPost,
  rankedPosts = [],
  tags = [],
}) => {
  return (
    <Container className={styles.container} maxW="container.md">
      <DocumentHead title="Blog" />

      <div className={styles.mainContent}>
        <NoContents contents={posts} />

        {posts.map(post => {
          return (
            <Box key={post.Slug} mb={4}>
              <PostDate post={post} />
              <PostTags post={post} />
              <PostTitle post={post} />
              <PostExcerpt post={post} />
              <ReadMoreLink post={post} />
            </Box>
          )
        })}

        <footer>
          <NextPageLink firstPost={firstPost} posts={posts} />
        </footer>
      </div>

      <div className={styles.subContent}>
        <BlogPostLink heading="Recommended" posts={rankedPosts} />
        <Spacer h={1} />
        <BlogTagLink heading="Categories" tags={tags} />
      </div>
    </Container>
  )
}

export default RenderPosts
