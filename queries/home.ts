import type { KirbyQuerySchema } from 'kirby-fest'

export const homeQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    children: {
      query: 'page("categories").children',
      select: {
        id: true,
        title: true,
        isListed: true,
        children: {
          query: `page.children.listed`,
          select: {
            id: true,
            title: true,
            isListed: true,
            type: true,
            andamento: true,
            text: 'page.text.kirbytext',
            links: 'page.links.toStructure',
            images: {
              query: 'page.images',
              select: ['id', 'uuid', 'url', 'alt'],
            },
          }
        }
      }
    }
  }
}
