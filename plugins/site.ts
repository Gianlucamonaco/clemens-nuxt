// import { siteQuery } from '~/queries'
// import type { FetchError } from 'ofetch'

import { siteQuery } from '~/queries';

export default defineNuxtPlugin(async () => {
  const site = useSite();

  // NOTE: This is disabled as $kql is not working

  // try {
  //   // Response will be cached in payload by default, thus no need to
  //   // handle server/client side differently
  //   const data = await $kql(siteQuery)

  //   site.value = data?.result || {}
  // } catch (e) {
  //   console.error('Error loading site data:', (e as FetchError).message)
  // }

  // TEMPORARY FIX:
  const { queryApi, queryParams } = useQueryParams(siteQuery);
  const { data } = await useFetch(queryApi, queryParams);

  // Override site with useFetch, as useKql is not working
  site.value = (data?.value as any)?.result;
})