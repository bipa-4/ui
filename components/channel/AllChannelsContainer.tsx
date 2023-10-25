import fetcher from '@/utils/axiosFetcher';
import { ChannelSummaryType } from '@/types/channelType';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Title from '../ui/Title';
import ChannelSummaryItem from './ChannelSummarylItem';
import LoadingSpinner from '../ui/LoadingSpinner';
import SearchInput from '../ui/SearchInput';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function AllChannelsContainer() {
  const [channels, setChannels] = useState<ChannelSummaryType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState<string | null>(null);
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const keyword = router.query?.keyword;
  const { t } = useTranslation('common');

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
    setSearchKeyword(keyword as string);
    fetchInitData();
  }, []);

  useEffect(() => {
    if (searchKeyword) {
      fetchInitData();
    }
  }, [searchKeyword]);

  useEffect(() => {
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
          <Title text={t('allChannels')} />
        </div>
        <SearchInput path='channels' setKeyword={setSearchKeyword} searchItem={t('searchChannelPlaceHolder')} />
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
