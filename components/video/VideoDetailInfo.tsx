import React from 'react';
import Image from 'next/image';
import Avatar from '../ui/Avatar';

type Props = {
  channelProfileUrl: string;
  channelName: string;
  content: string;
  handleLike: () => void;
};

export default function VideoDetailInfo({ channelProfileUrl, channelName, content, handleLike }: Props) {
  return (
    <div>
      <div className='rounded-md p-4 w-full mx-auto'>
        <div className='flex justify-end '>
          <label className='swap swap-flip text-xl'>
            <input type='checkbox' />
            <div className='swap-on' onClick={handleLike}>
              <Image src='/images/heart.png' alt='heart' width={20} height={20} />
            </div>
            <div className='swap-off' onClick={handleLike}>
              <Image src='/images/heart-empty.png' alt='heart' width={20} height={20} />
            </div>
          </label>
        </div>

        <div className='flex items-center hover:bg-slate-200 py-4 rounded-lg'>
          <div>
            <Avatar width={12} imgUrl={channelProfileUrl} marginX={3} />
          </div>
          <div className='font-bold'>{channelName || '채널명'}</div>
        </div>
        <div className='mx-3 py-5'>{content}</div>
      </div>
    </div>
  );
}
