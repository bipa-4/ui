import React, { useEffect, useState } from 'react';
import { commentType } from '@/types/commentType';
import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';
import LoadingSpinner from '../ui/LoadingSpinner';
import CommentItem from './CommentItem';

type replyType = {
  videoId: string;
  groupIndex: string;
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * 대댓글 컴포넌트입니다.
 */
function ReplyList({ videoId, groupIndex, isUpdated, setIsUpdated }: replyType) {
  const [replyList, setReplyList] = useState<commentType[]>([]);

  const { data } = useSWR<commentType[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${videoId}/${groupIndex}/comment-child`,
    fetcher,
  );

  const getReplies = async () => {
    const res = await fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/${videoId}/${groupIndex}/comment-child`);
    setReplyList(res);
  };

  useEffect(() => {
    getReplies();
  }, []);

  useEffect(() => {
    if (isUpdated) {
      getReplies();
      setIsUpdated(false);
    }
  }, [isUpdated]);

  console.log('대댓글: ', data);

  if (!replyList) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {replyList.map((reply: commentType) => (
        <CommentItem
          comment={reply}
          videoId={videoId}
          key={reply.commentId}
          setIsUpdated={setIsUpdated}
          isParent={false}
        />
      ))}
    </>
  );
}
export default React.memo(ReplyList);
