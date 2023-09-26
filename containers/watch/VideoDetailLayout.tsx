import CommentInput from '@/components/comment/CommentInput';
import CommentItem from '@/components/comment/CommentItem';
import Avatar from '@/components/ui/Avatar';
import VideoDetailInfo from '@/components/video/VideoDetailInfo';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import { VideoDetailType } from '@/types/videoType';
import Image from 'next/image';
import { useState } from 'react';

interface VideoDetailLayoutProps {
  video: VideoDetailType;
}

export default function VideoDetailLayout({ video }: VideoDetailLayoutProps) {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  console.log(like);

  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='m-3/5 relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          <div className='absolute top-0 left-0 right-0 bottom-0 max-w-full border rounded-md h-auto w-full text-center'>
            비디오
          </div>
        </div>

        <VideoDetailInfo
          channelProfileUrl={video.channelProfileUrl}
          channelName={video.channelName}
          content={video.content}
          handleLike={handleLike}
        />

        <div className='w-full mx-1 my-5 max-2xl:w-full'>
          <CommentInput />
          <div className='w-full'>
            {Array(8)
              .fill(null)
              .map((_, index) => (
                <CommentItem key={index} />
              ))}
          </div>
        </div>
      </div>
      <div className='basis-1/4 max-2xl:hidden my-4 shrink-0'>
        {video.recommendedList?.map((v) => <VideoSummaryItemRow key={v.videoId} videoSummaryItem={v} />)}
      </div>
    </div>
  );
}
