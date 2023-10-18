import React from 'react';
import { childCommentType } from '@/types/commentType';
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
  const { data } = useSWR<childCommentType[]>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${videoId}/${groupIndex}/comment-child`,
    fetcher,
  );
  console.log('대댓글: ', data);

  if (!data) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {data.map((r: childCommentType) => (
        <div className='flex mt-8 items-start' key={r.commentId}>
          <Avatar width={10} marginX={3} />
          <div>
            <div className='mb-2'>
              <span className='font-bold pr-3'>{r.channelName}</span>
              <span className='font-light'>{r.createAt}</span>
            </div>
            <div className='w-full mb-2 '>{r.content}</div>
          </div>
        </div>
      ))}
    </>
  );
}
export default React.memo(ReplyItem);
