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
  readCount,
  createAt,
}: VideoCardType) {
  const router = useRouter();

  const handleItemClick = () => {
    if (!videoId) return;
    router.push(`/video/watch/${videoId}`);
  };

  return (
    <div
      className={`card card-compact bg-base-100 shadow-md overflow-hidden ${
        videoId ? 'hover:bg-base-300 cursor-pointer' : 'hover:none'
      }`}
      onClick={handleItemClick}
    >
      <div className='relative overflow-hidden' style={{ paddingBottom: '56.25%' }}>
        <Image
          className='absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover'
          src={thumbnail || defaultImg}
          alt='thumbnail'
          width={500}
          height={300}
          priority
        />
      </div>

      <div className='card-body w-full gap-1.5 '>
        {videoTitle ? (
          <p className='font-bold mx-1 w-full line-clamp-2'>{videoTitle}</p>
        ) : (
          <p className='font-bold mx-1 text-gray-400 italic'>제목을 입력하세요.</p>
        )}
        <div className='flex items-center'>
          <Avatar width={6} marginX={1} imgUrl={channelProfileUrl} />
          <div className=' whitespace-pre-line w-4/5 px-1 line-clamp-1'>{channelName}</div>
        </div>
        <div className='mx-2 text-xs flex items-center justify-start'>
          <PiEyeLight className='w-4 h-4' />
          <span className='px-2 border-r-2 border-solid'>{readCount}</span>
          <span className='px-2'>{createAt}</span>
          {/* <span className='font-extrabold'>videoId : {videoId}</span> */}
        </div>
      </div>
    </div>
  );
}

export default React.memo(VideoSummaryItemCol);
