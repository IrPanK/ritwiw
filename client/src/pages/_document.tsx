import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Poppins:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body className="bg-[#281D40]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
