import Avatar from '@/components/profile/Avatar';

export default function ChannelDetailLayout() {
  return (
    <div className='flex w-full h-36 items-center'>
      <Avatar width={60} marginX={5} />
      <div>
        <div>채널 이름</div>
        <div>채널 설명</div>
      </div>
    </div>
  );
}
