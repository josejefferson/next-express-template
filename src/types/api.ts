export interface IValue {
  loading: boolean
  error: any
  data: any
  refresh: () => void
  setData: (data: any) => void
}
