import Image from 'next/image';
import { VideoCardType } from '@/types/videoType';
import defaultImg from '@/public/images/defaultThumbnailImage.png';
import { useRouter } from 'next/router';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import { useTranslation } from 'next-i18next';

interface VideoSummaryItemRowProps {
  videoSummaryItem: VideoCardType;
}

function VideoSummaryItemRow({ videoSummaryItem }: VideoSummaryItemRowProps) {
  const router = useRouter();
  const { videoId, videoTitle, channelName, thumbnail, readCount, createAt, channelId } = videoSummaryItem;
  const { t, i18n } = useTranslation('videoDetail');
  dayjs.extend(relativeTime);
  dayjs.locale(i18n.language);

  const handleItemClick = () => {
    router.push(`/video/watch/${videoId}`);
  };

  const handleChannelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!channelId) return;
    e.stopPropagation();
    router.push(`/channel/${channelId}`);
  };

  return (
    <div className='rounded-md w-full flex cursor-pointer hover:bg-base-200 mb-2 pr-2' onClick={handleItemClick}>
      <div className='w-1/2 mr-3 flex-shrink-0'>
        <div className='relative rounded-md overflow-hidden' style={{ paddingBottom: '56.25%' }}>
          <Image
            src={thumbnail || defaultImg}
            alt={videoTitle || 'thumbnail'}
            quality={75}
            fill
            sizes='10vw'
            className='absolute top-0 left-0 object-cover'
          />
        </div>
      </div>
      <div className='w-1/2 flex flex-col items-start'>
        <div className='font-bold pb-1 line-clamp-2'>{videoTitle}</div>
        <div className='text-sm pb-1 overflow-hidden' onClick={handleChannelClick}>
          <span className='line-clamp-1 hover:font-bold'>{channelName}</span>
        </div>
        <div className='flex'>
          <div className='mr-2 font-light text-xs'>
            <div>
              {t('details.views')} {readCount}
            </div>
            <div>{dayjs(createAt).fromNow()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(VideoSummaryItemRow);
