import type { KirbyQuerySchema } from 'kirby-fest'

export const newsQuery: KirbyQuerySchema = {
  query: 'page("news")',
  select: {
    title: true,
    children: {
      query: 'page.children',
      select: {
        id: true,
        title: true,
        isListed: true,
        index: 'page.indexOf',
        num: true,
        intendedTemplate: true,
        location: true,
        date: 'page.date.toDate',
        text: 'page.text.kirbytext',
      }
    }
  }
}