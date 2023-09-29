import VideoContainer from '@/components/video/VideoSummaryContainer';
import ChannelContainer from '@/components/channel/PopularChannelsContainer';
import channelDataList from '@/public/staticData/channelData';
import useMainData from '@/hooks/useMainData';

export default function MainLayout() {
  const { data } = useMainData();
  console.log(data);

  return (
    <>
      <div className='flex max-xl:w-full max-lg:justify-center border-b border-solid border-gray-300 py-6'>
        <div className='basis-3/4 w-3/4 grow max-xl:m-0 max-xl:w-full'>
          <VideoContainer title='조회수 급상승' videoList={data} />
        </div>
        <div className='basis-1/4 w-1/4 grow max-xl:hidden'>
          <ChannelContainer channelList={channelDataList} />
        </div>
      </div>
      <div className='py-5'>
        <VideoContainer title='최근 업로드' videoList={data} />
      </div>
    </>
  );
}
