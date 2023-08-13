import type { KirbyQuerySchema } from 'kirby-fest'

export const notesQuery: KirbyQuerySchema = {
  query: 'page("project")',
  select: {
    title: true,
    intendedTemplate: true,
    // description: true,
    text: 'page.text.kirbytext',
  },
}
