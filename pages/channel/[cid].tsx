import ChannelDetailLayout from '@/containers/channel/ChannelDetailLayout';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { ChannelDetailType } from '@/types/channelType';
import fetcher from '@/utils/axiosFetcher';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface ChannelProps {
  channel: ChannelDetailType;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const cid = params?.cid;
  const API = `${process.env.NEXT_PUBLIC_BASE_URL}/channel/${cid}`;
  const channel = await fetcher(API);

  return {
    props: {
      channel,
      ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header', 'channelDetail'])),
    },
  };
}

export default function Channel({ channel }: ChannelProps) {
  return (
    <>
      <Head>
        <title>{channel.channelName} | StreamWave</title>
        <meta name='description' content={channel.content} />
        <meta property='og:title' content={`${channel.channelName} - StreamWave`} />
        <meta property='og:description' content={channel.content} />
        <meta property='og:image' content={channel.profileUrl} />
      </Head>
      <div className='px-44 max-xl:px-7 max-md:px-3 min-h-screen bg-base-100'>
        <ChannelDetailLayout channelInfo={channel} />
      </div>
    </>
  );
}
