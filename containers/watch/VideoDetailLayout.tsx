import CommentInput from '@/components/comment/CommentInput';
import CommentItem from '@/components/comment/CommentItem';
import VideoDetailInfo from '@/components/video/VideoDetailInfo';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import { VideoCardType, VideoDetailType } from '@/types/videoType';
import VideoPlayer from '@/components/video/VideoPlayer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Title from '@/components/ui/Title';
import { useState } from 'react';
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
  // console.log(like);

  if (!video) {
    return <LoadingSpinner />;
  }

  if (updateOpen) {
    return <UploadLayout />;
  }

  const handleUpdatePage = () => {
    setUpdateOpen(true);
  };

  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='m-3/5 relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          <div className='absolute top-0 left-0 right-0 bottom-0 max-w-full border rounded-md h-auto w-full text-center'>
            <VideoPlayer sources={video.videoUrl} styles={videoArgs.styles} videoOptions={videoArgs.videoOptions} />
          </div>
        </div>

        <VideoDetailInfo video={video} handleUpdatePage={handleUpdatePage} />

        <div className='w-full mx-1 my-5 max-2xl:w-full'>
          <div className='mx-1 pb-3 border-b-2'>
            <Title text='댓글' />
          </div>
          <CommentInput />
          <div className='w-full'>
            <CommentItem />
          </div>
        </div>
      </div>
      <div className='basis-1/4 max-2xl:hidden my-4 shrink-0 mx-2'>
        {video.recommendedList?.map((v: VideoCardType) => <VideoSummaryItemRow key={v.videoId} videoSummaryItem={v} />)}
      </div>
    </div>
  );
}
