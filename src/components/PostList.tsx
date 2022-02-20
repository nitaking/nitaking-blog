import { ZennIcon } from '@/components/icons/ZennIcon'
import { PostItem } from '@/types'
import Image from 'next/image'
import React, { FC } from 'react'

type Props = {
  sourceType: PostItem['sourceType']
}

export const PostIcon: FC<Props> = props => {
  const { sourceType } = props

  if (sourceType === 'zenn') {
    return <ZennIcon size={24} />
  } else if (sourceType === 'qiita') {
    return <Image src="/icon/qiita.png" width="24" height="24" alt="qiita" />
  } else {
    return null
  }
}
