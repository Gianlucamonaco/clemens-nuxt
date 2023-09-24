import type { KirbyQuerySchema } from 'kirby-fest'

export const aboutQuery: KirbyQuerySchema = {
  query: 'page("biography")',
  select: {
    title: true,
    id: true,
    isListed: true,
    num: true,
    intendedTemplate: true,
    text: 'page.text.kirbytext',
  }
}