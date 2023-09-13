import { AppProps } from 'next/app';
import '../styles/global.css';
import Layout from '@/components/Layouts/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
