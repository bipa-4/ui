import { channelSummaryType } from '@/types/channelType';
import Image from 'next/image';

type props = {
  channelItem: channelSummaryType;
};

export default function ChannelItem({ channelItem }: props) {
  return (
    <button type='button' className='w-full bg-base-100 hover:bg-gray-100 text-left h-20 rounded-2xl'>
      <div className='flex items-center px-2 justify-center'>
        <div className='px-1'>{channelItem.id}</div>
        <div className='avatar p-2'>
          <div className='w-11 h-11 rounded-full'>
            <Image src={channelItem.imgUrl} alt='z' width={200} height={200} />
          </div>
        </div>
        <div className='grow'>
          <div className='font-bold text-sm'>{channelItem.title}</div>
          <div className='flex-wrap max-xl:hidden h-7 text-xs overflow-hidden'>{channelItem.description}</div>
        </div>
      </div>
    </button>
  );
}
