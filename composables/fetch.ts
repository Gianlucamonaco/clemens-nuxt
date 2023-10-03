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
    // Authorization: `Basic ${btoa(KIRBY_API_USERNAME + ":" + KIRBY_API_PASSWORD)}`,
    Authorization: `Bearer ${runtimeConfig.app.KIRBY_API_TOKEN}`,
    Accept: "application/json",
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