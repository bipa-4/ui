import VideoContainer from '@/components/Video/VideoContainer';
import ChannelContainer from '@/components/channel/ChannelContainer';
import channelData from '@/public/staticData/channelList';
import videolist from '@/public/staticData/videoList.json';

// todo: 데이터 fetch

export default function MainLayout() {
  return (
    <div className='flex max-lg:w-full max-lg:justify-center items-start'>
      <div className='basis-3/4 grow max-lg:m-5'>
        <VideoContainer title='조회수 급상승' videoList={videolist} />
      </div>
      <div className='basis-1/4 w=1/4 grow'>
        <ChannelContainer channelList={channelData} />
      </div>
    </div>
  );
}
