import VideoDetailInfoSkeleton from '@/components/skeleton/VideoDetailInfoSkeleton';
import VideoSkeleton from '@/components/skeleton/VideoSkeleton';
import VideoDetailLayout from '@/containers/watch/VideoDetailLayout';

export default function VideoDetail() {
  const isLoading = true;
  return (
    <VideoDetailLayout>
      {isLoading
        ? {
            video: <VideoSkeleton />,
            videoInfo: <VideoDetailInfoSkeleton />,
          }
        : {
            video: <div>비디오</div>,
            videoInfo: <div>비디오 정보</div>,
          }}
    </VideoDetailLayout>
  );
}
