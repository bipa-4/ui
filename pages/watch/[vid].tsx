import RowVideoInfoSkeleton from '@/components/skeleton/VideoInfoSkeletonRow';
import VideoDetailInfoSkeleton from '@/components/skeleton/VideoDetailInfoSkeleton';
import VideoSkeleton from '@/components/skeleton/VideoSkeleton';
import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';
import CommentInput from '@/components/comment/CommentInput';
import videolist from '@/public/staticData/videoList.json';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import CommentItem from '../../components/comment/CommentItem';

export default function VideoDetail() {
  const isLoading = false;

  return (
    <div className='h-full mx-40 max-xl:mx-5'>
      <VideoDetailLayout>
        {isLoading
          ? {
              video: <VideoSkeleton />,
              videoInfo: <VideoDetailInfoSkeleton />,
              recommendVideo: Array(8).fill(<RowVideoInfoSkeleton />),
            }
          : {
              video: (
                <div className='absolute top-0 left-0 right-0 bottom-0 max-w-full border rounded-md h-auto w-full text-center'>
                  비디오
                </div>
              ),
              comment: (
                <div className='w-full mx-1 my-5 max-2xl:w-full'>
                  <CommentInput />
                  <div className='w-full'>{Array(8).fill(<CommentItem />)}</div>
                </div>
              ),
              videoInfo: <div className='rounded-md p-4 w-full mx-auto my-4 border'>비디오 정보</div>,
              recommendVideo: videolist.map((video) => (
                <VideoSummaryItemRow
                  key={video.id}
                  id={video.id}
                  thumbnailUrl={video.thumbnailUrl}
                  title={video.title}
                  channelName={video.channelName}
                  channelImg={video.channelImg}
                />
              )),
            }}
      </VideoDetailLayout>
    </div>
  );
}
