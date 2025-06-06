'use client'

import { TagComponent, Tag } from './tag'

type Props = {
  tags: Tag[]
}

export function TagContainer({ tags }: Props) {
  return <div className='flex flex-wrap gap-2'>
    {
      tags.map((tag, i) => <TagComponent key={i} tag={tag} /> )
    }
  </div>
}
