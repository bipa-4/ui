import Image from 'next/image';
import { VideoCardType } from '@/types/videoType';
import defaultImg from '@/public/images/defaultThumbnailImage.png';
import { useRouter } from 'next/router';
import React from 'react';

interface VideoSummaryItemRowProps {
  videoSummaryItem: VideoCardType;
}

function VideoSummaryItemRow({ videoSummaryItem }: VideoSummaryItemRowProps) {
  const router = useRouter();
  const { videoId, videoTitle, channelName, thumbnail, readCount, createAt } = videoSummaryItem;

  const handleItemClick = () => {
    router.push(`/watch/${videoId}`);
  };

  return (
    <div className='rounded-md p-1 w-full ml-2 flex cursor-pointer hover:bg-slate-200 mb-2' onClick={handleItemClick}>
      <div className='w-1/2 mr-3 flex-shrink-0'>
        <div className='rounded-md overflow-hidden' style={{ paddingBottom: '56.25%', position: 'relative' }}>
          <Image
            src={thumbnail || defaultImg}
            alt='썸네일'
            layout='fill'
            objectFit='cover'
            className='absolute top-0 left-0'
          />
        </div>
      </div>
      <div className='flex-grow'>
        <div className='font-bold pb-1 line-clamp-2'>{videoTitle}</div>
        <div className='text-sm pb-1'>{channelName}</div>
        <div className='flex'>
          <div className='mr-2 font-light text-xs'>
            <div>조회수 {readCount}회</div>
            <div>{createAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(VideoSummaryItemRow);
