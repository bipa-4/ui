import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fetcher from '@/utils/axiosFetcher';
import { VideoDetailType } from '@/types/videoType';
import { SWRConfig } from 'swr';

interface VideoDetailProps {
  vid: string;
  fallback: Record<string, VideoDetailType>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const vid = params?.vid;
  const API = `${process.env.NEXT_PUBLIC_BASE_URL}/video/detail/${vid}`;

  const video: VideoDetailType = await fetcher(API);

  return {
    props: {
      vid,
      fallback: {
        [API]: video,
      },
      ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header', 'videoDetail'])),
    },
  };
}

export default function VideoDetail({ vid, fallback }: VideoDetailProps) {
  const preFetchedVideo = fallback[`${process.env.NEXT_PUBLIC_BASE_URL}/video/detail/${vid}`];

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title>{preFetchedVideo.videoTitle} | StreamWave</title>
        <meta name='description' content={preFetchedVideo.content} />
        <meta property='og:title' content={`${preFetchedVideo.videoTitle} - StreamWave`} />
        <meta property='og:description' content={preFetchedVideo.content} />
        <meta property='og:image' content={preFetchedVideo.thumbnail} />
      </Head>
      <div className='h-full px-40 max-xl:px-5 max-md:px-0 bg-base-100'>
        <VideoDetailLayout />
      </div>
    </SWRConfig>
  );
}
