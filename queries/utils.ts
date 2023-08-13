const { KIRBY_BASE_URL } = useRuntimeConfig().app;

export const queryApi = `${KIRBY_BASE_URL}/api/query`;

export const queryHeaders = {
  // Authorization: `Basic ${btoa(KIRBY_API_USERNAME + ":" + KIRBY_API_PASSWORD)}`,
  // Authorization: `Bearer ${KIRBY_API_TOKEN}`,
  Accept: "application/json",
};
