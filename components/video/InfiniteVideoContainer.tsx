import { useState } from 'react';
import Title from '../ui/Title';
import VideoSummaryItemCol from './VideoSummaryItemCol';
import { VideoCardType } from '@/types/videoType';
import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';
import InfiniteScroll from 'react-infinite-scroll-component';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function InfiniteVideoContainer() {
  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data } = useSWR(`${BASE_URL}/read/video/latest?page=1&pageSize=${PAGE_SIZE}`, fetcher);
  if (data && videoList.length === 0) {
    setVideoList(data);
  }

  const fetchMoreData = () => {
    setPage((prev) => prev + 1);
    //const { data } = useSWR(`${BASE_URL}/read/video/latest?page=${page}&pageSize=${PAGE_SIZE}`, fetcher);
    let data: VideoCardType[] = [];
    for (let i = 1; i <= 20; i++) {
      data.push({
        videoId: videoList.length + i,
        thumbnail: '/images/streamWave.png',
        videoTitle: `test${videoList.length + i}`,
        channelProfileUrl: '/images/streamWave.png',
        channelName: 'test',
        readCnt: 100,
        createAt: '2021-08-01',
      });
    }
    setVideoList([...videoList, ...data]);

    if (videoList.length + data.length >= 100) {
      setHasMore(false);
    }
  };

  console.log('videoList : ', videoList.length);
  console.log('hasMore : ', hasMore);

  return (
    <div>
      {/*<div className='m-5'>{title && <Title text={`${title}`} />}</div>*/}
      {videoList && (
        <InfiniteScroll
          dataLength={videoList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={''}
          className='m-3 py-5 grid grid-cols-5 gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'
        >
          {videoList &&
            videoList.map((item) => (
              <VideoSummaryItemCol
                key={item.videoId}
                videoId={item.videoId}
                thumbnail={item.thumbnail}
                videoTitle={item.videoTitle}
                channelProfileUrl={item.channelProfileUrl}
                channelName={item.channelName}
                readCnt={item.readCnt}
                createAt={item.createAt}
              />
            ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
