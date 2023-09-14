import VideoContainer from '@/components/Video/VideoContainer';
import ChannelContainer from '@/components/channel/ChannelContainer';
import videolist from '@/public/staticData/videoList.json';
import { Channel } from 'diagnostics_channel';

// todo: 데이터 fetch

export default function MainLayout() {
  return (
    <div className='flex max-lg:w-full max-lg:justify-center'>
      <div className='w-3/4 max-lg:m-5'>
        <VideoContainer title='조회수 급상승' videoList={videolist} />
      </div>
      <div className='w=1/4'>
        <ChannelContainer />
      </div>
    </div>
  );
}
