import Head from 'next/head';
import { VideoCardType } from '@/types/videoType';
import axios from 'axios';
import MainLayout from '../containers/main/MainLayout';

type Props = {
  topVideoList: VideoCardType[];
};

// getServerSidePorps를 호출하면 이 페이지는 요청대마다 다시 렌더링 된다.
export async function getServerSideProps() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await axios.get(`${BASE_URL}/video/top10`);
  const topVideoList = res.data;
  return {
    props: {
      topVideoList,
    },
  };
}

export default function Home({ topVideoList }: Props) {
  console.log(`Server started on POST ${process.env.PORT}....`);
  console.log('받아온 데이터: ', topVideoList);
  return (
    <>
      <Head>
        <title>StreamWave</title>
        <meta name='description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:title' content='간편한 영상 공유 플랫폼 - StreamWave' />
        <meta property='og:description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:image' content='/images/streamWave.png' />
      </Head>
      <div className='h-full mx-44 max-xl:mx-5'>
        <MainLayout topVideoList={topVideoList} recentVideoList={topVideoList} />
      </div>
    </>
  );
}
