type Props = {
  children: {
    video: React.ReactNode;
    videoInfo: React.ReactNode;
    recommendVideo: React.ReactNode;
  };
};

export default function VideoDetailLayout({ children }: Props) {
  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          {children.video}
        </div>
        {children.videoInfo}
      </div>
      <div className='basis-1/4 max-2xl:hidden my-4'>{children.recommendVideo}</div>
    </div>
  );
}
