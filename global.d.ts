export {}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        username: string
      }
      payload: any
    }

    interface Response {
      time: number
    }
  }
}
