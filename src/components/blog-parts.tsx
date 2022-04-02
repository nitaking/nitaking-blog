import React from 'react'
import Link from 'next/link'

import NotionBlock from './notion-block'
import * as interfaces from '../lib/notion/interfaces'
import {
  getBeforeLink,
  getBlogLink,
  getDateStr,
  getTagLink,
} from '../lib/blog-helpers'
import styles from '../styles/blog-parts.module.css'
import {
  Box,
  Heading,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'

export const PostDate = ({ post }) => (
  <Text fontSize="sm">{post.Date ? getDateStr(post.Date) : ''}</Text>
)

export const PostTitle = ({ post, enableLink = true }) => {
  const postTitle = post.Title ? post.Title : ''

  return (
    <Text as="h3" fontSize="md" fontWeight="semibold">
      {enableLink ? (
        <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
          <a>{postTitle}</a>
        </Link>
      ) : (
        postTitle
      )}
    </Text>
  )
}

export const PostTags = ({ post }) => (
  <Text fontSize={'xs'}>
    {post.Tags &&
      post.Tags.length > 0 &&
      post.Tags.map(tag => (
        <Link href="/blog/tag/[tag]" as={getTagLink(tag)} key={tag} passHref>
          <a>{tag}</a>
        </Link>
      ))}
  </Text>
)

export const PostExcerpt = ({ post }) => (
  <Text fontSize="sm">
    <p>{post.Excerpt ? post.Excerpt : ''}</p>
  </Text>
)

export const PostBody = ({ blocks }) => (
  <div className={styles.postBody}>
    {wrapListItems(blocks).map((block, i) => (
      <NotionBlock block={block} key={`post-body-${i}`} />
    ))}
  </div>
)

export const ReadMoreLink = ({ post }) => (
  <Box p={3}>
    <Box borderWidth={1} borderColor="gray.500" m="auto" w={32} py={2}>
      <Stack alignItems="center">
        <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
          <Text as="a" fontSize="sm">
            続きを読む
          </Text>
        </Link>
      </Stack>
    </Box>
  </Box>
)

export const NextPageLink = ({ firstPost, posts }) => {
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date === lastPost.Date) return null

  return (
    <div className={styles.nextPageLink}>
      <Link
        href="/blog/before/[date]"
        as={getBeforeLink(lastPost.Date)}
        passHref
      >
        <a>Next page ＞</a>
      </Link>
    </div>
  )
}

export const NoContents = ({ contents }) => {
  if (!!contents && contents.length > 0) return null

  return <div className={styles.noContents}>There are no contents yet</div>
}

export const BlogPostLink = ({ heading, posts }) => (
  <div className={styles.blogPostLink}>
    <Heading as="h3" size="lg">
      {heading}
    </Heading>
    <NoContents contents={posts} />
    <PostLinkList posts={posts} />
  </div>
)

export const BlogTagLink = ({ heading, tags }) => (
  <div className={styles.blogTagLink}>
    <Heading as="h3" size="lg">
      {heading}
    </Heading>
    <NoContents contents={tags} />
    <TagLinkList tags={tags} />
  </div>
)

export const PostLinkList = ({ posts }) => {
  if (!posts || posts.length === 0) return null

  return (
    <UnorderedList p={3}>
      {posts.map(post => {
        return (
          <ListItem key={post.Slug}>
            <Link href="/blog/[slug]" as={getBlogLink(post.Slug)} passHref>
              <a>{post.Title}</a>
            </Link>
          </ListItem>
        )
      })}
    </UnorderedList>
  )
}

export const TagLinkList = ({ tags }) => {
  if (!tags || tags.length === 0) return null

  return (
    <UnorderedList p={3}>
      {tags.map(tag => {
        return (
          <ListItem key={tag}>
            <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
              <a>{tag}</a>
            </Link>
          </ListItem>
        )
      })}
    </UnorderedList>
  )
}

export const PostsNotFound = () => (
  <div className={styles.postsNotFound}>
    Woops! did not find the posts, redirecting you back to the blog index
  </div>
)

const wrapListItems = blocks =>
  blocks.reduce((arr, block, i) => {
    const isBulletedListItem = block.Type === 'bulleted_list_item'
    const isNumberedListItem = block.Type === 'numbered_list_item'

    if (!isBulletedListItem && !isNumberedListItem) return arr.concat(block)

    const listType = isBulletedListItem ? 'bulleted_list' : 'numbered_list'

    if (i === 0) {
      const list: interfaces.List = {
        Type: listType,
        ListItems: [block],
      }
      return arr.concat(list)
    }

    const prevList = arr[arr.length - 1]

    if (
      (isBulletedListItem && prevList.Type !== 'bulleted_list') ||
      (isNumberedListItem && prevList.Type !== 'numbered_list')
    ) {
      const list: interfaces.List = {
        Type: listType,
        ListItems: [block],
      }
      return arr.concat(list)
    }

    prevList.ListItems.push(block)

    return arr
  }, [])
