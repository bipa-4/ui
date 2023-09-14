import VideoContainer from '@/components/Video/VideoContainer';
import videolist from '@/public/staticData/videoList.json';

// todo: 데이터 fetch

export default function MainLayout() {
  return (
    <div className='flex'>
      <div className='w-4/5 max-md:w-full'>
        <VideoContainer title='조회수 급상승' videoList={videolist} />
      </div>
    </div>
  );
}
