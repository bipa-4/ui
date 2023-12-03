import useCategoryList from '@/hooks/useCategoryList';
import { VideoCardType } from '@/types/videoType';
import fetcher from '@/utils/axiosFetcher';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import InfiniteVideoContainer from '../video/InfiniteVideoContainer';
import LoadingSpinner from '../ui/LoadingSpinner';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 15;

export default function CategoryVideos() {
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState('');
  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const { categoryList } = useCategoryList();
  const router = useRouter();
  const { catId } = router.query;
  const { data, isLoading } = useSWR(`${BASE_URL}/video/category/${catId}?pageSize=${PAGE_SIZE}`, fetcher);

  useEffect(() => {
    setVideoList(data.videos);
    setNextId(data.nextUUID);
    if (data.nextUUID === null) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [catId]);

  const fetchVideo = async (nextUUID: string) => {
    const videoData = await fetcher(`${BASE_URL}/video/category/${catId}?page=${nextUUID}&pageSize=${PAGE_SIZE}`);
    console.log('videoData', videoData);
    setNextId(videoData.nextUUID);
    return videoData;
  };

  const fetchMoreData = async () => {
    if (nextId === null) {
      setHasMore(false);
      return;
    }
    const moreData = await fetchVideo(nextId);
    setNextId(moreData.nextUUID);
    setVideoList([...videoList, ...moreData.videos]);
  };

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center m-auto'>
        <LoadingSpinner />
      </div>
    );
  }

  console.log('videoList', videoList);

  return (
    <>
      <div className='tabs w-full m-3 mt-8'>
        {categoryList?.map((category) => (
          <div
            className={`tab tab-lg tab-bordered w-36 ${
              category.categoryNameId === catId && 'tab-active'
            } cursor-pointer hover:bg-base-100`}
            onClick={() => router.push(`/category/${category.categoryNameId}`)}
            key={category.categoryNameId}
          >
            {category.categoryName}
          </div>
        ))}
      </div>

      {data.videos.length !== 0 ? (
        <InfiniteVideoContainer videoList={videoList} dataFetcher={fetchMoreData} hasMore={hasMore} />
      ) : (
        <div className='flex items-center m-auto h-36 justify-center'>업로드한 영상이 없습니다.</div>
      )}
    </>
  );
}
