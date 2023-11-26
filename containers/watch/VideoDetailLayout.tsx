import VideoDetailInfo from '@/components/video/VideoDetailInfo';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import { VideoCardType, VideoDetailType } from '@/types/videoType';
import VideoPlayer from '@/components/video/VideoPlayer';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useEffect, useState } from 'react';
import Comments from '@/components/comment/Comments';
import fetcher from '@/utils/axiosFetcher';
import axios from 'axios';
import UploadLayout from '../upload/UploadLayout';
import { useCustomWarningToast } from '@/components/ui/CustomToast';

interface VideoDetailLayoutProps {
  video: VideoDetailType;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
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

export default function VideoDetailLayout({ video }: VideoDetailLayoutProps) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [isMyVideo, setIsMyVideo] = useState<boolean>(false);

  const checkMyVideo = async () => {
    try {
      const checkResult = await fetcher(`${BASE_URL}/video/check?videoId=${video.videoId}`);
      setIsMyVideo(checkResult);
    } catch (err) {
      useCustomWarningToast(`권한 체크 에러: ${err} 관리자에게 문의하세요.`);
    }
  };

  const updateRecommendList = async () => {
    await axios.put(`${BASE_URL}/video/updateRecommend/${video.videoId}`, {}, { withCredentials: true });
  };

  useEffect(() => {
    checkMyVideo();
    updateRecommendList();
  }, [video]);

  // console.log('video', video);
  // console.log('video.privateType', video.privateType);
  // console.log('isMyVideo', isMyVideo);

  if (video.privateType && !isMyVideo) {
    return (
      <div className='min-h-screen flex justify-center items-center m-auto bg-base-100'>
        <h1 className='text-2xl font-bold tracking-tight '>🔒 비공개 영상입니다.</h1>
      </div>
    );
  }

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
        <VideoDetailInfo video={video} handleUpdatePage={handleUpdatePage} isMyVideo={isMyVideo} />
        <Comments video={video} />
      </div>
      <div className='basis-96 w-96 max-2xl:hidden my-4 shrink-0 mx-3'>
        {video.recommendedList?.map((v: VideoCardType) => <VideoSummaryItemRow key={v.videoId} videoSummaryItem={v} />)}
      </div>
    </div>
  );
}
