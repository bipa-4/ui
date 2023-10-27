import { ChannelSummaryType } from '@/types/channelType';
import { useRouter } from 'next/router';
import Avatar from '../ui/Avatar';

type props = {
  channelItem: ChannelSummaryType;
  rank?: number;
  size?: 'large' | 'small';
};

/**
 * 채널 요약 정보를 보여주는 컴포넌트
 * @param {ChannelSummaryType} channelItem 채널 정보(단건)
 * @param {number} rank 채널 순위
 * @param {'large' | 'small'} size 크기(large: 큰 크기, small: 작은 크기)
 * @returns {JSX.Element} 채널 요약 정보 컴포넌트
 */
export default function ChannelSummaryItem({ channelItem, rank, size }: props) {
  const router = useRouter();

  const handleItemClick = () => {
    router.push(`/channel/${channelItem.channelId}`);
  };

  return (
    <div
      className={`${
        size === 'large' ? 'w-1/2' : 'w-full'
      } bg-base-100 text-left rounded-2xl hover:bg-base-200 max-lg:w-full cursor-pointer`}
      onClick={handleItemClick}
    >
      <div className={`w-full flex items-center px-2 justify-center ${size === 'large' ? 'h-40' : 'h-20'}`}>
        {rank && <div className='px-1'>{rank}</div>}

        {size === 'small' && (
          <>
            <Avatar width={11} marginX={2} imgUrl={channelItem.profileUrl} />
            <div className='grow overflow-hidden'>
              <div className='font-bold text-sm line-clamp-1'>{channelItem.channelName}</div>
              <p className='flex-wrap text-xs overflow-hidden line-clamp-2'>{channelItem.content}</p>
            </div>
          </>
        )}
        {size === 'large' && (
          <>
            <Avatar width={20} marginX={3} imgUrl={channelItem.profileUrl} />
            <div className='grow overflow-hidden px-3'>
              <div className='font-bold text-base line-clamp-1'>{channelItem.channelName}</div>
              <div className='flex-wrap text-sm line-clamp-3'>{channelItem.content}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

ChannelSummaryItem.defaultProps = {
  rank: undefined,
  size: 'small',
};
