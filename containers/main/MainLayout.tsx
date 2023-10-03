import VideoSummaryContainer from '@/components/video/VideoTop10Container';
import ChannelContainer from '@/components/channel/PopularChannelsContainer';
import channelDataList from '@/public/staticData/channelData';
import useMainData from '@/hooks/useMainData';
import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import { VideoCardType } from '@/types/videoType';
import { useState } from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function MainLayout() {
  const { top10Data } = useMainData();

  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data } = useSWR(`${BASE_URL}/read/video/latest?page=1&pageSize=${PAGE_SIZE}`, fetcher);
  if (data && videoList.length === 0) {
    setVideoList(data);
  }

  const fetchMoreData = () => {
    // todo : api호출
    setPage((prev) => prev + 1);
    console.log(page)
    // const { data } = useSWR(`${BASE_URL}/read/video/latest?page=${page}&pageSize=${PAGE_SIZE}`, fetcher);
    const moreData: VideoCardType[] = [];
    for (let i = 1; i <= 20; i++) {
      moreData.push({
        videoId: videoList.length + i,
        thumbnail: '/images/streamWave.png',
        videoTitle: `test${videoList.length + i}`,
        channelProfileUrl: '/images/streamWave.png',
        channelName: 'test',
        readCnt: 100,
        createAt: '2021-08-01',
      });
    }
    setVideoList([...videoList, ...moreData]);

    if (videoList.length + data.length >= 100) {
      setHasMore(false);
    }
  };

  return (
    <>
      <div className='flex max-xl:w-full max-lg:justify-center border-b border-solid border-gray-300 py-6'>
        <div className='basis-3/4 w-3/4 grow max-xl:m-0 max-xl:w-full'>
          <VideoSummaryContainer title='조회수 급상승' videoList={top10Data} />
        </div>
        <div className='basis-1/4 w-1/4 grow max-xl:hidden'>
          <ChannelContainer channelList={channelDataList} />
        </div>
      </div>
      <div className='py-5'>
        <InfiniteVideoContainer
          title='최근 업로드'
          videoList={videoList}
          dataFetcher={fetchMoreData}
          hasMore={hasMore}
        />
      </div>
    </>
  );
}
