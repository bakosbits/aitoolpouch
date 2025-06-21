// pages/_app.js
import Layout from '@/components/Layout'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout categories={pageProps.categories || []}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
