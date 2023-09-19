import AllChannelsContainer from './../components/channel/AllChannelsContainer';
import channelData from '@/public/staticData/channelList';

export default function channels() {
  return (
    <div className='h-screen mx-48 max-lg:mx-auto'>
      <AllChannelsContainer channelList={channelData} />
    </div>
  );
}
