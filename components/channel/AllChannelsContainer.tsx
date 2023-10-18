import fetcher from '@/utils/axiosFetcher';
import { ChannelSummaryType } from '@/types/channelType';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Title from '../ui/Title';
import ChannelSummaryItem from './ChannelSummarylItem';
import LoadingSpinner from '../ui/LoadingSpinner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function AllChannelsContainer() {
  const [channelList, setChannelList] = useState<ChannelSummaryType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState<string | null>(null);

  const fetchChannels = async (nextUUID: string) => {
    const res = await fetcher(
      `${BASE_URL}/channel/AllChannel?${nextUUID ? 'page=' : ''}${nextUUID}${nextUUID ? '&' : ''}pageSize=${PAGE_SIZE}`,
    );
    console.log('res', res);
    setNextId(res.nextUUID);
    return res;
  };

  const fetchMoreData = async () => {
    if (nextId === '') {
      setHasMore(false);
      return;
    }

    if (nextId) {
      const data = await fetchChannels(nextId);
      console.log('more fetched data', data);

      setNextId(data.nextUUID);
      setChannelList([...channelList, ...data.channelList]);
    }
  };

  useEffect(() => {
    console.log('초기렌더링');
    const fetchInitData = async () => {
      const initData = await fetchChannels('');
      setChannelList(initData.channelList as ChannelSummaryType[]);
    };
    fetchInitData();
  }, []);

  return (
    <>
      <div className='border-0 border-b border-slate-400 p-6 my-2'>
        <Title text='채널 전체' />
      </div>
      <InfiniteScroll
        dataLength={channelList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage=''
        className='flex flex-wrap w-full'
      >
        {channelList.map((channel) => (
          <ChannelSummaryItem key={channel.channelId} channelItem={channel} size='large' />
        ))}
      </InfiniteScroll>
    </>
  );
}
