import UploadLayout from '@/containers/upload/UploadLayout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header'])),
  },
});

export default function upload() {
  return (
    <>
      <Head>
        <title>업로드 | StreamWave</title>
        <meta name='description' content='간단하게 영상을 공유해보세요 - StreamWave' />
      </Head>
      <div className='h-full px-44 max-xl:px-5 bg-base-100'>
        <UploadLayout />
      </div>
    </>
  );
}
