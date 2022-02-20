import {
  Box,
  Image,
  Link,
  List,
  ListItem,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { memo } from 'react'
import { PostItem } from '@/types'

export function getHostFromURL(str: string) {
  const url = new URL(str)
  return url?.hostname || 'blog'
}

export function getFaviconSrcFromHostname(hostname: string) {
  return `https://www.google.com/s2/favicons?domain=${hostname}`
}
const formatYmd = (date: Date) => date.toISOString().slice(0, 10)

const HostInfo = memo(function Host(
  props: Pick<PostItem, 'link' | 'authorName'>
) {
  return (
    <Box display="flex" alignItems="center" h={4}>
      <Image
        src={getFaviconSrcFromHostname(props.link)}
        alt={props.authorName}
        width={4}
        height={4}
      />
      <Box ml={2}>
        <Text color={'gray.500'}>{getHostFromURL(props.link)}</Text>
      </Box>
    </Box>
  )
})

export const FeedItem = memo(function FeedItemContent({
  post,
}: {
  post: PostItem
}) {
  return (
    <ListItem key={post.title} alignItems="center" mb={4}>
      <Box
        maxW="full"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={2}
        pb={1}
        m={2}
      >
        <Spacer p={1}>
          <HostInfo link={post.link} authorName={post.authorName} />
        </Spacer>

        <Box display={'flex'} flexDirection={'row'} px={1}>
          <Link href={post.link} isExternal>
            <Text color={'gray.700'} fontWeight="bold" fontSize="md">
              {post.title} <ExternalLinkIcon fontSize={14} mx="2px" />
            </Text>
          </Link>

          <Box ml={'auto'}>
            <Text color={'gray.500'} fontSize="sm">
              {formatYmd(new Date(post.isoDate))}
            </Text>
          </Box>
        </Box>
      </Box>
    </ListItem>
  )
})

export const FeedList = ({ posts }) => {
  return (
    <List>
      {posts.map((post: PostItem) => (
        <FeedItem post={post} key={post.title} />
      ))}
    </List>
  )
}
