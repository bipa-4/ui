import { useRouter } from 'next/router';
import { VideoDetailType } from '@/types/videoType';
import { useState, useEffect } from 'react';
import fetcher from '@/utils/axiosFetcher';
import { useAtomValue } from 'jotai';
import axios from 'axios';
import { FiMoreHorizontal } from 'react-icons/fi';
import Link from 'next/link';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { useTranslation } from 'next-i18next';
import userAtom from '@/atoms/user';
import customConfirmToast, { customWarningToast } from '@/utils/CustomToast';
import ShareModal from './ShareModal';
import Avatar from '../ui/Avatar';

type Props = {
  video: VideoDetailType;
  handleUpdatePage: () => void;
  isMyVideo?: boolean;
};

export default function VideoDetailInfo({ video, handleUpdatePage, isMyVideo }: Props) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const user = useAtomValue(userAtom);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likeCount);
  const [readMore, setReadMore] = useState(video.content.length <= 100);
  const router = useRouter();
  const { t } = useTranslation('videoDetail');

  const checkLiked = async () => {
    try {
      const hasLiked = await fetcher(`${BASE_URL}/video/like/${video.videoId}`);
      setLike(hasLiked);
    } catch (err) {
      customWarningToast(`좋아요 확인 에러: , ${err}`);
    }
  };

  useEffect(() => {
    checkLiked();
    setReadMore(video.content.length <= 100);
  }, [video]);

  const channelClickHandler = () => {
    router.push(`/channel/${video.channelId}`);
  };

  const handleLike = async () => {
    if (!user) {
      customWarningToast('로그인이 필요합니다.');
      return;
    }

    if (like === true) {
      setLike((prev) => !prev);
      setLikeCount((prev) => prev - 1);
      await axios.delete(`${BASE_URL}/video/detail/${video.videoId}/like`, {
        withCredentials: true,
      });
      return;
    }

    if (like === false) {
      setLike((prev) => !prev);
      setLikeCount((prev) => prev + 1);
      await fetcher(`${BASE_URL}/video/detail/${video.videoId}/like`);
    }
  };

  const deleteVideo = async () => {
    const confirm = window.confirm(`${t('deleteConfirmMessage')}`);
    if (confirm) {
      try {
        const res = await axios.delete(`${BASE_URL}/video/${video.videoId}`, { withCredentials: true });
        if (res.status === 200) {
          customConfirmToast('삭제되었습니다.');
          router.push('/');
        }
      } catch (err) {
        customWarningToast(`삭제에 실패했습니다. ${err}`);
      }
    }
  };

  return (
    <div className='my-5'>
      <div className='rounded-md w-full mx-auto'>
        <div className='flex justify-between py-5 items-center'>
          <div className='text-2xl mx-3 font-bold'>{video.videoTitle}</div>
          <div className='' />
        </div>

        <div className='flex items-center py-4 justify-between w-full h-24'>
          <div className='flex items-center cursor-pointer justify-start' onClick={channelClickHandler}>
            <Avatar width={11} imgUrl={video.channelProfileUrl} marginX={3} />
            <div className='font-bold'>{video.channelName || '채널명'}</div>
          </div>

          <div className='flex items-center mx-3'>
            <div className='btn bg-base-100 rounded-full' onClick={handleLike}>
              <span className='text-sm'>{likeCount}</span>
              {like ? <PiHeartFill className='fill-red-500 w-7 h-7' /> : <PiHeart className='border-red-500 w-7 h-7' />}
            </div>
            <ShareModal />
            {isMyVideo && (
              <div className='dropdown dropdown-end'>
                <label tabIndex={0} className='btn bg-base-100 rounded-full m-1'>
                  <FiMoreHorizontal />
                </label>
                <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                  <li>
                    <Link
                      href={`/video/update/${video.videoId}`}
                      className='text-blue-500 font-bold'
                      onClick={handleUpdatePage}
                    >
                      {t('modify')}
                    </Link>
                  </li>
                  <li>
                    <div className='text-red-500 font-bold' onClick={deleteVideo}>
                      {t('delete')}
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className='mx-3 p-5 bg-base-200 rounded-md'>
          <div className='text-sm pb-3'>
            {t('details.views')} {video.readCount} · {t('details.createdAt')} {video.createAt} ·{' '}
            {t('details.updatedAt')}
            {video.updateAt && video.updateAt}
          </div>
          {readMore ? (
            <div className='whitespace-pre-line'>{video.content}</div>
          ) : (
            <div className='whitespace-pre-line line-clamp-1'>{video.content}</div>
          )}
          {video.content.length > 100 && (
            <div className='text-sm text-blue-500 cursor-pointer mt-4' onClick={() => setReadMore(!readMore)}>
              {readMore ? t('details.readLess') : t('details.readMore')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

VideoDetailInfo.defaultProps = {
  isMyVideo: false,
};
