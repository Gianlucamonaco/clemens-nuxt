import type { KirbyQuerySchema } from 'kirby-fest'

export const categoriesQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    children: {
      query: 'page("categories").children',
      select: {
        id: true,
        title: true,
        isListed: true,
        num: true,
        symbol: true,
        children: {
          query: `page.children.listed`,
          select: {
            id: true,
            num: true,
            title: true,
            isListed: true,
            type: true,
            duration: true,
            intendedTemplate: true,
            text: 'page.text.kirbytext',
            links: 'page.links.toStructure',
            sounds: {
              query: 'page.sounds.toFiles',
              select: ['id', 'uuid', 'url', 'alt', 'indexOf'],
            },
            images: {
              query: 'page.images',
              select: ['id', 'uuid', 'url', 'alt', 'indexOf'],
            },
          }
        }
      }
    }
  }
}
