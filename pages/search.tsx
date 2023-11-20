import SearchResult from '@/containers/search/SearchResult';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header'])),
  },
});

export default function search() {
  return <SearchResult />;
}
