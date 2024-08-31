import { } from 'hono'

type Head = {
  title?: string
}


type Bindings = {
  SERVICE_DOMAIN: string
  API_KEY: string
}

declare module 'hono' {
  interface Env {
    Variables: {}
    Bindings: Bindings
  }
  interface ContextRenderer {
    (content: string | Promise<string>, head?: Head): Response | Promise<Response>
  }
}
