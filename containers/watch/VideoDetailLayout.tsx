type Props = {
  children: {
    video: React.ReactNode;
    videoInfo: React.ReactNode;
    recommendVideo?: React.ReactNode;
  };
};

export default function VideoDetailLayout({ children }: Props) {
  return (
    <div className='h-screen mx-56 max-xl:mx-5'>
      <div className='w-full flex' style={{ height: '40rem' }}>
        <div className='grow my-4'>
          <div className='relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
            {children.video}
          </div>
          {children.videoInfo}
        </div>
        <div className='basis-1/5 max-2xl:hidden my-4'>다른 추천 영상이 들어갈 곳이다.</div>
      </div>
    </div>
  );
}
