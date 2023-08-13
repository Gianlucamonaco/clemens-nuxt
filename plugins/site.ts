// import { siteQuery } from '~/queries'
// import type { FetchError } from 'ofetch'

export default defineNuxtPlugin(async () => {
  const site = useSite()

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

  const { KIRBY_BASE_URL } = useRuntimeConfig().app;
  const api = `${KIRBY_BASE_URL}/api/query`;
  const headers = {
    // Authorization: `Basic ${btoa(KIRBY_API_USERNAME + ":" + KIRBY_API_PASSWORD)}`,
    // Authorization: `Bearer ${KIRBY_API_TOKEN}`,
    Accept: "application/json",
  };

  const querySite = 'site';
  const selectSite = {
    title: true,
    children: {
      query: `site.children.listed`,
      select: {
        id: true,
        title: true,
        url: true,
        isListed: true,
      }
    }
  }

  const { data: dataSite } = await useFetch(api, {
    method: "post",
    body: {
      query: querySite,
      select: selectSite,
    },
    headers,
  });

  // Override site with useFetch, as useKql is not working
  site.value = dataSite?.value?.result;

})
