export default function VideoSummarySkeletonCol() {
  return (
    <div className='bg-base-200 rounded-md p-2 w-11/12 m-auto mb-2'>
      <div className='animate-pulse flex space-x-4'>
        <div className='rounded-md bg-base-300 h-30 w-20' />
        <div className='basis-3/5 space-y-6 py-1'>
          <div className='h-2 bg-base-300 rounded' />
          <div className='space-y-3'>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-2 bg-base-300 rounded col-span-2' />
              <div className='h-2 bg-base-300 rounded col-span-1' />
            </div>
            <div className='h-2 bg-base-300 rounded' />
          </div>
        </div>
      </div>
    </div>
  );
}
