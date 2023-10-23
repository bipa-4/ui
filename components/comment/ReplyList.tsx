import React, { useEffect, useState } from 'react';
import { commentType } from '@/types/commentType';
import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';
import Avatar from '../ui/Avatar';
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
        //<div className='flex mt-8 items-start' key={reply.commentId}>
        //  <Avatar width={10} marginX={3} imgUrl={reply.channelProfileUrl} />
        //  <div>
        //    <div className='mb-2'>
        //      <span className='font-bold pr-3'>{reply.channelName}</span>
        //      <span className='font-light'>{reply.createAt}</span>
        //      <span className='pl-3'>groupIdx: {reply.groupIndex}</span>
        //    </div>
        //    <div className='whitespace-pre-line w-full mb-2 '>{reply.content}</div>
        //  </div>
        //</div>
      ))}
    </>
  );
}
export default React.memo(ReplyList);
