import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import { CategoryNameType, CategoryType } from '@/types/categoryType';
import { VideoCardType } from '@/types/videoType';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';

interface CategoryProps {
  categoryVideos: CategoryType;
  catId: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function Category({ catId, categoryVideos }: CategoryProps) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [videoList, setVideoList] = useState<VideoCardType[]>(categoryVideos.categoryVideos);

  const fetchVideo = async (currentPage: number) => {
    const res = await axios.get(`${BASE_URL}/read/video/category/${catId}?page=${currentPage}&pageSize=${PAGE_SIZE}`, {
      withCredentials: true,
    });
    return res.data;
  };

  const fetchMoreData = async () => {
    const { data } = await fetchVideo(page);

    console.log(data);
    if (data.length === 0) {
      setHasMore(false);
    } else {
      setVideoList([...videoList, ...data]);
      setPage(page + 1);
    }
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
