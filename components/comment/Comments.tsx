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
  const [commentList, setCommentList] = useState<commentType[]>();
  const { t } = useTranslation('videoDetail');
  const [sortOrder, setSortOrder] = useState('new');

  const getComments = async () => {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${video.videoId}/comment-parent/${sortOrder}`,
    );
    setCommentList(res);
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  useEffect(() => {
    getComments();
  }, [video, sortOrder]);

  useEffect(() => {
    if (isCommentUpdated) {
      getComments();
      setIsCommentUpdated(false);
    }
  }, [isCommentUpdated]);

  return (
    <div className='w-full mx-1 my-5 max-2xl:w-full'>
      <div className='mx-1 py-3 border-b-2 mb-5 flex justify-between'>
        <Title text={t('comment.title')} />
        <select className='select select-sm w-1/6' onChange={handleSortOrderChange} defaultValue='selectOrder'>
          <option disabled value='selectOrder'>
            정렬기준
          </option>
          <option value='new'>최신순</option>
          <option value='old'>오래된순</option>
          <option value='popularity'>인기순</option>
        </select>
      </div>
      <CommentInput
        videoId={video.videoId}
        commentLevel='parent'
        groupIndex={null}
        setIsUpdated={setIsCommentUpdated}
      />
      <div className='w-full'>
        {!commentList && (
          <div className='h-40 flex items-center justify-center m-auto font-light opacity-70'>
            <LoadingSpinner />
          </div>
        )}
        {commentList?.length === 0 && (
          <div className='h-40 flex items-center justify-center m-auto font-light opacity-70'>
            {t('comment.noContent')}
          </div>
        )}
        {commentList?.map((c: commentType) => (
          <CommentItem
            comment={c}
            videoId={video.videoId}
            uploader={video.channelId}
            key={c.commentId}
            setIsCommentUpdated={setIsCommentUpdated}
            commentLevel='parent'
          />
        ))}
      </div>
    </div>
  );
}
