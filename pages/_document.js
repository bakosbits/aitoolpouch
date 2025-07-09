import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script
                    defer
                    data-domain="aitoolpouch.com"
                    src="https://plausible.io/js/script.outbound-links.js"
                ></script>
                {/* Charset and Viewport (optional here; usually set in _app.js or individual pages) */}
                <meta charSet="utf-8" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" />

                {/* Web fonts or preloads, if any */}
                {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />

                {/* You can also include a default OG image fallback here */}
            </Head>
            <body>
                <Main />
                <div id="portal-root"></div>
                <NextScript />
            </body>
        </Html>
    );
}
