import type { KirbyQuerySchema } from 'kirby-fest'

export function getDefaultPageQuery(pageId: string): KirbyQuerySchema {
  return {
    query: `page("${pageId}")`,
    select: {
      id: true,
      title: true,
      index: 'page.indexOf',
      intendedTemplate: true,
      isHomePage: true,
      text: 'page.text.kirbytext',
    },
  }
}
