import CommentInput from '@/components/comment/CommentInput';
import CommentItem from '@/components/comment/CommentItem';
import VideoDetailInfo from '@/components/video/VideoDetailInfo';
import VideoSummaryItemRow from '@/components/video/VideoSummaryItemRow';
import { VideoCardType, VideoDetailType } from '@/types/videoType';
import { useEffect, useState } from 'react';
import VideoPlayer from '@/components/video/VideoPlayer';
import fetcher from '@/utils/axiosFetcher';
import axios from 'axios';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/components/layouts/Header';
import Title from '@/components/ui/Title';

interface VideoDetailLayoutProps {
  video: VideoDetailType;
}

export default function VideoDetailLayout({ video }: VideoDetailLayoutProps) {
  const [like, setLike] = useState(false);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    if (video.isLike === true) {
      setLike(true);
    } else if (video.isLike === false) {
      setLike(false);
    }
  }, []);

  const handleLike = async () => {
    console.log('유저 정보 : ', user);
    console.log('video: ', video);
    console.log('좋아요? : ', video.isLike);

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (video.isLike === true) {
      setLike(!like);
      const res = await fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/video/detail/${video.videoId}/like`);
      console.log(res);
      return;
    }
    if (video.isLike === false) {
      setLike(!like);
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/video/detail/${video.videoId}/like`);
      console.log(res);
    }
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
  // console.log(like);

  if (!video) {
    return (
      <div className='h-screen flex items-center m-auto'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='m-3/5 relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          <div className='absolute top-0 left-0 right-0 bottom-0 max-w-full border rounded-md h-auto w-full text-center'>
            <VideoPlayer sources={video.videoUrl} styles={videoArgs.styles} videoOptions={videoArgs.videoOptions} />
          </div>
        </div>

        <VideoDetailInfo isLike={like} handleLike={handleLike} video={video} />

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
      <div className='basis-1/4 max-2xl:hidden my-4 shrink-0'>
        {video.recommendedList?.map((v: VideoCardType) => <VideoSummaryItemRow key={v.videoId} videoSummaryItem={v} />)}
      </div>
    </div>
  );
}
