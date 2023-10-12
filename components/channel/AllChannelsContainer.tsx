import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';
import { ChannelSummaryType } from '@/types/channelType';
import Title from '../ui/Title';
import ChannelSummaryItem from './ChannelSummarylItem';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AllChannelsContainer() {
  const { data } = useSWR<ChannelSummaryType[]>(`${BASE_URL}/channel/AllChannel?pageSize=10`, fetcher);

  console.log('채널:', data);

  return (
    <>
      <div className='border-0 border-b border-slate-400 p-6 my-2'>
        <Title text='채널 전체' />
      </div>
      <div className='flex flex-wrap w-full'>
        {data?.map((channel) => <ChannelSummaryItem key={channel.channelId} channelItem={channel} size='large' />)}
      </div>
    </>
  );
}
