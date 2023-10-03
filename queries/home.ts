import type { KirbyQuerySchema } from 'kirby-fest'

export const homeQuery: KirbyQuerySchema = {
  query: 'page("home")',
  select: {
    title: true,
    id: true,
    isListed: true,
    intendedTemplate: true,
    text: 'page.text.kirbytext'
  }
}
