import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useVideoData from '@/hooks/useVideoData';

export default function VideoDetail() {
  const router = useRouter();
  const { vid } = router.query;

  // swr은 useEffect안에 넣지 않아도 됨
  const { video, error } = useVideoData(vid?.toString());

  console.log('Data', video);

  if (error) return <div>error</div>;
  if (!video) return <div className='h-screen flex items-center m-auto'>loading...</div>;

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
        <VideoDetailLayout />
      </div>
    </>
  );
}
