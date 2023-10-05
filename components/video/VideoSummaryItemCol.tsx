import Image from 'next/image';
import { VideoCardType } from '@/types/videoType';
import { useRouter } from 'next/router';
import { PiEyeLight } from 'react-icons/pi';
import defaultImg from '@/public/images/defaultThumbnailImage.png';
import React from 'react';
import Avatar from '../ui/Avatar';

function VideoSummaryItemCol({
  videoId,
  thumbnail,
  videoTitle,
  channelProfileUrl,
  channelName,
  readCnt,
  createAt,
}: VideoCardType) {
  const router = useRouter();

  const handleItemClick = () => {
    if (!videoId) return;
    router.push(`/watch/${videoId}`);
  };

  return (
    <div
      className={`card card-compact bg-base-100 shadow-md overflow-hidden ${
        videoId ? 'hover:bg-slate-100 cursor-pointer' : 'hover:none'
      }`}
      onClick={handleItemClick}
    >
      <div className='relative overflow-hidden' style={{ paddingBottom: '56.25%' }}>
        <Image
          className='absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover'
          src={thumbnail || defaultImg}
          alt='cat'
          width={999}
          height={999}
          priority
        />
      </div>

      <div className='card-body w-full gap-1.5'>
        {videoTitle ? (
          <p className='font-bold mx-1 w-full line-clamp-2'>{videoTitle}</p>
        ) : (
          <p className='font-bold mx-1 text-gray-400 italic'>제목을 입력하세요.</p>
        )}

        <Avatar width={6} marginX={1} nickname={channelName} imgUrl={channelProfileUrl} />
        <div className='mx-2 text-xs flex items-center justify-start'>
          <PiEyeLight className='w-4 h-4' />
          <span className='px-2 border-r-2 border-solid'>{readCnt}</span>
          <span className='px-2'>{createAt}</span>
        </div>
      </div>
    </div>
  );
}

export default React.memo(VideoSummaryItemCol);
