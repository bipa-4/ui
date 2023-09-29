import CommentInput from '@/components/comment/CommentInput';
import CommentItem from '@/components/comment/CommentItem';
import VideoDetailInfo from '@/components/video/VideoDetailInfo';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import { VideoDetailType } from '@/types/videoType';
import { useState } from 'react';
import VideoSkeleton from './../../components/skeleton/VideoSkeleton';
import VideoPlayer from '@/components/video/VideoPlayer';

interface VideoDetailLayoutProps {
  video: VideoDetailType;
}

export default function VideoDetailLayout({ video }: VideoDetailLayoutProps) {
  const [like, setLike] = useState(false);

  // 서버사이드렌더링 이후 ReactPlayer의 하이드레이션 에러 방지를 위함

  const handleLike = () => {
    setLike(!like);
  };

  const args = {
    styles: {
      width: '100%',
      aspectRatio: '16 / 9',
    },
    videoOptions: {
      controls: true,
      autoplay: true,
    },
  };

  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='m-3/5 relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          <div className='absolute top-0 left-0 right-0 bottom-0 max-w-full border rounded-md h-auto w-full text-center'>
            {video ? (
              <VideoPlayer sources={video.videoUrl} styles={args.styles} videoOptions={args.videoOptions}></VideoPlayer>
            ) : (
              <VideoSkeleton />
            )}
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
            <CommentItem />
          </div>
        </div>
      </div>
      <div className='basis-1/4 max-2xl:hidden my-4 shrink-0'>
        {video.recommendedList?.map((v) => <VideoSummaryItemRow key={v.videoId} videoSummaryItem={v} />)}
      </div>
    </div>
  );
}
