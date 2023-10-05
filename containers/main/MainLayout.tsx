import VideoSummaryContainer from '@/components/video/VideoTop10Container';
import ChannelContainer from '@/components/channel/PopularChannelsContainer';
import channelDataList from '@/public/staticData/channelData';
import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import { VideoCardType } from '@/types/videoType';
import { useState, useEffect } from 'react';
import useTop10Data from './../../hooks/useTop10Data';
import useMainData from '@/hooks/useMainData';

const PAGE_SIZE = 10;

export default function MainLayout() {
  const { top10Data } = useTop10Data();

  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { currentVideos } = useMainData(page, PAGE_SIZE);

  if (currentVideos && videoList.length === 0) {
    setVideoList(currentVideos);
  }

  useEffect(() => {
    if (!currentVideos) {
      return;
    }
    setVideoList([...videoList, ...currentVideos]);
  }, [currentVideos]);

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
    console.log(page);
    if (currentVideos?.length < PAGE_SIZE) {
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
