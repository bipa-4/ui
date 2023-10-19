import { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/nprogress.css';
import { Noto_Sans_KR as notoSansKr } from 'next/font/google';
import Layout from '@/components/layouts/Layout';
import { Provider } from 'jotai';
import nProgress from 'nprogress';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';

const inter = notoSansKr({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ThemeProvider defaultTheme='system'>
        <main className={inter.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ThemeProvider>
    </Provider>
  );
}
