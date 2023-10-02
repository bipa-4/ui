import { VideoCardType } from '@/types/videoType';
import InfiniteScroll from 'react-infinite-scroll-component';
import Title from '../ui/Title';
import VideoSummaryItemCol from './VideoSummaryItemCol';

type VideoListType = {
  title: string;
  videoList: Array<VideoCardType>;
  dataFetcher: () => void;
  hasMore: boolean;
};

export default function InfiniteVideoContainer({ title, videoList, dataFetcher, hasMore }: VideoListType) {
  return (
    <div>
      <div className='m-5'>{title && <Title text={`${title}`} />}</div>
      {videoList && (
        <InfiniteScroll
          dataLength={videoList.length}
          next={dataFetcher}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage=''
          className='m-3 py-5 grid grid-cols-5 gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1'
        >
          {videoList &&
            videoList.map((item, index) => (
              <VideoSummaryItemCol
                key={index}
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
