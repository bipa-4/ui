import { channelSummaryListType } from '@/types/channelType';
import ChannelSummaryItem from './ChannelSummarylItem';
import Title from '../ui/Title';

type props = {
  channelList: channelSummaryListType;
};

export default function AllChannelsContainer({ channelList }: props) {
  return (
    <>
      <div className='border-0 border-b border-slate-400 p-6 my-2'>
        <Title text='채널 전체' />
      </div>
      <div className='flex flex-wrap w-full'>
        {channelList.map((item) => (
          <ChannelSummaryItem key={item.id} channelItem={item} size='large' />
        ))}
      </div>
    </>
  );
}
