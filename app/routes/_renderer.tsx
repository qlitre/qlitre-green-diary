import { Style } from 'hono/css'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Script, Link } from 'honox/server'
import { Header } from '../components/Header'

export default jsxRenderer(({ children, title, description, contentUrl, thumbnailUrl }) => {
  const _contentUrl = contentUrl ? contentUrl : 'https://green-diary.pages.dev/'
  const _title = title ? title : 'QLITRE GREEN DIARY'
  const _description = description ? description : 'QLITREの植物成長記録サイト'
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={_description}></meta>
        <meta property="og:url" content={_contentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={_title} />
        <meta property="og:description" content={_description} />
        <meta property="og:site_name" content='QLITRE GREEN DIARY' />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kuri_tter" />
        <meta name="twitter:title" content={_title} />
        <meta name="twitter:description" content={_description} />
        <meta
          name="twitter:image"
          content={thumbnailUrl}
        />
        <title>{_title}</title>
        <link rel="icon" href="/favicon.ico" />
        <Link href="/app/style.css" rel="stylesheet" />
        <Script src="/app/client.ts" async />
        <Style />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
})
