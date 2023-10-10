import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import { CategoryNameType, CategoryType } from '@/types/categoryType';
import { VideoCardType } from '@/types/videoType';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

interface CategoryProps {
  categoryVideos: CategoryType;
  catId: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function Category({ catId, categoryVideos }: CategoryProps) {
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState('');
  const [videoList, setVideoList] = useState<VideoCardType[]>(categoryVideos.categoryVideos);

  const fetchVideo = async (nextUUID: string) => {
    const res = await axios.get(
      `${BASE_URL}/video/category?${nextUUID === '' ? '' : 'page='}${nextUUID}&pageSize=${PAGE_SIZE}`,
      {
        withCredentials: true,
      },
    );
    console.log('res.data', res.data);
    setNextId(res.data.nextUUID);
    return res.data;
  };

  useEffect(() => {
    console.log('초기렌더링');
    const fetchInitData = async () => {
      const initData = await fetchVideo('');
      setVideoList(initData.videos as VideoCardType[]);
    };
    fetchInitData();
  }, []);

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

  return (
    <InfiniteVideoContainer
      title={categoryVideos.categoryName}
      videoList={categoryVideos.categoryVideos}
      dataFetcher={fetchMoreData}
      hasMore={hasMore}
    />
  );
}

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const res = await axios.get(`${BASE_URL}/read/video/category/${context.params?.catId}?page=1&pageSize=${PAGE_SIZE}`);
  const categoryVideos = res.data;
  return {
    props: {
      catId: context.params?.catId,
      categoryVideos,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const res = await axios.get(`${BASE_URL}/read/video/category`);
  const paths = res.data.map((category: CategoryNameType) => ({
    params: { catId: category.categoryNameId },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
