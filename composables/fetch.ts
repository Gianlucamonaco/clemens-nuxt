export const useErrorPage = async () => {
  // If page content is empty, load the error page
  // if (!data?.result) {
  //   const { data: pageData } = await useFetch(queryApi, {
  //     headers: queryHeaders,
  //     method: "post",
  //     body: getPageQuery('error')
  //   })
  //   data = pageData.value;
  //   setResponseStatus(useRequestEvent(), 404)
  // }

  // return data;
}

export const useQueryParams = (body: any) => {
  const runtimeConfig = useRuntimeConfig();
  const queryApi = `${runtimeConfig.app.KIRBY_BASE_URL}/api/query`;
  const queryHeaders = {
    // Authorization: `Bearer ${runtimeConfig.app.KIRBY_API_TOKEN}`,
    Authorization: `Basic ${btoa(runtimeConfig.app.KIRBY_API_USERNAME + ":" + runtimeConfig.app.KIRBY_API_PASSWORD)}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    referrerPolicy: "no-referrer",
  };

  return {
    queryApi,
    queryParams: {
      headers: queryHeaders,
      method: "post",
      body,
    } as any,
  }
}