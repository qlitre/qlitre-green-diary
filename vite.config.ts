import pages from '@hono/vite-cloudflare-pages'
import honox from 'honox/vite'
import client from 'honox/vite/client'
import { defineConfig } from 'vite'
import adapter from '@hono/vite-dev-server/cloudflare'

export default defineConfig(({ mode }) => {

  if (mode === 'client') {
    return {
      plugins: [client()],
      build: {
        rollupOptions: {
          input: ["/app/style.css"]
        },
      },
    }
  }
  return {
    ssr: {
      external: ['microcms-js-sdk']
    },
    plugins: [honox({
      devServer: {
        adapter
      }
    }), pages()]
  }
})
