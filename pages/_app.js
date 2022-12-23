import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Simular CA</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3931171896983486" crossOrigin="true"></script>
                <link rel="icon" type="image/png" href="icon.jpeg" />
                {/* FACEBOOk */}
                <meta property="og:title" content='Simular CA' />
                <meta property="og:url" content='https://ca-simulator.vercel.app/' />
                <meta property="og:description" content='Simula a rentabilidade do teu aforro!' />
                <meta property="og:image" content='icon.jpeg' />
                {/* TWITTER */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Simular CA" />
                <meta name="twitter:description" content="Simula a rentabilidade do teu aforro!" />
                <meta name="twitter:image" content="icon.jpeg" />
            </Head>
            <Component pageProps={pageProps} />
            <Analytics />
        </>
    )
}

export default MyApp
