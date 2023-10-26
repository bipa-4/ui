import { VideoDetailType } from '@/types/videoType';
import { commentType } from '@/types/commentType';
import { useEffect, useState } from 'react';
import fetcher from '@/utils/axiosFetcher';
import { useTranslation } from 'next-i18next';
import Title from '../ui/Title';
import CommentInput from './CommentInput';
import LoadingSpinner from '../ui/LoadingSpinner';
import CommentItem from './CommentItem';

type commentsPropsType = {
  video: VideoDetailType;
};

export default function Comments({ video }: commentsPropsType) {
  const [isCommentUpdated, setIsCommentUpdated] = useState(false);
  const [commentList, setCommentList] = useState<commentType[]>([]);
  const { t } = useTranslation('videoDetail');

  const getComments = async () => {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/${video.videoId}/comment-parent`);
    console.log('부모댓글 조회함', res);
    setCommentList(res);
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (isCommentUpdated) {
      getComments();
      setIsCommentUpdated(false);
    }
  }, [isCommentUpdated]);

  return (
    <div className='w-full mx-1 my-5 max-2xl:w-full'>
      <div className='mx-1 py-3 border-b-2 mb-5'>
        <Title text={t('comment.title')} />
      </div>
      <CommentInput
        videoId={video.videoId}
        commentLevel='parent'
        groupIndex={null}
        setIsUpdated={setIsCommentUpdated}
        setCommentList={setCommentList}
      />
      <div className='w-full'>
        {!commentList && <LoadingSpinner />}
        {commentList?.length === 0 && (
          <div className='h-40 flex items-center justify-center m-auto font-light opacity-70'>
            {t('comment.noContent')}
          </div>
        )}
        {commentList?.map((c: commentType) => (
          <CommentItem
            comment={c}
            videoId={video.videoId}
            key={c.commentId}
            setIsCommentUpdated={setIsCommentUpdated}
            setCommentList={setCommentList}
            commentLevel='parent'
          />
        ))}
      </div>
    </div>
  );
}
