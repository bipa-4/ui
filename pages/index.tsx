import Head from 'next/head';
import MainLayout from '../containers/main/MainLayout';
import { VideoCardType } from '@/types/videoType';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Props = {
  topVideoList: VideoCardType[];
};

const BASE_URL = process.env.JSON_SERVER_URL;

// getServerSidePorps를 호출하면 이 페이지는 요청대마다 다시 렌더링 된다.
export async function getServerSideProps() {
  const res = await axios.get(`${BASE_URL}/top10`);
  const topVideoList = res.data;
  return {
    props: {
      topVideoList,
    },
  };
}

export default function Home({ topVideoList }: Props) {
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
