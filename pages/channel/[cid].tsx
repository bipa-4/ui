import ChannelDetailLayout from '@/containers/channel/ChannelDetailLayout';
import Head from 'next/head';
import { channelData } from '@/public/staticData/channelData';
import { GetServerSidePropsContext } from 'next/types';
import fetcher from '@/utils/axiosFetcher';

interface ChannelDetailType {
  channel: any;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const vid = params?.vid;
  const API = `${process.env.NEXT_PUBLIC_BASE_URL}/read/video/detail/${vid}`;

  const channel = await fetcher(API);

  return {
    props: {
      channel,
    },
  };
}

export default function Channel({ channel }: ChannelDetailType) {
  return (
    <>
      <Head>
        <title>{channel.channelName} | StreamWave</title>
        <meta name='description' content={channel.content} />
        <meta property='og:title' content={`${channel.channelName} - StreamWave`} />
        <meta property='og:description' content={channel.content} />
        <meta property='og:image' content={channel.profileUrl} />
      </Head>
      <div className='mx-44 max-xl:mx-7'>
        <ChannelDetailLayout />
      </div>
    </>
  );
}
