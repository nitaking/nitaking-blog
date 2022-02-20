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
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
} from '../../lib/notion/client'
import posts from '.contents/posts.json'
import { PostItem } from '@/types'
import { PostIcon } from '@/components/PostList'

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

const Articles = (posts: PostItem[]) => {}

console.debug(
  JSON.stringify(
    posts.map(post => post.title),
    null,
    2
  )
)

const RenderPosts = ({}) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Other Posts" />

      <div className={styles.mainContent}>
        <NoContents contents={posts} />
        <>
          {posts.map(post => {
            return (
              <div className={styles.post} key={post.title}>
                <PostIcon sourceType={post.sourceType} />
                <span>{post.title}</span>
              </div>
            )
          })}
        </>
      </div>
    </div>
  )
}

export default RenderPosts
