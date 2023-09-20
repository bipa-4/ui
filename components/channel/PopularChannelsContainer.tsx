import React from 'react';
import Title from '@/components/text/Title';
import { channelSummaryListType } from '@/types/channelType';
import ChannelItem from './ChannelSummarylItem';

type props = {
  channelList: channelSummaryListType;
};

export default function ChannelContainer({ channelList }: props) {
  return (
    <div>
      <div className=' px-2 m-5'>
        <Title text='실시간 인기 채널' />
      </div>
      <div className='my-5'>
        {channelList.map((item) => (
          <ChannelItem key={item.id} channelItem={item} rank={item.id} />
        ))}
      </div>
    </div>
  );
}
