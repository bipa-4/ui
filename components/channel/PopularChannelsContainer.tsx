import React from 'react';
import Title from '@/components/ui/Title';
import { ChannelSummaryType } from '@/types/channelType';
import ChannelItem from './ChannelSummarylItem';

type props = {
  channelList: ChannelSummaryType[];
};

export default function ChannelContainer({ channelList }: props) {
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
