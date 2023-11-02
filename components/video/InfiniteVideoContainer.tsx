import { VideoCardType } from '@/types/videoType';
import InfiniteScroll from 'react-infinite-scroll-component';
import Title from '../ui/Title';
import VideoSummaryItemCol from './VideoSummaryItemCol';
import LoadingSpinner from '../ui/LoadingSpinner';

type VideoListType = {
  title?: string;
  videoList: Array<VideoCardType>;
  dataFetcher: () => void;
  hasMore: boolean;
};

export default function InfiniteVideoContainer({ title, videoList, dataFetcher, hasMore }: VideoListType) {
  return (
    <div className='mb-40'>
      {title && (
        <div className='p-5'>
          <Title text={`${title}`} />
        </div>
      )}
      <InfiniteScroll
        dataLength={videoList.length}
        next={dataFetcher}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage=''
        className='m-3 py-5 px-2 grid grid-cols-5 gap-3 max-2xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-xl:mx-auto'
      >
        {videoList.map((item: VideoCardType) => (
          <VideoSummaryItemCol
            key={item.videoId}
            videoId={item.videoId}
            thumbnail={item.thumbnail}
            videoTitle={item.videoTitle}
            channelProfileUrl={item.channelProfileUrl}
            channelName={item.channelName}
            readCount={item.readCount}
            createAt={item.createAt}
            privateType={item.privateType}
            channelId={item.channelId}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

InfiniteVideoContainer.defaultProps = {
  title: '',
};
