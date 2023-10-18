import React, { useEffect, useState } from 'react';
import Title from '@/components/ui/Title';
import { ChannelSummaryType } from '@/types/channelType';
import fetcher from '@/types/utils/axiosFetcher';
import useSWR from 'swr';
import ChannelItem from './ChannelSummarylItem';
import VideoSummarySkeletonRow from '../skeleton/ChannelSummarySkeletonRow';
import ChannelSummarySkeletonRow from '../skeleton/ChannelSummarySkeletonRow';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ChannelContainer() {
  const [channelList, setChannelList] = useState<ChannelSummaryType[]>();
  const { data } = useSWR(`${BASE_URL}/channel/top5`, fetcher);

  useEffect(() => {
    setChannelList(data);
  }, [data]);

  const skeletonRows = [];

  for (let i = 0; i < 5; i++) {
    skeletonRows.push(<ChannelSummarySkeletonRow key={i} />);
  }

  if (!channelList) {
    return (
      <div>
        <div className=' px-2 py-4'>
          <Title text='실시간 인기 채널' />
        </div>
        <div>{skeletonRows}</div>
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
          <ChannelItem key={item.channelId} channelItem={item} rank={item.ranking} />
        ))}
      </div>
    </div>
  );
}
