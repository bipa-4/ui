import Image from 'next/image';
import { useRouter } from 'next/router';
import useVideoData from '@/hooks/useVideoData';
import Avatar from '../ui/Avatar';
import ShareModal from './ShareModal';

type Props = {
  handleLike: () => void;
};

export default function VideoDetailInfo({ handleLike }: Props) {
  const router = useRouter();
  const { vid } = router.query;
  const { video } = useVideoData(vid?.toString());

  if (video) {
    return (
      <div className='my-5'>
        <div className='rounded-md w-full mx-auto'>
          <div className='flex justify-between py-5 items-center'>
            <div className='text-2xl mx-3 font-bold'>{video.videoTitle}</div>

            <div className='' />
          </div>

          <div className='flex items-center py-4 rounded-lg justify-between'>
            <div className='flex items-center'>
              <div>
                <Avatar width={12} imgUrl={video.channelProfileUrl} marginX={3} />
              </div>
              <div className=''>{video.channelName || '채널명'}</div>
              <div className='btn btn-secondary mx-5 btn-sm'> 구독 </div>
            </div>

            <div className='flex items-center'>
              <div className='btn bg-slate-100 rounded-full'>
                <span className='text-sm'>{video.readCnt}</span>
                <label className='swap swap-flip text-xl align-text-bottom'>
                  <input type='checkbox' />
                  <div className='swap-on'>
                    <Image src='/images/heart.png' alt='heart' width={23} height={23} onClick={handleLike} />
                  </div>
                  <div className='swap-off'>
                    <Image src='/images/heart-empty.png' alt='heart' width={23} height={23} onClick={handleLike} />
                  </div>
                </label>
              </div>
              <ShareModal />
            </div>
          </div>

          <div className='mx-3 p-5 bg-gray-100 rounded-md'>
            <div className='text-sm pb-3'>
              조회수 {video.readCnt}회 · 업로드 {video.createAt}
            </div>
            {video.content}
          </div>
        </div>
      </div>
    );
  }
  return null;
}
