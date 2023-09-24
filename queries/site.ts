import type { KirbyQuerySchema } from 'kirby-fest'

export const siteQuery: KirbyQuerySchema = {
  query: 'site',
  select: {
    title: true,
    description: true,
    children: {
      query: 'site.children',
      select: {
        id: true,
        title: true,
        subtitle: true,
        date: true,
        url: true,
        isListed: true,
        sounds: {
          query: 'page.sounds.toFiles',
          select: ['id', 'uuid', 'url', 'title', 'indexOf'],
        }
      },
    },
  },
}
