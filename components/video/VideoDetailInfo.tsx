import Image from 'next/image';
import Avatar from '../ui/Avatar';
import ShareModal from './ShareModal';

type Props = {
  isLike: boolean | null;
  videoTitle: string;
  channelProfileUrl: string;
  channelName: string;
  likeCount: number;
  createAt: string;
  content: string;
  readCount: number;
  handleLike: () => void;
};

export default function VideoDetailInfo({
  handleLike,
  videoTitle,
  channelProfileUrl,
  channelName,
  likeCount,
  readCount,
  createAt,
  content,
  isLike,
}: Props) {
  return (
    <div className='my-5'>
      <div className='rounded-md w-full mx-auto'>
        <div className='flex justify-between py-5 items-center'>
          <div className='text-2xl mx-3 font-bold'>{videoTitle}</div>

          <div className='' />
        </div>

        <div className='flex items-center py-4 rounded-lg justify-between'>
          <div className='flex items-center'>
            <div>
              <Avatar width={12} imgUrl={channelProfileUrl} marginX={3} />
            </div>
            <div className=''>{channelName || '채널명'}</div>
            <div className='btn btn-secondary mx-5 btn-sm'> 구독 </div>
          </div>

          <div className='flex items-center'>
            <div className='btn bg-slate-100 rounded-full' onClick={handleLike}>
              <span className='text-sm'>{likeCount}</span>
              <div className=''>
                {isLike ? (
                  <Image src='/images/heart.png' alt='heart' width={23} height={23} />
                ) : (
                  <Image src='/images/heart-empty.png' alt='heart' width={23} height={23} />
                )}
              </div>
            </div>
            <ShareModal />
          </div>
        </div>

        <div className='mx-3 p-5 bg-gray-100 rounded-md'>
          <div className='text-sm pb-3'>
            조회수 {readCount}회 · 업로드 {createAt}
          </div>
          {content}
        </div>
      </div>
    </div>
  );
}
