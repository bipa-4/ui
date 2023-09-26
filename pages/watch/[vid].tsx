import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import { VideoDetailType } from '@/types/videoType';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

// todo: data fetch - 개별 영상 조회 ISR
// todo: data fetch - 댓글 조회 SSR
// todo: data fetch - 추천 영상 조회 ISR

type Props = {
  video: VideoDetailType;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { vid } = context.query;
  const res = await axios.get(`${BASE_URL}/video/detail/${vid}`);
  const video = res.data;
  return {
    props: {
      video,
    },
  };
}

export default function VideoDetail({ video }: Props) {
  console.log(video);
  return (
    <>
      <Head>
        <title>{video.videoTitle} | StreamWave</title>
        <meta name='description' content={video.content} />
        <meta property='og:title' content={`${video.videoTitle} - StreamWave`} />
        <meta property='og:description' content={video.content} />
        <meta property='og:image' content={video.thumbnail} />
      </Head>
      <div className='h-full mx-40 max-xl:mx-5'>
        <VideoDetailLayout video={video} />
      </div>
    </>
  );
}
