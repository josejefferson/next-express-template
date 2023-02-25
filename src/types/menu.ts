export interface IMenu {
  name: string
  url: string
  icon: (props: any) => JSX.Element
  forceReload?: boolean
}
