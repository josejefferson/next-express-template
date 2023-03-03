import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import api from '../utils/api'

interface IOptions {
  disable?: boolean
  defaultData?: any
  showLoading?: boolean
  axiosOptions?: AxiosRequestConfig
  axiosThen?: (value: AxiosResponse<any, any>) => any
}

export default function useAPIHook<T = any>(
  url: string,
  { defaultData, disable, showLoading, axiosOptions, axiosThen }: IOptions = {}
) {
  const [data, setData] = useState<T>(defaultData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const refresh = useCallback(() => {
    if (disable) return
    if (showLoading) {
      setLoading(true)
      setError(null)
    }
    api
      .get(url, axiosOptions || {})
      .then((value) => {
        const data = axiosThen?.(value) ?? value.data
        setData(data)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [url, axiosOptions, disable, showLoading, axiosThen])

  useEffect(refresh, [refresh])

  return { data, loading, error, refresh }
}
