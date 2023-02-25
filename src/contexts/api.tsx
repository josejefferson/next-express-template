import { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import Failed from '../components/common/failed'
import Loading from '../components/common/loading'
import { IValue } from '../types/api'
import api from '../utils/api'
import { getLoginURL } from '../utils/helpers'

export const APIContext = createContext<IValue>({
  loading: true,
  error: null,
  data: null,
  refresh: () => {},
  setData: () => {}
})

interface IProps {
  children: ReactNode
  before?: ReactNode
  after?: ReactNode
  url: string
  disable?: boolean
  disableLoginRedirect?: boolean
  refreshEmitter?: any
  axiosOptions?: any
  axiosThen?: (value: AxiosResponse<any, any>) => any
  axiosCatch?: (err: any) => any
  valueRef?: any
  customEffect?: () => any
  CustomLoading?: () => JSX.Element
  CustomFailed?: ({ err }: { err: any }) => JSX.Element
}

export default function API({
  children,
  before,
  after,
  url,
  disable,
  disableLoginRedirect,
  refreshEmitter,
  axiosOptions,
  axiosThen,
  axiosCatch,
  valueRef,
  CustomLoading,
  CustomFailed
}: IProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const router = useRouter()

  const fetchData = useCallback(
    (showLoading = false) => {
      if (disable) return
      if (showLoading) setLoading(true)
      api
        .get(url, axiosOptions || {})
        .then((value) => {
          const data = axiosThen?.(value) ?? value.data
          setData(data)
          setError(null)
        })
        .catch((err) => {
          axiosCatch?.(err)
          if (err?.response?.status === 401 && !disableLoginRedirect) router.replace(getLoginURL())
          console.error('err', err)
          setError(err)
        })
        .finally(() => setLoading(false))
    },
    [url, axiosOptions, disable, router, disableLoginRedirect, axiosThen, axiosCatch]
  )

  if (refreshEmitter) refreshEmitter.on('refresh', fetchData)
  useEffect(fetchData, [fetchData])

  const value = { loading, error, data, refresh: fetchData, setData }
  if (valueRef) valueRef.current = value

  if (loading) children = CustomLoading ? <CustomLoading /> : <Loading />
  if (error) children = CustomFailed ? <CustomFailed err={error} /> : <Failed err={error} />

  return (
    <>
      <APIContext.Provider value={value}>
        {before}
        {children}
        {after}
      </APIContext.Provider>
    </>
  )
}

export const useAPI = () => useContext(APIContext)
