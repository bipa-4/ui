import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next/types';
import fetcher from '@/utils/axiosFetcher';
import { VideoDetailType } from '@/types/videoType';
import { SWRConfig } from 'swr';
import useVideoData from '@/hooks/useVideoData';

interface VideoDetailProps {
  video: VideoDetailType;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const vid = params?.vid;
  const API = `${process.env.NEXT_PUBLIC_BASE_URL}/read/video/detail/${vid}`;

  const video: VideoDetailType = await fetcher(API);

  return {
    props: {
      video,
    },
  };
}

export default function VideoDetail({ video }: VideoDetailProps) {
  return (
    <SWRConfig>
      <Head>
        <title>{video.videoTitle} | StreamWave</title>
        <meta name='description' content={video.content} />
        <meta property='og:title' content={`${video.videoTitle} - StreamWave`} />
        <meta property='og:description' content={video.content} />
        <meta property='og:image' content={video.thumbnail} />
      </Head>
      <div className='h-full mx-40 max-xl:mx-5'>
        <VideoDetailLayout />
      </div>
    </SWRConfig>
  );
}
