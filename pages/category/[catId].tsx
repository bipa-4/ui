import Title from '@/components/ui/Title';
import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import { CategoryNameType, CategoryType } from '@/types/categoryType';
import { VideoCardType } from '@/types/videoType';
import axios from 'axios';
import { GetStaticPropsContext } from 'next';
import { useState } from 'react';

interface CategoryProps {
  categoryVideos: CategoryType;
  catId: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 15;

export default function Category({ catId, categoryVideos }: CategoryProps) {
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState(categoryVideos.nextUUID);
  const [videoList, setVideoList] = useState<VideoCardType[]>(categoryVideos.videos);

  console.log('categoryVideos', categoryVideos);
  const fetchVideo = async (nextUUID: string) => {
    const res = await axios.get(`${BASE_URL}/video/category/${catId}?page=${nextUUID}&pageSize=${PAGE_SIZE}`, {
      withCredentials: true,
    });
    console.log('res.data', res.data);
    setNextId(res.data.nextUUID);
    return res.data;
  };

  const fetchMoreData = async () => {
    console.log('fetchMoreData 호출');
    console.log('nextId', nextId);

    if (nextId === '') {
      setHasMore(false);
      return;
    }

    const data = await fetchVideo(nextId);
    console.log('more fetched data', data);

    setNextId(data.nextUUID);
    setVideoList([...videoList, ...data.videos]);
  };

  if (!categoryVideos) {
    return <div className='h-screen flex items-center m-auto'>loading...</div>;
  }

  return (
    <div className='mx-44 min-h-screen'>
      <InfiniteVideoContainer
        title={categoryVideos.categoryName}
        videoList={videoList}
        dataFetcher={fetchMoreData}
        hasMore={hasMore}
      />
    </div>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const catId = params?.catId as String;
  const res = await axios.get(`${BASE_URL}/video/category/${catId}?pageSize=${PAGE_SIZE}`);
  const categoryVideos = await res.data;
  return {
    props: {
      catId,
      categoryVideos,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const res = await axios.get(`${BASE_URL}/video/category`);
  const paths = res.data.map((category: CategoryNameType) => ({
    params: { catId: category.categoryNameId },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
