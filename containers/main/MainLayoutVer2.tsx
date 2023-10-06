import VideoSummaryContainer from '@/components/video/VideoTop10Container';
import ChannelContainer from '@/components/channel/PopularChannelsContainer';
import channelDataList from '@/public/staticData/channelData';
import { VideoCardType } from '@/types/videoType';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '@/components/ui/Title';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoSummaryItemCol from '@/components/video/VideoSummaryItemCol';
import useTop10Data from '../../hooks/useTop10Data';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function MainLayout() {
  const { top10Data } = useTop10Data();
  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  console.log(page);

  const fetchVideo = async (currentPage: number) => {
    const res = await axios.get(`${BASE_URL}/video/latest?page=${currentPage}&pageSize=${PAGE_SIZE}`, {
      withCredentials: true,
    });
    console.log('res.data', res.data);
    return res.data;
  };

  useEffect(() => {
    console.log('초기렌더링');
    const fetchInitData = async () => {
      const initData = await fetchVideo(1);
      setVideoList(initData as VideoCardType[]);
    };
    fetchInitData();
  }, []);

  const fetchMoreData = async () => {
    console.log('fetchMoreData 호출');

    // console.log('page', page);

    const data = await fetchVideo(page + 1);
    console.log('data', data);

    if (!data) {
      return;
    }

    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    setPage((prev) => prev + 1);
    setVideoList([...videoList, ...data]);
  };

  console.log('videoList', videoList);

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
        <div>
          <div className='m-5'>
            <Title text='최근업로드' />
          </div>
          <InfiniteScroll
            dataLength={videoList.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage='데이터가 없습니다'
            className='m-3 py-5 px-2 grid grid-cols-5 gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'
          >
            {videoList.map((item) => (
              <VideoSummaryItemCol
                key={item.videoId}
                videoId={item.videoId}
                thumbnail={item.thumbnail}
                videoTitle={item.videoTitle}
                channelProfileUrl={item.channelProfileUrl}
                channelName={item.channelName}
                readCount={item.readCount}
                createAt={item.createAt}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}