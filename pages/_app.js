import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isFullWidth = router.pathname === '/' || 
    router.pathname === '/categories' ||
    router.pathname === '/terms' ||
    router.pathname === '/privacy' ||
    router.pathname === '/legal' ||
    router.pathname === '/about' ||
    router.pathname.startsWith('/tool');

  return (
    <Layout fullWidth={isFullWidth} categories={pageProps.categories || []}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
