import channelDataList from '@/public/staticData/channelData';
import Head from 'next/head';
import AllChannelsContainer from '../components/channel/AllChannelsContainer';

export default function channels() {
  return (
    <>
      <Head>
        <title>채널 전체보기 | StreamWave</title>
        <meta name='description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:title' content='간편한 영상 공유 플랫폼 - StreamWave' />
        <meta property='og:description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:image' content='/images/streamWave.png' />
      </Head>
      <div className='h-screen mx-48 max-lg:mx-auto'>
        <AllChannelsContainer channelList={channelDataList} />
      </div>
    </>
  );
}
