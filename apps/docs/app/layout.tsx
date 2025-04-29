import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { /*Banner,*/ Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
//import Link from "next/link";

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

//const banner = <Banner storageKey="some-key">This template was created with 🩸 and 💦 by <Link href="https://github.com/phucbm">PHUCBM</Link> 🐧</Banner>
const navbar = (
  <Navbar
    //logo={<img src="/images/general/logo.svg" alt="Logo" width={100} height={20}/>}
    logo={
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        Lophius project
      </span>
    }
    // ... Your additional navbar options
  />
)
const footer = <Footer>AGPL {new Date().getFullYear()} © Lophius.</Footer>

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang='en'
      // Required to be set
      dir='ltr'
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        <link rel='shortcut icon' href='/images/general/icon.svg' />
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          //banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase='https://github.com/zamelane/lophius'
          footer={footer}
          sidebar={{
            defaultMenuCollapseLevel: 1
          }}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
