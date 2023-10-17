import Image from 'next/image';
import { useRouter } from 'next/router';
import { VideoDetailType } from '@/types/videoType';
import { useState, useEffect } from 'react';
import fetcher from '@/utils/axiosFetcher';
import { useAtomValue } from 'jotai';
import axios from 'axios';
import { FiMoreHorizontal } from 'react-icons/fi';
import Link from 'next/link';
import { userAtom } from '../layouts/Header';
import ShareModal from './ShareModal';
import Avatar from '../ui/Avatar';

type Props = {
  video: VideoDetailType;
  handleUpdatePage: () => void;
};

export default function VideoDetailInfo({ video, handleUpdatePage }: Props) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const user = useAtomValue(userAtom);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likeCount);
  const [isMyVideo, setIsMyVideo] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLiked = async () => {
      const hasLiked = await fetcher(`${BASE_URL}/video/like/${video.videoId}`);
      console.log('hasLiked', hasLiked);
      setLike(hasLiked);
    };
    const checkMyVideo = async () => {
      const res = await axios.get(`${BASE_URL}/video/check?videoId=${video.videoId}`, { withCredentials: true });
      console.log('isMyVideo', res.data);
      setIsMyVideo(res.data);
    };
    checkLiked();
    checkMyVideo();
  }, []);

  const channelClickHandler = () => {
    router.push(`/channel/${video.channelId}`);
  };

  const handleLike = async () => {
    console.log('video: ', video);

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (like === true) {
      setLike((prev) => !prev);
      setLikeCount((prev) => prev - 1);
      const deleted = await axios.delete(`${BASE_URL}/video/detail/${video.videoId}/like`, {
        withCredentials: true,
      });
      console.log('좋아요 삭제', deleted);
      return;
    }

    if (like === false) {
      setLike((prev) => !prev);
      setLikeCount((prev) => prev + 1);
      const liked = await axios.get(`${BASE_URL}/video/detail/${video.videoId}/like`, {
        withCredentials: true,
      });
      console.log('좋아요 누름', liked);
    }
  };

  const deleteVideo = async () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (confirm) {
      try {
        const res = await axios.delete(`${BASE_URL}/video/${video.videoId}`, { withCredentials: true });
        console.log('res', res);
        router.push('/');
      } catch (err) {
        console.log(err);
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

        <div className='flex items-center py-4 rounded-lg justify-between '>
          <div className='flex items-center cursor-pointer' onClick={channelClickHandler}>
            <div>
              <Avatar width={12} imgUrl={video.channelProfileUrl} marginX={3} />
            </div>
            <div className=''>{video.channelName || '채널명'}</div>
            {/* <div className='btn btn-secondary mx-5 btn-sm'> 구독 </div> */}
          </div>

          <div className='flex items-center mx-3'>
            <div className='btn bg-slate-100 rounded-full' onClick={handleLike}>
              <span className='text-sm'>{likeCount}</span>
              {like ? (
                <Image src='/images/heart.png' alt='heart' width={23} height={23} />
              ) : (
                <Image src='/images/heart-empty.png' alt='heart' width={23} height={23} />
              )}
            </div>
            <ShareModal />
            {isMyVideo && (
              <div className='dropdown dropdown-end'>
                <label tabIndex={0} className='btn bg-slate-100 rounded-full m-1'>
                  <FiMoreHorizontal />
                </label>
                <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
                  <li>
                    <Link href={`/video/update/${video.videoId}`} className='text-blue-600' onClick={handleUpdatePage}>
                      수정
                    </Link>
                  </li>
                  <li>
                    <div className='text-red-600' onClick={deleteVideo}>
                      삭제
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className='mx-3 p-5 bg-gray-100 rounded-md'>
          <div className='text-sm pb-3'>
            조회수 {video.readCount}회 · 업로드 {video.createAt}
          </div>
          {readMore ? (
            <div className='whitespace-pre-line'>{video.content}</div>
          ) : (
            <div className='whitespace-pre-line line-clamp-1'>{video.content}</div>
          )}
          <div className='text-sm text-blue-500 cursor-pointer mt-4' onClick={() => setReadMore(!readMore)}>
            {readMore ? '간략히' : '더보기'}
          </div>
        </div>
      </div>
    </div>
  );
}
