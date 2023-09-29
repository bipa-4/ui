import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import { VideoDetailType } from '@/types/videoType';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import useSWR from 'swr';
import { useRouter } from 'next/router';

// todo: data fetch - 개별 영상 조회 ISR
// todo: data fetch - 댓글 조회 SSR
// todo: data fetch - 추천 영상 조회 ISR

//type Props = {
//  video: VideoDetailType;
//};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//export async function getServerSideProps(context: GetServerSidePropsContext) {
//  const { vid } = context.query;
//  const res = await axios.get(`${BASE_URL}/read/video/detail/${vid}`);
//  const video = res.data;
//  return {
//    props: {
//      video,
//    },
//  };
//}

export default function VideoDetail() {
  const router = useRouter();
  const { vid } = router.query;
  console.log('vid', vid);

  // swr은 useEffect안에 넣지 않아도 됨
  const { data, error } = useSWR(vid ? `${BASE_URL}/read/video/detail/${vid}` : null, fetcher);

  console.log('Data', data);

  if (error) return <div>error</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>{data.videoTitle} | StreamWave</title>
        <meta name='description' content={data.content} />
        <meta property='og:title' content={`${data.videoTitle} - StreamWave`} />
        <meta property='og:description' content={data.content} />
        <meta property='og:image' content={data.thumbnail} />
      </Head>
      <div className='h-full mx-40 max-xl:mx-5'>
        <VideoDetailLayout video={data} />
      </div>
    </>
  );
}
