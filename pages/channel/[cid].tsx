import ChannelDetailLayout from '@/containers/channel/ChannelDetailLayout';
import Head from 'next/head';
import { channelData } from '@/public/staticData/channelList';

export default function Channel() {
  return (
    <>
      <Head>
        <title>{channelData.title} | StreamWave</title>
        <meta name='description' content={channelData.description} />
        <meta property='og:title' content={`${channelData.title} - StreamWave`} />
        <meta property='og:description' content={channelData.description} />
        <meta property='og:image' content={channelData.channelImgUrl} />
      </Head>
      <div className='mx-44 max-xl:mx-7'>
        <ChannelDetailLayout />
      </div>
    </>
  );
}
