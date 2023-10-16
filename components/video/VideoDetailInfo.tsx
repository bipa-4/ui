import Image from 'next/image';
import { useRouter } from 'next/router';
import { VideoDetailType } from '@/types/videoType';
import Avatar from '../ui/Avatar';
import ShareModal from './ShareModal';
import { useState } from 'react';

type Props = {
  isLike: boolean | null;
  video: VideoDetailType;
  handleLike: () => void;
};

export default function VideoDetailInfo({ handleLike, video, isLike }: Props) {
  const [readMore, setReadMore] = useState(false);
  const router = useRouter();
  const channelClickHandler = () => {
    router.push(`/channel/${video.channelId}`);
  };

  return (
    <div className='my-5'>
      <div className='rounded-md w-full mx-auto'>
        <div className='flex justify-between py-5 items-center'>
          <div className='text-2xl mx-3 font-bold'>{video.videoTitle}</div>

          <div className='' />
        </div>

        <div className='flex items-center py-4 rounded-lg justify-between '>
          <div className='flex items-center cursor-pointer' onClick={channelClickHandler}>
            <div>
              <Avatar width={12} imgUrl={video.channelProfileUrl} marginX={3} />
            </div>
            <div className=''>{video.channelName || '채널명'}</div>
            {/* <div className='btn btn-secondary mx-5 btn-sm'> 구독 </div> */}
          </div>

          <div className='flex items-center'>
            <div className='btn bg-slate-100 rounded-full' onClick={handleLike}>
              <span className='text-sm'>{video.likeCount}</span>
              {isLike ? (
                <Image src='/images/heart.png' alt='heart' width={23} height={23} />
              ) : (
                <Image src='/images/heart-empty.png' alt='heart' width={23} height={23} />
              )}
            </div>
            <ShareModal />
          </div>
        </div>

        <div className='mx-3 p-5 bg-gray-100 rounded-md'>
          <div className='text-sm pb-3'>
            조회수 {video.readCount}회 · 업로드 {video.createAt}
          </div>
          {readMore ? <div className=''>{video.content}</div> : <div className='line-clamp-1'>{video.content}</div>}
          <div className='text-sm text-blue-500 cursor-pointer mt-4' onClick={() => setReadMore(!readMore)}>
            {readMore ? '간략히' : '더보기'}
          </div>
        </div>
      </div>
    </div>
  );
}
