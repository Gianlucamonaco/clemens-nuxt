import type { KirbyQueryResponse, KirbyQuerySchema } from 'kirby-fest'

export interface KirbyPageData {
  id: string
  title: string
  intendedTemplate: string
  isHomePage: boolean,
  num: number
  // description: string
  text: string
}

export type KirbyPageResponse = KirbyQueryResponse<KirbyPageData>

export function getPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      id: true,
      title: true,
      intendedTemplate: true,
      isHomePage: true,
      num: true,
      parentIndex: 'page.parent.num',
      // description: true,
      date: 'page.date.toDate',
      text: 'page.text.kirbytext',
      links: 'page.links.toStructure',
      downloads: 'page.downloads.toStructure',
      // videos: 'page.videos.toStructure',
      images: {
        query: 'page.images',
        select: ['id', 'uuid', 'url', 'alt', 'indexOf'],
      },
    },
  }
}
