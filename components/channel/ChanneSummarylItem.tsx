import { channelSummaryType } from '@/types/channelType';
import Avatar from '../profile/Avatar';

type props = {
  channelItem: channelSummaryType;
};

export default function ChannelItem({ channelItem }: props) {
  return (
    <button type='button' className='w-full bg-base-100 hover:bg-gray-100 text-left h-20 rounded-2xl'>
      <div className='flex items-center px-2 justify-center'>
        <div className='px-1'>{channelItem.id}</div>
        <Avatar width={11} marginX={2} />
        <div className='grow'>
          <div className='font-bold text-sm'>{channelItem.title}</div>
          <div className='flex-wrap max-xl:hidden h-7 text-xs overflow-hidden'>{channelItem.description}</div>
        </div>
      </div>
    </button>
  );
}
