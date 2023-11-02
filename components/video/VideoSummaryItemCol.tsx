import Image from 'next/image';
import { VideoCardType } from '@/types/videoType';
import { useRouter } from 'next/router';
import { PiEyeLight } from 'react-icons/pi';
import defaultImg from '@/public/images/defaultThumbnailImage.png';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslation } from 'next-i18next';
import Avatar from '../ui/Avatar';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';

function VideoSummaryItemCol({
  videoId,
  thumbnail,
  videoTitle,
  channelProfileUrl,
  channelName,
  readCount,
  createAt,
  privateType,
  channelId,
}: VideoCardType) {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  dayjs.extend(relativeTime);
  dayjs.locale(i18n.language);

  const handleItemClick = () => {
    if (!videoId) return;
    router.push(`/video/watch/${videoId}`);
  };

  const handleChannelClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!channelId) return;
    console.log(channelId);
    e.stopPropagation();
    router.push(`/channel/${channelId}`);
  };

  return (
    <div
      className={`card card-compact bg-base-100 shadow-md overflow-hidden ${
        videoId ? 'hover:bg-base-300 cursor-pointer' : 'hover:none'
      }`}
      onClick={handleItemClick}
    >
      <div className='relative overflow-hidden ' style={{ paddingBottom: '56.25%' }}>
        <Image
          className='absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover'
          src={thumbnail || defaultImg}
          alt={videoTitle || 'thumbnail'}
          quality={75}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1536px) 33vw, 20vw'
          priority
        />
      </div>

      <div className='card-body w-full gap-1.5 '>
        {videoTitle ? (
          <p className='font-bold mx-1 w-full line-clamp-2'>{videoTitle}</p>
        ) : (
          <p className='font-bold mx-1 text-gray-400 italic'>제목을 입력하세요.</p>
        )}
        <div className='flex items-center hover:font-bold' onClick={handleChannelClick}>
          <Avatar width={6} marginX={1} imgUrl={channelProfileUrl} />
          <div className=' whitespace-pre-line w-4/5 px-1 line-clamp-1'>{channelName}</div>
        </div>
        <div className='mx-2 text-xs flex items-center justify-between'>
          <div className='flex items-center justify-center'>
            <PiEyeLight className='w-4 h-4' />
            <span className='px-2 border-solid border-neutral-content' style={{ 'borderRightWidth': '1px' }}>
              {readCount}
            </span>
            <span className='px-2'>{dayjs(createAt).fromNow()}</span>
          </div>
          <div className='flex items-center justify-center'>
            {privateType && <div className='badge badge-accent'>{t('private')}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(VideoSummaryItemCol);
