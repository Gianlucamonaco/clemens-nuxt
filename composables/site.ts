import type { KirbySite } from '#build/kql'

/**
 * Access the global site context, similar to Kirby's `$site` global variable
 */
export function useSite() {
  return useState<Partial<KirbySite>>('app.site', () => ({}))
}

export function useHomepage() {
  const site = useSite().value;
  return site.children.find((p: any) => p.id === 'home');
}