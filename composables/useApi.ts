import type { FetchOptions } from 'ofetch'
import { $fetch } from 'ofetch'

// Services
import DashboardService from '@/repository/services/dashboard'

interface ApiInstance {
  dashboard: DashboardService
}

export default function useApi() {
  const { BASE_URL } = useRuntimeConfig().public

  const fetchOptions: FetchOptions = {
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },

    onRequest() {},

    onResponseError() {},

    onResponse() {},
  }

  /* create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions)

  /* Object containing all services we need to expose */
  const services: ApiInstance = {
    dashboard: new DashboardService(apiFetcher),
  }

  return {
    api: services,
  }
}
