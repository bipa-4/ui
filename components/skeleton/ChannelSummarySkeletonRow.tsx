export default function ChannelSummarySkeletonRow() {
  return (
    <div className='h-20 w-full rounded-2xl max-lg:w-full bg-slate-100 mb-2'>
      <div className='animate-pulse w-full flex items-center px-2 justify-start h-20'>
        <div className='bg-slate-200 avatar mx-2 w-11 h-11 rounded-full'></div>
        <div className='basis-3/5 space-y-3 py-1'>
          <div className='h-2 bg-slate-200 rounded  w-3/4' />
          <div className='h-2 bg-slate-200 rounded' />
        </div>
      </div>
    </div>
  );
}
