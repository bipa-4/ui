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
import fetcher from '@/utils/axiosFetcher';

interface CategoryProps {
  fallback: CategoryType;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 15;

export default function Category({ fallback }: CategoryProps) {
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState('');
  const [videoList, setVideoList] = useState<VideoCardType[]>([]);
  const { categoryList } = useCategoryList();
  const router = useRouter();
  const catId = router.query.catId as string;
  const categoryName = categoryList?.find((category) => category.categoryNameId === catId)?.categoryName;

  useEffect(() => {
    setVideoList(fallback.videos);
    setNextId(fallback.nextUUID);
    if (fallback.nextUUID === null) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [catId]);

  const fetchVideo = async (nextUUID: string) => {
    const videoData = await fetcher(`${BASE_URL}/video/category/${catId}?page=${nextUUID}&pageSize=${PAGE_SIZE}`);
    setNextId(videoData.nextUUID);
    return videoData;
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

  if (!fallback) {
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

        {fallback.videos.length !== 0 ? (
          <InfiniteVideoContainer videoList={videoList} dataFetcher={fetchMoreData} hasMore={hasMore} />
        ) : (
          <div className='flex items-center m-auto h-36 justify-center'>업로드한 영상이 없습니다.</div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetStaticPropsContext) {
  const { params } = context;
  const catId = params?.catId as String;
  const API = `${BASE_URL}/video/category/${catId}?pageSize=${PAGE_SIZE}`;
  const categoryVideos = await fetcher(API);

  // if (res.status !== 200) {
  //  return {
  //    props: {
  //      catId,
  //      categoryVideos: {
  //        categoryName: '',
  //        categoryNameId: '',
  //        nextUUID: '',
  //        videos: [],
  //      },
  //    },
  //    revalidate: 1,
  //  };
  // }
  return {
    props: {
      // catId,
      fallback: {
        [API]: categoryVideos,
      },
      ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header'])),
    },
  };
}

// export const getStaticPaths = async () => {
//  const res = await axios.get(`${BASE_URL}/video/category`);
//  const paths = res.data.map((category: CategoryNameType) => ({
//    params: { catId: category.categoryNameId },
//  }));

//  return {
//    paths,
//    fallback: 'blocking',
//  };
// };
