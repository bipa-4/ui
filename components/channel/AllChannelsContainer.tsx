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
  const [channels, setChannels] = useState<ChannelSummaryType[]>();
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState<string | null>('');
  const router = useRouter();
  const { t } = useTranslation('common');

  const [searchKeyword, setSearchKeyword] = useState<string>();
  const searchQuery = router.query?.keyword;

  const fetchChannels = async (nextUUID: string) => {
    const res = await fetcher(
      `${BASE_URL}/channel/AllChannel?${nextUUID ? 'page=' : ''}${nextUUID}${nextUUID ? '&' : ''}pageSize=${PAGE_SIZE}`,
    );
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
    if (nextId === '') {
      return;
    }

    if (channels && !nextId) {
      setHasMore(false);
      return;
    }

    if (nextId) {
      const data = searchKeyword ? await fetchSearchChannels(nextId) : await fetchChannels(nextId);
      setNextId(searchKeyword ? data.page : data.nextUUID);
      setChannels((prevChannels) => {
        if (prevChannels) {
          return [...prevChannels, ...data.channelList];
        }
        return data.channelList;
      });
    }
  };

  const fetchInitData = async () => {
    const initData = searchKeyword ? await fetchSearchChannels('') : await fetchChannels('');
    setChannels(initData.channelList as ChannelSummaryType[]);
  };

  useEffect(() => {
    setHasMore(true);
    setSearchKeyword(searchQuery as string);
  }, [searchQuery]);

  useEffect(() => {
    setHasMore(true);
    fetchInitData();
  }, [searchKeyword]);

  if (channels === undefined) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className='flex justify-between items-center border-0 border-b border-slate-400 p-6 my-2 pb-3 max-xl:px-3'>
        <div onClick={() => router.push('/channels')} className='cursor-pointer basis-1/2 w-1/2'>
          <Title text={t('allChannels')} />
        </div>
        <SearchInput path='channels' setKeyword={setSearchKeyword} searchItem={t('searchChannelPlaceHolder')} />
      </div>
      {channels.length === 0 ? (
        <div className='text-center text-xl my-20'> 😢 검색결과가 없습니다.</div>
      ) : (
        <InfiniteScroll
          dataLength={channels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
          endMessage=''
          className='flex flex-wrap w-full mb-36'
        >
          {channels?.map((channel) => (
            <ChannelSummaryItem key={channel.channelId} channelItem={channel} size='large' />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}
