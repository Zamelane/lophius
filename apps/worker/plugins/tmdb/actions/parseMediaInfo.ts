import type { ParseMethodArgs } from 'src/types'
import type TMDBPlugin from '..'
import { sleepSync } from 'bun'

export async function parseMediaInfo(
  this: TMDBPlugin,
  { status, request }: ParseMethodArgs
) {
  const data = this.storageData

  if (!data || !data.token || !this.storage.sourceId) {
    return
  }

  status.newData.title = {
    lang: null,
    text: 'Hello test1'
  }

  status.newData.posters = {
    default: {
      img: {
        domain: 'image.tmdb.org',
        https: false,
        path: '/0'
      },
      lang: ''
    },
    total: 1,
    more: []
  }

  status.addPatch()

  await Bun.sleep(5000)

  status.newData.title = {
    lang: null,
    text: 'Hello test2'
  }

  status.newData.posters.more.push({
    domain: 'image.tmdb.org',
    https: false,
    path: '/1'
  })
  status.newData.posters.more.push({
    domain: 'image.tmdb.org',
    https: false,
    path: '/2'
  })
  status.newData.posters.more.push({
    domain: 'image.tmdb.org',
    https: false,
    path: '/3'
  })

  status.addPatch()
  
  await Bun.sleep(5000)

  status.newData.title = {
    lang: null,
    text: 'Hello test3'
  }

  status.newData.posters.more = []

  status.addPatch()
}