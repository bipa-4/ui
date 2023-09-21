import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import videoItem from '@/public/staticData/videoDetail';

// todo: data fetch - 개별 영상 조회 ISR
// todo: data fetch - 댓글 조회 SSR
// todo: data fetch - 추천 영상 조회 ISR

export default function VideoDetail() {
  const isLoading = false;

  return (
    <>
      <Head>
        <title>StreamWave</title>
        <meta name='description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:title' content='간편한 영상 공유 플랫폼 - StreamWave' />
        <meta property='og:description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:image' content='/images/streamWave.png' />
      </Head>
      <div className='h-full mx-40 max-xl:mx-5'>
        <VideoDetailLayout video={videoItem} />
      </div>
    </>
  );
}
