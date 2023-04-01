import type { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { createContext, Fragment, useCallback, useContext, useEffect, useState } from 'react'
import Failed from '#components/common/failed'
import Loading from '#components/common/loading'
import api from '#utils/api'
import { getLoginURL } from '#utils/helpers'

export interface IValue {
  loading: boolean
  error: any
  data: any
  refresh: () => void
  setData: (data: any) => void
}

export const APIContext = createContext<IValue>(null as any)
export const useAPI = () => useContext(APIContext)

export interface IProps {
  children: ReactNode
  before?: ReactNode
  after?: ReactNode
  layout?: FC<PropsWithChildren>
  url: string
  disable?: boolean
  disableLoadingChild?: boolean
  disableErrorChild?: boolean
  disableLoginRedirect?: boolean
  refreshEmitter?: any
  axiosOptions?: any
  axiosThen?: (value: AxiosResponse<any, any>) => any
  axiosCatch?: (err: any) => any
  valueRef?: any
  customEffect?: () => any
  CustomLoading?: () => JSX.Element
  CustomFailed?: ({ err, retry }: { err: any; retry?: () => any }) => JSX.Element
}

export default function API({
  children,
  before,
  after,
  layout,
  url,
  disable,
  disableLoadingChild,
  disableErrorChild,
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
  const Layout = layout ?? Fragment

  const fetchData = useCallback(
    (showLoading = false) => {
      if (disable) return
      if (showLoading) {
        setLoading(true)
        setError(null)
      }
      api
        .get(url, axiosOptions || {})
        .then((value) => {
          if (value.data === null) throw new Error('Esta entidade não existe')
          const data = axiosThen?.(value) ?? value.data
          setData(data)
          setError(null)
        })
        .catch((err) => {
          axiosCatch?.(err)
          if (err?.response?.status === 401 && !disableLoginRedirect) router.replace(getLoginURL())
          console.error(err)
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

  if (!disableLoadingChild && loading) children = CustomLoading ? <CustomLoading /> : <Loading />
  if (!disableErrorChild && error)
    children = CustomFailed ? (
      <CustomFailed err={error} retry={() => fetchData(true)} />
    ) : (
      <Failed err={error} retry={() => fetchData(true)} />
    )

  return (
    <>
      <APIContext.Provider value={value}>
        <Layout>
          {before}
          {children}
          {after}
        </Layout>
      </APIContext.Provider>
    </>
  )
}
