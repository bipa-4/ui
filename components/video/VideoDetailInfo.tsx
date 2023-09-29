import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useVideoData from '@/hooks/useVideoData';
import Avatar from '../ui/Avatar';

type Props = {
  handleLike: () => void;
};

export default function VideoDetailInfo({ handleLike }: Props) {
  const router = useRouter();
  const { vid } = router.query;
  const { data } = useVideoData(vid?.toString());
  return (
    <div>
      <div className='rounded-md p-4 w-full mx-auto'>
        <div className='flex justify-between py-5 items-center'>
          <div className='text-2xl mx-3 font-bold'>{data.videoTitle}</div>
          <div className=''>
            <span className='text-sm'>조회수 {data.readCnt}회 · </span>
            <span className='text-sm'>좋아요 {data.readCnt}개</span>
            <label className='swap swap-flip text-xl px-3 align-text-bottom'>
              <input type='checkbox' />
              <div className='swap-on' onClick={handleLike}>
                <Image src='/images/heart.png' alt='heart' width={23} height={23} />
              </div>
              <div className='swap-off' onClick={handleLike}>
                <Image src='/images/heart-empty.png' alt='heart' width={23} height={23} />
              </div>
            </label>
          </div>
        </div>

        <div className='flex items-center hover:bg-slate-200 py-4 rounded-lg'>
          <div>
            <Avatar width={12} imgUrl={data.channelProfileUrl} marginX={3} />
          </div>
          <div className='font-bold'>{data.channelName || '채널명'}</div>
        </div>
        <div className='mx-3 py-5'>{data.content}</div>
      </div>
    </div>
  );
}
