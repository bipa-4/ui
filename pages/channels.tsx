import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import AllChannelsContainer from '../components/channel/AllChannelsContainer';

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
    props: {
      ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header'])),
    },
  });

export default function channels() {
  return (
    <>
      <Head>
        <title>채널 전체보기 | StreamWave</title>
        <meta name='description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:title' content='간편한 영상 공유 플랫폼 - StreamWave' />
        <meta property='og:description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:image' content='/images/streamWave.png' />
      </Head>
      <div className='min-h-screen px-48 max-lg:px-5 bg-base-100'>
        <AllChannelsContainer />
      </div>
    </>
  );
}
