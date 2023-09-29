import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useVideoData from '@/hooks/useVideoData';

export default function VideoDetail() {
  const router = useRouter();
  const { vid } = router.query;

  // swr은 useEffect안에 넣지 않아도 됨
  const { data, error } = useVideoData(vid?.toString());

  console.log('Data', data);

  if (error) return <div>error</div>;
  if (!data) return <div className='h-screen flex items-center m-auto'>loading...</div>;

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
        <VideoDetailLayout />
      </div>
    </>
  );
}
