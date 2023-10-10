import { VideoCardType } from '@/types/videoType';
import InfiniteScroll from 'react-infinite-scroll-component';
import Title from '../ui/Title';
import VideoSummaryItemCol from './VideoSummaryItemCol';

type VideoListType = {
  title?: string;
  videoList: Array<VideoCardType>;
  dataFetcher: () => void;
  hasMore: boolean;
};

export default function InfiniteVideoContainer({ title, videoList, dataFetcher, hasMore }: VideoListType) {
  return (
    <div>
      {title && (
        <div className='m-5'>
          <Title text={`${title}`} />
        </div>
      )}
      <InfiniteScroll
        dataLength={videoList.length}
        next={dataFetcher}
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
  );
}

InfiniteVideoContainer.defaultProps = {
  title: '',
};
