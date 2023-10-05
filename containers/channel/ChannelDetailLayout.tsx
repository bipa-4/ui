import Avatar from '@/components/ui/Avatar';
import Title from '@/components/ui/Title';
import VideoContainer from '@/components/video/VideoTop10Container';
import { BiSearch } from 'react-icons/bi';
import { channelData } from '@/public/staticData/channelData';
import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ChannelDetailLayout() {
  const { data } = useSWR(`${BASE_URL}/read/channel`, fetcher);

  console.log('채널:', data);

  return (
    <>
      <div className='flex w-full h-60 items-center border-0 border-b-2 border-slate-300'>
        <div className='w-48'>
          <Avatar width='full' marginX={5} />
        </div>
        <div className='grow pl-4'>
          <Title text={channelData.title} />
          <div>{channelData.description}</div>
        </div>
      </div>
      <div className='mt-7'>
        <div className='mx-5 flex justify-between items-center'>
          <Title text='최근 업로드' />
          <div>
            <label className='relative block'>
              <span className='sr-only'>Search</span>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <BiSearch className='w-5 h-5 stroke-slate-200' />
              </span>
              <input
                type='text'
                placeholder='검색'
                className='input input-bordered w-full max-w-xs placeholder:italic placeholder:text-slate-400 block  py-2 pl-9 pr-3 sm:text-sm '
              />
            </label>
          </div>
        </div>
        <VideoContainer videoList={channelData.orderedVideoList} />
      </div>
    </>
  );
}
