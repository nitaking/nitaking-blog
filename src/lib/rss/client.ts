import { FeedItem, PostItem } from '@/types'
import { member } from '@/utils'

import Parser from 'rss-parser'

const parser = new Parser()

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url)
  let sourceType: PostItem['sourceType'] = null
  if (url.indexOf('zenn') !== -1) {
    sourceType = 'zenn'
  } else if (url.indexOf('qiita') !== -1) {
    sourceType = 'qiita'
  }

  if (!feed?.items?.length) return []

  // return item which has title and link
  return feed.items
    .map(item => {
      const { title, contentSnippet, link, isoDate } = item
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ''),
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
        sourceType,
      }
    })
    .filter(({ title, link }) => title && link) as FeedItem[]
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return []
  let feedItems: FeedItem[] = []
  try {
    for (const url of sources) {
      const items = await fetchFeedItems(url)
      if (items) feedItems = [...feedItems, ...items]
    }
    return feedItems
  } catch (error) {}
}

export async function getRssItems() {
  const items = (await getFeedItemsFromSources(member.sources)) ?? []
  items.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds)

  return items
}
