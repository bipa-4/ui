import Avatar from '@/components/ui/Avatar';
import Title from '@/components/ui/Title';
import VideoContainer from '@/components/video/VideoTop10Container';
import { BiSearch } from 'react-icons/bi';
import { channelData } from '@/public/staticData/channelData';
import { ChannelDetailType } from '@/types/channelType';
import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';

interface ChannelProps {
  channelInfo: ChannelDetailType;
}

export default function ChannelDetailLayout({ channelInfo }: ChannelProps) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { data } = useSWR(`${BASE_URL}/channel/video/${channelInfo.channelId}`, fetcher);
  //console.log('data', data);
  console.log(channelInfo.updateFlag);
  return (
    <>
      <div className='flex w-full h-60 items-center border-0 border-b-2 border-slate-300'>
        <div className='w-48'>
          <Avatar width='full' marginX={5} imgUrl={channelInfo.profileUrl} />
        </div>
        <div className='grow pl-4'>
          <Title text={channelInfo.channelName} />
          <div>{channelInfo.content}</div>
        </div>
        <button className='btn'>채널 정보 수정</button>
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
        {data?.length === 0 ? (
          <div className='mx-5 flex items-center'>
            <p className='mt-52 m-auto'>업로드한 영상이 없습니다.</p>
          </div>
        ) : (
          <VideoContainer videoList={channelData.orderedVideoList} />
        )}
      </div>
    </>
  );
}
