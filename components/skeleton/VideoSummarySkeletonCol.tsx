export default function VideoSummarySkeletonCol() {
  return (
    <div className='card card-compact bg-base-200 overflow-hidden'>
      <div className='animate-pulse '>
        <div className='w-full relative pb-[56.25%] bg-base-300' />
        <div className='card-body w-full'>
          <div className='h-2 bg-base-300 rounded' />
          <div className='h-2 bg-base-300 rounded col-span-2 w-4/5' />
          <div className='h-2 bg-base-300 rounded' />
        </div>
      </div>
    </div>
  );
}
