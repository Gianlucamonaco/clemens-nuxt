// import { siteQuery } from '~/queries'
// import type { FetchError } from 'ofetch'

import { siteQuery } from '~/queries';
import { queryApi, queryHeaders } from "../data/constants";

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

  const { data: dataSite } = await useFetch(queryApi, {
    method: "post",
    body: siteQuery,
    headers: queryHeaders,
  });

  // Override site with useFetch, as useKql is not working
  site.value = dataSite?.value?.result;

})
