export default function VideoDetailInfoSkeleton() {
  return (
    <div className='bg-base-200 rounded-md p-4 w-full mx-auto my-4'>
      <div className='animate-pulse flex space-x-4'>
        <div className='rounded-full bg-base-300 h-10 w-10' />
        <div className='basis-4/5 space-y-6 py-1'>
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
