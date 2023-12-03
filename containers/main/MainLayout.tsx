import VideoSummaryContainer from '@/components/video/VideoTop10Container';
import ChannelContainer from '@/components/channel/PopularChannelsContainer';
import { VideoCardType } from '@/types/videoType';
import { useState, useEffect } from 'react';
import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import { useTranslation } from 'next-i18next';
import useTop10Data from '../../hooks/useTop10Data';
import fetcher from '@/utils/axiosFetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 15;

export default function MainLayout() {
  const { top10Data, isTop10Loading } = useTop10Data();
  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState<string | null>('');
  const { t } = useTranslation('common');

  const fetchVideo = async (nextUUID: string) => {
    const res = await fetcher(
      `${BASE_URL}/video/latest?${nextUUID ? 'page=' : ''}${nextUUID}${nextUUID ? '&' : ''}pageSize=${PAGE_SIZE}`,
    );
    setNextId(res.data.nextUUID);
    return res.data;
  };

  const fetchMoreData = async () => {
    if (nextId === '') {
      return;
    }

    if (videoList && !nextId) {
      setHasMore(false);
      return;
    }

    if (nextId) {
      const data = await fetchVideo(nextId);

      setNextId(data.nextUUID);
      setVideoList([...videoList, ...data.videos]);
    }
  };

  useEffect(() => {
    const fetchInitData = async () => {
      const initData = await fetchVideo('');
      setVideoList(initData.videos as VideoCardType[]);
    };
    fetchInitData();
  }, []);

  return (
    <>
      <div className='flex max-xl:w-full max-lg:justify-center border-b border-solid border-gray-300 py-6'>
        <div className='basis-3/4 w-3/4 grow max-xl:m-0 max-xl:w-full'>
          <VideoSummaryContainer title={t('popularVideo')} videoList={top10Data} isLoading={isTop10Loading} />
        </div>
        <div className='basis-1/4 w-1/4 grow max-2xl:hidden'>
          <ChannelContainer />
        </div>
      </div>
      <div className='py-5'>
        <div>
          <InfiniteVideoContainer
            title={t('recentVideos')}
            videoList={videoList}
            dataFetcher={fetchMoreData}
            hasMore={hasMore}
          />
        </div>
      </div>
    </>
  );
}
