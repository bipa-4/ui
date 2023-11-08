import VideoDetailInfo from '@/components/video/VideoDetailInfo';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import { VideoCardType, VideoDetailType } from '@/types/videoType';
import VideoPlayer from '@/components/video/VideoPlayer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useEffect, useState } from 'react';
import Comments from '@/components/comment/Comments';
import axios from 'axios';
import UploadLayout from '../upload/UploadLayout';

interface VideoDetailLayoutProps {
  video: VideoDetailType;
}

export default function VideoDetailLayout({ video }: VideoDetailLayoutProps) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const videoArgs = {
    styles: {
      width: '100%',
      aspectRatio: '16 / 9',
    },
    videoOptions: {
      controls: true,
      autoplay: true,
    },
  };

  const handleUpdatePage = () => {
    setUpdateOpen(true);
  };

  if (!video) {
    return <LoadingSpinner />;
  }

  if (updateOpen) {
    return <UploadLayout />;
  }

  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='m-3/5 relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          <div className='absolute top-0 left-0 right-0 bottom-0 max-w-full rounded-md h-auto w-full text-center'>
            <VideoPlayer sources={video.videoUrl} styles={videoArgs.styles} videoOptions={videoArgs.videoOptions} />
          </div>
        </div>
        <VideoDetailInfo video={video} handleUpdatePage={handleUpdatePage} />
        <Comments video={video} />
      </div>
      <div className='basis-96 w-96 max-2xl:hidden my-4 shrink-0 mx-3'>
        {video.recommendedList?.map((v: VideoCardType) => <VideoSummaryItemRow key={v.videoId} videoSummaryItem={v} />)}
      </div>
    </div>
  );
}
