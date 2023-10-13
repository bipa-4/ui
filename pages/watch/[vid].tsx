import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import fetcher from '@/utils/axiosFetcher';
import { VideoDetailType } from '@/types/videoType';
import { SWRConfig } from 'swr';
import axios from 'axios';

interface VideoDetailProps {
  video: VideoDetailType;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req } = context;
  const vid = params?.vid;
  const API = `${process.env.NEXT_PUBLIC_BASE_URL}/video/detail/${vid}`;

  // 클라이언트 측에서 저장한 쿠키 가져오기
  const clientCookies = req.headers.cookie;

  // 서버사이드 요청 시 쿠키 수동으로 추가
  const axiosConfig = {
    headers: {
      Cookie: clientCookies, // 클라이언트에서 가져온 쿠키를 요청에 추가
    },
  };

  try {
    const response = await axios.get(API, axiosConfig);
    const video: VideoDetailType = response.data;

    return {
      props: {
        video,
      },
    };
  } catch (error) {
    console.error('Error fetching video data:', error);
    return {
      notFound: true, // 또는 다른 오류 처리 방법을 사용할 수 있습니다.
    };
  }
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
        <VideoDetailLayout video={video} />
      </div>
    </SWRConfig>
  );
}
