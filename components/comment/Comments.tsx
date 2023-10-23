import { VideoDetailType } from '@/types/videoType';
import { commentType } from '@/types/commentType';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';
import Title from '../ui/Title';
import CommentInput from './CommentInput';
import LoadingSpinner from '../ui/LoadingSpinner';
import CommentItem from './CommentItem';

type commentsPropsType = {
  video: VideoDetailType;
};

export default function Comments({ video }: commentsPropsType) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [commentList, setCommentList] = useState<commentType[]>([]);

  // const { data } = useSWR<commentType[]>(
  //  `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${video.videoId}/comment-parent`,
  //  fetcher,
  // );

  console.log('isUpdated', isUpdated);

  const getComments = async () => {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/${video.videoId}/comment-parent`);
    console.log('부모댓글 조회함', res);
    setCommentList(res);
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (isUpdated) {
      getComments();
      setIsUpdated(false);
    }
  }, [isUpdated]);

  return (
    <div className='w-full mx-1 my-5 max-2xl:w-full'>
      <div className='mx-1 pb-3 border-b-2'>
        <Title text='댓글' />
      </div>
      <CommentInput videoId={video.videoId} commentType='parent' groupIndex={null} setIsUpdated={setIsUpdated} />
      <div className='w-full'>
        {!commentList && <LoadingSpinner />}
        {commentList?.length === 0 && <div className='text-center'>댓글이 없습니다.</div>}
        {commentList?.map((c: commentType) => (
          <CommentItem
            comment={c}
            videoId={video.videoId}
            key={c.commentId}
            setIsUpdated={setIsUpdated}
            isParent={true}
          />
        ))}
      </div>
    </div>
  );
}
