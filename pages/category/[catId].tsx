import Head from 'next/head';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useCategoryList from '@/hooks/useCategoryList';
import { CategoryType } from '@/types/categoryType';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import fetcher from '@/utils/axiosFetcher';
import CategoryVideos from '@/components/category/CategoryVideos';
import { SWRConfig } from 'swr';

interface CategoryProps {
  catId: string;
  fallback: CategoryType;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 15;

export async function getServerSideProps(context: GetStaticPropsContext) {
  const { params } = context;
  const catId = params?.catId as String;
  const API = `${BASE_URL}/video/category/${catId}?pageSize=${PAGE_SIZE}`;
  const categoryVideos = await fetcher(API);
  return {
    props: {
      catId,
      fallback: {
        [API]: categoryVideos,
      },
      ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header'])),
    },
  };
}

export default function Category({ catId, fallback }: CategoryProps) {
  const { categoryList } = useCategoryList();
  const categoryName = categoryList?.find((category) => category.categoryNameId === catId)?.categoryName;

  if (!fallback) {
    return (
      <div className='h-screen flex items-center justify-center m-auto'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <SWRConfig value={{ fallback }}>
      <Head>
        <title> {categoryName} | StreamWave</title>
        <meta name='description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:title' content='간편한 영상 공유 플랫폼 - StreamWave' />
        <meta property='og:description' content='동영상 공유 플랫폼 StreamWave입니다.' />
        <meta property='og:image' content='/images/streamWave.png' />
      </Head>
      <div className='px-32 min-h-screen bg-base-100 max-xl:px-5'>
        <CategoryVideos />
      </div>
    </SWRConfig>
  );
}
