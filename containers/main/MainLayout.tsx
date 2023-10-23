import VideoSummaryContainer from '@/components/video/VideoTop10Container';
import ChannelContainer from '@/components/channel/PopularChannelsContainer';
import { VideoCardType } from '@/types/videoType';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import useTop10Data from '../../hooks/useTop10Data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function MainLayout() {
  const { top10Data } = useTop10Data();
  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState<string | null>(null);

  const fetchVideo = async (nextUUID: string) => {
    const res = await axios.get(
      `${BASE_URL}/video/latest?${nextUUID ? 'page=' : ''}${nextUUID}${nextUUID ? '&' : ''}pageSize=${PAGE_SIZE}`,
      {
        withCredentials: true,
      },
    );
    console.log('res.data', res.data);
    setNextId(res.data.nextUUID);
    return res.data;
  };

  const fetchMoreData = async () => {
    if (!nextId) {
      setHasMore(false);
      return;
    }

    if (nextId) {
      const data = await fetchVideo(nextId);
      console.log('more fetched data', data);

      setNextId(data.nextUUID);
      setVideoList([...videoList, ...data.videos]);
    }
  };

  useEffect(() => {
    console.log('초기렌더링');
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
          <VideoSummaryContainer title='조회수 급상승' videoList={top10Data} />
        </div>
        <div className='basis-1/4 w-1/4 grow max-xl:hidden'>
          <ChannelContainer />
        </div>
      </div>
      <div className='py-5'>
        <div>
          <InfiniteVideoContainer
            title='최근업로드'
            videoList={videoList}
            dataFetcher={fetchMoreData}
            hasMore={hasMore}
          />
        </div>
      </div>
    </>
  );
}
