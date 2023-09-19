import channelData from '@/public/staticData/channelList';
import AllChannelsContainer from "../components/channel/AllChannelsContainer";

export default function channels() {
  return (
    <div className='h-screen mx-48 max-lg:mx-auto'>
      <AllChannelsContainer channelList={channelData} />
    </div>
  );
}
