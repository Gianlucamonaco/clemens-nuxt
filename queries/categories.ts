import type { KirbyQuerySchema } from 'kirby-fest'

export const categoriesQuery: KirbyQuerySchema = {
  query: 'page("categories")',
  select: {
    title: true,
    children: {
      query: 'page.children',
      select: {
        id: true,
        title: true,
        isListed: true,
        num: true,
        children: {
          query: 'page.children.listed',
          select: {
            id: true,
            num: true,
            title: true,
            isListed: true,
            type: true,
            duration: true,
            sounds: {
              query: 'page.sounds.toFiles',
              select: ['id', 'uuid', 'url', 'alt', 'indexOf'],
            },
            intendedTemplate: true,
          }
        }
      }
    }
  }
}
