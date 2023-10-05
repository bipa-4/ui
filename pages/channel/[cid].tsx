import ChannelDetailLayout from '@/containers/channel/ChannelDetailLayout';
import Head from 'next/head';
import { channelData } from '@/public/staticData/channelData';

export default function Channel() {
  return (
    <>
      <Head>
        <title>{channelData.channelName} | StreamWave</title>
        <meta name='description' content={channelData.content} />
        <meta property='og:title' content={`${channelData.channelName} - StreamWave`} />
        <meta property='og:description' content={channelData.content} />
        <meta property='og:image' content={channelData.profileUrl} />
      </Head>
      <div className='mx-44 max-xl:mx-7'>
        <ChannelDetailLayout />
      </div>
    </>
  );
}
