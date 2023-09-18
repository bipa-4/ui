type Props = {
  children: {
    video: React.ReactNode;
    comment?: React.ReactNode;
    videoInfo: React.ReactNode;
    recommendVideo: React.ReactNode;
  };
};

export default function VideoDetailLayout({ children }: Props) {
  return (
    <div className='w-full flex'>
      <div className='grow my-4'>
        <div className='m-3/5 relative overflow-hidden' style={{ paddingTop: '56.25%' }}>
          {children.video}
        </div>
        {children.videoInfo}
        {children.comment}
      </div>
      <div className='basis-1/4 max-2xl:hidden my-4 shrink-0'>{children.recommendVideo}</div>
    </div>
  );
}
