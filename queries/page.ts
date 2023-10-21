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
      tickets: 'page.tickets.toStructure',
      downloads: {
        query: 'page.downloads.toStructure',
        select: {
          text : 'structureItem.text',
          file: {
            query: 'structureItem.file.toFile',
            select: ['url'],
          }
        }
      },
      images: {
        query: 'page.galleryImages.toFiles',
        select: ['id', 'uuid', 'url', 'title', 'indexOf', 'caption'],
      },
      videos: {
        query: 'page.galleryVideos.toStructure',
        select: ['text', 'src'],
      },

    },
  }
}
