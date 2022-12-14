import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Simular CA</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
                {/*<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3931171896983486"
                    crossOrigin="anonymous"></script>
                 <link rel="icon" type="image/png" href="favicon.png"/>
                <meta property="og:title" content='Impac&apos;tu' />
                <meta property="og:url" content='https://www.impactu.org' />
                <meta property="og:description" content='Somos uma Associação de estudantes do Porto que ajuda pessoas e famílias carenciadas. Vamos criar impacto?'/>
                <meta property="og:image" content='./favicon.png'/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet"/> */}
            </Head>
            <Component pageProps={pageProps} />
            <Analytics />
        </>
    )
}

export default MyApp