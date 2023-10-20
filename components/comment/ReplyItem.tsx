import React, { useEffect, useState } from 'react';
import { commentType } from '@/types/commentType';
import useSWR from 'swr';
import fetcher from '@/utils/axiosFetcher';
import Avatar from '../ui/Avatar';
import LoadingSpinner from '../ui/LoadingSpinner';

type replyType = {
  videoId: string;
  groupIndex: string;
};

/**
 * 대댓글 컴포넌트입니다.
 */
function ReplyItem({ videoId, groupIndex }: replyType) {
  const [replyList, setReplyList] = useState<commentType[]>([]);

  const { data } = useSWR<commentType[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${videoId}/${groupIndex}/comment-child`,
    fetcher,
  );

  useEffect(() => {
    if (data) {
      setReplyList(data);
    }
  }, [data]);
  console.log('대댓글: ', data);

  if (!replyList) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {replyList.map((reply: commentType) => (
        <div className='flex mt-8 items-start' key={reply.commentId}>
          <Avatar width={10} marginX={3} imgUrl={reply.channelProfileUrl} />
          <div>
            <div className='mb-2'>
              <span className='font-bold pr-3'>{reply.channelName}</span>
              <span className='font-light'>{reply.createAt}</span>
              <span className='pl-3'>groupIdx: {reply.groupIndex}</span>
            </div>
            <div className='whitespace-pre-line w-full mb-2 '>{reply.content}</div>
          </div>
        </div>
      ))}
    </>
  );
}
export default React.memo(ReplyItem);
