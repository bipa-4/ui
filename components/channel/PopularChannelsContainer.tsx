import React from 'react';
import Title from '@/components/ui/Title';
import { channelSummaryListType } from '@/types/channelType';
import ChannelItem from './ChannelSummarylItem';

type props = {
  channelList: channelSummaryListType;
};

export default function ChannelContainer({ channelList }: props) {
  return (
    <div>
      <div className=' px-2 py-4'>
        <Title text='실시간 인기 채널' />
      </div>
      <div>
        {channelList.map((item) => (
          <ChannelItem key={item.id} channelItem={item} rank={item.id} />
        ))}
      </div>
    </div>
  );
}
