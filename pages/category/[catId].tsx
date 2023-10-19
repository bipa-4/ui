import LoadingSpinner from '@/components/ui/LoadingSpinner';
import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import useCategoryList from '@/hooks/useCategoryList';
import { CategoryNameType, CategoryType } from '@/types/categoryType';
import { VideoCardType } from '@/types/videoType';
import axios from 'axios';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
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
  const { categoryList } = useCategoryList();
  const router = useRouter();

  console.log('categoryVideos', categoryVideos);
  const fetchVideo = async (nextUUID: string) => {
    const res = await axios.get(`${BASE_URL}/video/category/${catId}?page=${nextUUID}&pageSize=${PAGE_SIZE}`, {
      withCredentials: true,
    });
    setNextId(res.data.nextUUID);
    return res.data;
  };

  const fetchMoreData = async () => {
    // console.log('fetchMoreData 호출');
    // console.log('nextId', nextId);
    if (nextId === '') {
      setHasMore(false);
      return;
    }
    const data = await fetchVideo(nextId);
    setNextId(data.nextUUID);
    setVideoList([...videoList, ...data.videos]);
  };

  if (!categoryVideos) {
    return (
      <div className='h-screen flex items-center m-auto'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='px-32 min-h-screen bg-base-100'>
      <div className='flex items-center m-3 mt-5 border-b'>
        {categoryList?.map((category) => (
          <div
            className={`w-28 p-4 text-center text-lg ${
              category.categoryNameId === catId && 'font-bold'
            } cursor-pointer hover:bg-base-100`}
            onClick={() => router.push(`/category/${category.categoryNameId}`)}
            key={category.categoryNameId}
          >
            {category.categoryName}
          </div>
        ))}
      </div>
      {categoryVideos.videos.length !== 0 ? (
        <InfiniteVideoContainer
          title={categoryVideos.categoryName}
          videoList={videoList}
          dataFetcher={fetchMoreData}
          hasMore={hasMore}
        />
      ) : (
        <div className='flex items-center m-auto h-36 justify-center'>업로드한 영상이 없습니다.</div>
      )}
    </div>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const catId = params?.catId as String;
  const res = await axios.get(`${BASE_URL}/video/category/${catId}?pageSize=${PAGE_SIZE}`);
  const categoryVideos = await res.data;

  if (res.status !== 200) {
    return {
      props: {
        catId,
        categoryVideos: {
          categoryName: '',
          categoryNameId: '',
          nextUUID: '',
          videos: [],
        },
      },
      revalidate: 10,
    };
  }
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
