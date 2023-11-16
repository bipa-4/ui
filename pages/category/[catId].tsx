import Head from 'next/head';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import useCategoryList from '@/hooks/useCategoryList';
import { CategoryNameType, CategoryType } from '@/types/categoryType';
import { VideoCardType } from '@/types/videoType';
import axios from 'axios';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface CategoryProps {
  categoryVideos: CategoryType;
  catId: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 15;

export default function Category({ catId, categoryVideos }: CategoryProps) {
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState('');
  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const { categoryList } = useCategoryList();
  const categoryName = categoryList?.find((category) => category.categoryNameId === catId)?.categoryName;
  const router = useRouter();

  useEffect(() => {
    setVideoList(categoryVideos.videos);
    setNextId(categoryVideos.nextUUID);
    categoryVideos.nextUUID === null ? setHasMore(false) : setHasMore(true);
  }, [catId]);

  const fetchVideo = async (nextUUID: string) => {
    const res = await axios.get(`${BASE_URL}/video/category/${catId}?page=${nextUUID}&pageSize=${PAGE_SIZE}`, {
      withCredentials: true,
    });
    setNextId(res.data.nextUUID);
    return res.data;
  };

  const fetchMoreData = async () => {
    if (nextId === null) {
      setHasMore(false);
      return;
    }
    const data = await fetchVideo(nextId);
    setNextId(data.nextUUID);
    setVideoList([...videoList, ...data.videos]);
  };

  if (!categoryVideos) {
    return (
      <div className='h-screen flex items-center justify-center m-auto'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title> {categoryName} | StreamWave</title>
        <meta name='description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:title' content='간편한 영상 공유 플랫폼 - StreamWave' />
        <meta property='og:description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:image' content='/images/streamWave.png' />
      </Head>
      <div className='px-32 min-h-screen bg-base-100 max-xl:px-5'>
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

        {categoryVideos.videos.length !== 0 ? (
          <InfiniteVideoContainer videoList={videoList} dataFetcher={fetchMoreData} hasMore={hasMore} />
        ) : (
          <div className='flex items-center m-auto h-36 justify-center'>업로드한 영상이 없습니다.</div>
        )}
      </div>
    </>
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
      ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header'])),
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
