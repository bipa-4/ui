import fetcher from '@/utils/axiosFetcher';
import { ChannelSummaryType } from '@/types/channelType';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Title from '../ui/Title';
import ChannelSummaryItem from './ChannelSummarylItem';
import LoadingSpinner from '../ui/LoadingSpinner';
import SearchInput from '../ui/SearchInput';
import { useRouter } from 'next/router';
import search from './../../pages/search';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function AllChannelsContainer() {
  const [channels, setChannels] = useState<ChannelSummaryType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState<string | null>(null);
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const keyword = router.query?.keyword;
  console.log('keyword', keyword);
  console.log('searchKeyword', searchKeyword);

  const fetchChannels = async (nextUUID: string) => {
    const res = await fetcher(
      `${BASE_URL}/channel/AllChannel?${nextUUID ? 'page=' : ''}${nextUUID}${nextUUID ? '&' : ''}pageSize=${PAGE_SIZE}`,
    );
    console.log('res', res);
    setNextId(res.nextUUID);
    return res;
  };

  const fetchSearchChannels = async (nextUUID: string) => {
    const res = await fetcher(
      `${BASE_URL}/channel/search?${nextUUID ? 'page=' : ''}${nextUUID}${
        nextUUID ? '&' : ''
      }page_size=${PAGE_SIZE}&search_query=${searchKeyword}`,
    );
    setNextId(res.page);
    return res;
  };

  const fetchMoreData = async () => {
    if (!nextId) {
      setHasMore(false);
      return;
    }

    if (nextId) {
      const data = searchKeyword ? await fetchSearchChannels(nextId) : await fetchChannels(nextId);
      console.log('more fetched data', data);
      setNextId(searchKeyword ? data.page : data.nextUUID);
      setChannels([...channels, ...data.channelList]);
    }
  };

  const fetchInitData = async () => {
    const initData = searchKeyword ? await fetchSearchChannels('') : await fetchChannels('');
    setChannels(initData.channelList as ChannelSummaryType[]);
  };

  useEffect(() => {
    console.log('초기렌더링');
    console.log(keyword);
    setSearchKeyword(keyword as string);
    fetchInitData();
  }, []);

  useEffect(() => {
    console.log('검색어 변경');
    if (searchKeyword) {
      fetchInitData();
    }
  }, [searchKeyword]);

  useEffect(() => {
    console.log('키워드 변경');
    if (keyword) {
      setSearchKeyword(keyword as string);
    }
  }, [keyword]);

  if (!channels) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className='flex justify-between items-center border-0 border-b border-slate-400 p-6 my-2 pb-3'>
        <div onClick={() => router.push('/channels')} className='cursor-pointer'>
          <Title text='채널 전체' />
        </div>
        <SearchInput path='channels' setKeyword={setSearchKeyword} />
      </div>
      <InfiniteScroll
        dataLength={channels.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage=''
        className='flex flex-wrap w-full mb-36'
      >
        {channels.map((channel) => (
          <ChannelSummaryItem key={channel.channelId} channelItem={channel} size='large' />
        ))}
      </InfiniteScroll>
    </>
  );
}
