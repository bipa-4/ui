import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' className='dark'>
      <Head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <script defer src='https://developers.kakao.com/sdk/js/kakao.min.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
