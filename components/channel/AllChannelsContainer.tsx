import useSWR from 'swr';
import fetcher from '@/types/utils/axiosFetcher';
import { ChannelSummaryType } from '@/types/channelType';
import { useEffect, useState } from 'react';
import Title from '../ui/Title';
import ChannelSummaryItem from './ChannelSummarylItem';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AllChannelsContainer() {
  const [channelList, setChannelList] = useState<ChannelSummaryType[]>([]);

  const { data } = useSWR(`${BASE_URL}/channel/AllChannel?pageSize=10`, fetcher);

  console.log(data);
  useEffect(() => {
    if (data) {
      setChannelList(data.channelList);
    }
  }, [data]);

  return (
    <>
      <div className='border-0 border-b border-slate-400 p-6 my-2'>
        <Title text='채널 전체' />
      </div>
      <div className='flex flex-wrap w-full'>
        {channelList.map((channel) => (
          <ChannelSummaryItem key={channel.channelId} channelItem={channel} size='large' />
        ))}
      </div>
    </>
  );
}
