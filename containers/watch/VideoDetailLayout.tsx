import CommentInput from '@/components/comment/CommentInput';
import CommentItem from '@/components/comment/CommentItem';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import { VideoDetailType } from '@/types/videoType';

interface VideoDetailLayoutProps {
  video: VideoDetailType;
}

export default function VideoDetailLayout({ video }: VideoDetailLayoutProps) {
  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='m-3/5 relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          <div className='absolute top-0 left-0 right-0 bottom-0 max-w-full border rounded-md h-auto w-full text-center'>
            비디오
          </div>
        </div>
        <div className='rounded-md p-4 w-full mx-auto my-4 border'>비디오 정보</div>
        <div className='w-full mx-1 my-5 max-2xl:w-full'>
          <CommentInput />
          <div className='w-full'>{Array(8).fill(<CommentItem />)}</div>
        </div>
      </div>
      <div className='basis-1/4 max-2xl:hidden my-4 shrink-0'>
        {video.recommendedVideoList?.map((v) => <VideoSummaryItemRow key={v.id} videoSummaryItem={v} />)}
      </div>
    </div>
  );
}
