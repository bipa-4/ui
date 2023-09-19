import { channelSummaryType } from '@/types/channelType';
import Avatar from '../profile/Avatar';

type props = {
  channelItem: channelSummaryType;
  rank: number;
  type?: 'large' | 'small';
};

export default function ChannelSummaryItem({ channelItem, rank, type }: props) {
  const buttonSize = `w-${
    type === 'large' ? '1/2' : 'full'
  } bg-base-100 hover:bg-gray-100 text-left rounded-2xl hover:bg-slate-200 max-lg:w-full`;

  return (
    <button type='button' className={buttonSize}>
      <div className={`flex items-center px-2 justify-center h-${type === 'large' ? 40 : 20}`}>
        {rank !== 0 && <div className='px-1'>1</div>}
        {type === 'small' && <Avatar width={11} marginX={2} />}
        {type === 'large' && <Avatar width={20} marginX={5} />}
        {type === 'small' && (
          <div className='grow'>
            <div className='font-bold text-sm'>{channelItem.title}</div>
            <div className='flex-wrap max-xl:hidden h-7 text-xs overflow-hidden'>{channelItem.description}</div>
          </div>
        )}
        {type === 'large' && (
          <div className='grow'>
            <div className='font-bold text-base'>{channelItem.title}</div>
            <div className='flex-wrap text-sm overflow-hidden'>{channelItem.description}</div>
          </div>
        )}
      </div>
    </button>
  );
}

ChannelSummaryItem.defaultProps = {
  rank: 0,
  type: 'small',
};
