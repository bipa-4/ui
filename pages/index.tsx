import Head from 'next/head';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import MainLayout from '../containers/main/MainLayout';

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header'])),
  },
});

export default function Home() {
  return (
    <>
      <Head>
        <title>StreamWave</title>
        <meta name='description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:title' content='간편한 영상 공유 플랫폼 - StreamWave' />
        <meta property='og:description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:image' content='/images/streamWave.png' />
      </Head>
      <div className='min-h-screen px-32 max-xl:px-5 bg-base-100'>
        <MainLayout />
      </div>
    </>
  );
}
