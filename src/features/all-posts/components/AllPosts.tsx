import { Post } from '@/lib/notion/interfaces'
import { PostItem } from '@/types'
import { memo } from 'react'
import styles from '@/styles/blog.module.css'
import {
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  ReadMoreLink,
} from '@/components/blog-parts'
import { FeedItem } from '@/features/rss/components/FeedList'
import { List } from '@chakra-ui/react'

function formatDate(item: PostItem | Post): Date {
  console.debug(item)

  if ('Date' in item) {
    return new Date(item.Date)
  }

  throw new Error('日付データが存在しません')
}

function formatMilliseconds(item: PostItem | Post) {
  return item.dateMiliSeconds
}

const SwitchPost = memo(function SwitchPostContent(props: {
  post: PostItem | Post
}) {
  const { post } = props
  if ('Slug' in post) {
    // notion
    return (
      <div className={styles.post} key={post.Slug}>
        <PostDate post={post} />
        <PostTags post={post} />
        <PostTitle post={post} />
        <PostExcerpt post={post} />
        <ReadMoreLink post={post} />
      </div>
    )
  }
  return <FeedItem post={post} />
})

export const AllPosts = (props: { posts: Post[]; articles: PostItem[] }) => {
  const { posts, articles } = props

  const allList = []
  allList.push(...posts)
  allList.push(...articles)
  allList.flat()

  allList.sort((a, b) => formatMilliseconds(b) - formatMilliseconds(a))

  console.debug('allList', allList)

  return (
    <List>
      {allList.map(postItem => (
        <SwitchPost post={postItem} />
      ))}
    </List>
  )
}
