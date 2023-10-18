import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import ReplyItem from './ReplyItem';
import Avatar from '../ui/Avatar';
import CommentInput from './CommentInput';
import { childCommentType, parentCommentType } from '@/types/commentType';
import useSWR from 'swr';

type commentType = {
  videoId: string;
  comment: parentCommentType;
};

/**
 * 댓글 컴포넌트입니다.
 * Todo: 렌더링 최적화
 */
export default function CommentItem({ videoId, comment }: commentType) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [writeChildReply, setWriteChildReply] = useState(false);
  // Todo: 채널 클릭시 해당 채널로 이동

  const handleReplyOpen = () => {
    setIsReplyOpen((prev) => !prev);
  };

  const handleWrite = () => {
    setWriteChildReply((prev) => !prev);
  };

  return (
    <div className='flex mt-8 items-start'>
      <Avatar width={10} marginX={3} imgUrl={comment.channelProfileUrl} />
      <div className='grow'>
        <div className='h-10 flex items-center'>
          <span className='font-bold pr-3'>{comment.channelName}</span>
          <span className='font-light text-sm pr-3'>{comment.createAt}</span>
          <span>groupIdx: {comment.groupIndex}</span>
        </div>
        <div className='w-full mb-2'>
          <div className='pb-2 pr-6'>{comment.content}</div>
          <span className='btn bg-transparent rounded-md btn-sm mr-4 border-none' onClick={handleWrite}>
            답글
          </span>
          <span className='text-sm text-secondary cursor-pointer' onClick={handleReplyOpen}>
            <IoMdArrowDropdown className='inline-block' />
            답글 {comment.childCount}개
          </span>
          {writeChildReply && <CommentInput />}
          {isReplyOpen && <ReplyItem videoId={videoId} groupIndex={comment.groupIndex} />}
        </div>
      </div>
    </div>
  );
}
