<script setup lang="ts">
import { getPageQuery } from '~/queries'
import { queryApi, queryHeaders } from "~/data/constants";

// Fetch home data
const { data: pageData } = await useFetch(queryApi, {
  method: "post",
  body: getPageQuery('home'),
  headers: queryHeaders,
});

const data = pageData.value;

// If page content is empty, load the error page
// if (!data?.result) {
//   const { data: pageData } = await useKql(getPageQuery('error'))
//   data = pageData.value
//   setResponseStatus(useRequestEvent(), 404)
// }

// Set the current page data for the global page context
const page = (data as any)?.result;

setPage(page);

setContent('');

setDescriptionIndex(-1);

</script>