import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Title from '@/components/ui/Title';
import VideoSummaryContainer from '@/components/video/VideoTop10Container';
import fetcher from '@/utils/axiosFetcher';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function search() {
  const router = useRouter();
  const keyword = router.query.keyword;

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/video/search?search_query=${keyword}`, fetcher);
  console.log(data);

  if (!data) {
    return (
      <div className='min-h-screen mx-44 my-10 flex items-center'>
        <div className='m-auto'>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  return (
    <div className='min-h-screen mx-44 my-10'>
      <div className='border-b-2 p-5'>
        <Title text={`"${keyword}" 검색 결과`} />
      </div>
      <div>{data.length === 0 ? '검색 결과가 없습니다.' : <VideoSummaryContainer videoList={data} />}</div>
    </div>
  );
}
