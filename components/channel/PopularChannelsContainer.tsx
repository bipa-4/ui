import React, { useEffect, useState } from 'react';
import Title from '@/components/ui/Title';
import { ChannelSummaryType } from '@/types/channelType';
import fetcher from '@/utils/axiosFetcher';
import useSWR from 'swr';
import ChannelItem from './ChannelSummarylItem';
import LoadingSpinner from '../ui/LoadingSpinner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ChannelContainer() {
  const [channelList, setChannelList] = useState<ChannelSummaryType[]>();
  const { data } = useSWR(`${BASE_URL}/channel/top5`, fetcher);

  useEffect(() => {
    setChannelList(data);
  }, [data]);

  if (!channelList) {
    return (
      <div>
        <div className=' px-2 py-4'>
          <Title text='실시간 인기 채널' />
        </div>
        <div className='flex items-center'>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=' px-2 py-4'>
        <Title text='실시간 인기 채널' />
      </div>
      <div>
        {channelList.map((item, index) => (
          <ChannelItem key={item.channelId} channelItem={item} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
