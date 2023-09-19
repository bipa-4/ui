import VideoContainer from '@/components/video/VideoSummaryContainer';
import ChannelContainer from '@/components/channel/PopularChannelsContainer';
import channelData from '@/public/staticData/channelList';
import videolist from '@/public/staticData/videoList.json';

// todo: 데이터 fetch

export default function MainLayout() {
  return (
    <>
      <div className='flex max-lg:w-full max-lg:justify-center border-b border-solid border-gray-300 py-6'>
        <div className='basis-3/4 width-3/4 grow max-lg:m-5 max-lg:width-full'>
          <VideoContainer title='조회수 급상승' videoList={videolist} />
        </div>
        <div className='basis-1/4 w=1/4 grow max-lg:hidden'>
          <ChannelContainer channelList={channelData} />
        </div>
      </div>
      <div className='py-5'>
        <VideoContainer title='최근 업로드' videoList={videolist} />
      </div>
    </>
  );
}
