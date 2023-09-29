import CommentInput from '@/components/comment/CommentInput';
import CommentItem from '@/components/comment/CommentItem';
import VideoDetailInfo from '@/components/video/VideoDetailInfo';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import { VideoCardType } from '@/types/videoType';
import { useState } from 'react';
import VideoPlayer from '@/components/video/VideoPlayer';
import useVideoData from '@/hooks/useVideoData';
import { useRouter } from 'next/router';

// interface VideoDetailLayoutProps {
//  video: VideoDetailType;
// }

export default function VideoDetailLayout() {
  const router = useRouter();
  const { vid } = router.query;
  const { data } = useVideoData(vid?.toString());

  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

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

  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='m-3/5 relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          <div className='absolute top-0 left-0 right-0 bottom-0 max-w-full border rounded-md h-auto w-full text-center'>
            <VideoPlayer sources={data.videoUrl} styles={videoArgs.styles} videoOptions={videoArgs.videoOptions} />
          </div>
        </div>

        <VideoDetailInfo handleLike={handleLike} />

        <div className='w-full mx-1 my-5 max-2xl:w-full'>
          <CommentInput />
          <div className='w-full'>
            <CommentItem />
          </div>
        </div>
      </div>
      <div className='basis-1/4 max-2xl:hidden my-4 shrink-0'>
        {data.recommendedList?.map((v: VideoCardType) => <VideoSummaryItemRow key={v.videoId} videoSummaryItem={v} />)}
      </div>
    </div>
  );
}
