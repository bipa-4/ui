import { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/nprogress.css';
import { Noto_Sans_KR as notoSansKr } from 'next/font/google';
import Layout from '@/components/layouts/Layout';
import { Provider } from 'jotai';
import nProgress from 'nprogress';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import { useHydrateAtoms } from 'jotai/utils';
import userAtom from '@/atoms/user';
import { appWithTranslation } from 'next-i18next';
import TopButton from '@/components/ui/TopButton';

const noto = notoSansKr({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
});

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  const { initialState } = pageProps;
  useHydrateAtoms([[userAtom, initialState]]);

  return (
    <Provider>
      <ThemeProvider defaultTheme='system'>
        <main className={noto.className}>
          <Layout>
            <Component {...pageProps} />
            <TopButton />
          </Layout>
        </main>
      </ThemeProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
