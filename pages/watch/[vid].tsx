import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import Head from 'next/head';
import videoItem from '@/public/staticData/videoData';

// todo: data fetch - 개별 영상 조회 ISR
// todo: data fetch - 댓글 조회 SSR
// todo: data fetch - 추천 영상 조회 ISR

export default function VideoDetail() {
  return (
    <>
      <Head>
        <title>{videoItem.title} | StreamWave</title>
        <meta name='description' content={videoItem.description} />
        <meta property='og:title' content={`${videoItem.title} - StreamWave`} />
        <meta property='og:description' content={videoItem.description} />
        <meta property='og:image' content={videoItem.thumbnailUrl} />
      </Head>
      <div className='h-full mx-40 max-xl:mx-5'>
        <VideoDetailLayout video={videoItem} />
      </div>
    </>
  );
}
