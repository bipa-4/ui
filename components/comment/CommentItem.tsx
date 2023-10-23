import React, { useEffect, useRef, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { commentType } from '@/types/commentType';
import { useAtomValue } from 'jotai';
import userAtom from '@/atoms/atoms';
import axios from 'axios';
import fetcher from '@/utils/axiosFetcher';
import CommentInput from './CommentInput';
import Avatar from '../ui/Avatar';

type commentPropsType = {
  videoId: string;
  comment: commentType;
  setIsCommentUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentList: React.Dispatch<React.SetStateAction<commentType[]>>;
};

/**
 * 댓글 컴포넌트입니다.
 * Todo: 렌더링 최적화
 */
function CommentItem({ videoId, comment, setIsCommentUpdated, setCommentList }: commentPropsType) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [writeChildReply, setWriteChildReply] = useState(false);
  const user = useAtomValue(userAtom);
  const [isEdit, setIsEdit] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [isReplyUpdated, setIsReplyUpdated] = useState(false);
  const [replyList, setReplyList] = useState<commentType[]>([]);

  // 댓글 입력창 엔터에 따라 높이 조절
  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textarea.current === null) return;
    textarea.current.style.height = 'auto';
    textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    setEditedComment(e.target.value);
  };

  const getReplies = async () => {
    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${videoId}/${comment.groupIndex}/comment-child`,
    );
    setReplyList(res);
  };

  // Todo: 채널 클릭시 해당 채널로 이동
  const handleReplyOpen = () => {
    setIsReplyOpen((prev) => !prev);
    getReplies();
  };

  const handleWrite = () => {
    setWriteChildReply((prev) => !prev);
  };

  const deleteComment = async () => {
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (!confirm) return;
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/${videoId}/comment/${comment.commentId}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      alert('삭제되었습니다.');
      setIsCommentUpdated(true);
    }
  };

  const editComment = async () => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/comment`,
      {
        commentId: comment.commentId,
        content: editedComment,
      },
      {
        withCredentials: true,
      },
    );
    if (res.status === 200) {
      alert('수정되었습니다.');
      setIsCommentUpdated(true);
      setIsEdit(false);
    }
  };

  useEffect(() => {
    if (isReplyUpdated) {
      getReplies();
      setIsReplyUpdated(false);
    }
  }, [isReplyUpdated]);

  return (
    <div className='flex mt-8 items-start'>
      <Avatar width={10} marginX={3} imgUrl={comment.channelProfileUrl} />
      <div className='grow'>
        <div className='h-10 flex items-center justify-between mr-4'>
          <div>
            <span className='font-bold pr-3'>{comment.channelName}</span>
            <span className='font-light text-sm pr-3'>{comment.createAt}</span>
            <span>groupIdx: {comment.groupIndex}</span>
          </div>

          {!isEdit && (
            <div>
              <span className='pr-3 text-blue-500 cursor-pointer' onClick={() => setIsEdit(true)}>
                수정
              </span>
              <span className='text-red-500 cursor-pointer' onClick={deleteComment}>
                삭제
              </span>
            </div>
          )}
        </div>
        <div className='w-full mb-2'>
          {isEdit ? (
            <div className='grow flex items-center'>
              <textarea
                className='input input-bordered input-primary rounded-md w-full resize-none p-2 min-h-12 my-2'
                defaultValue={comment.content}
                ref={textarea}
                onChange={handleResizeHeight}
              />
              <div className='btn mx-3 btn-outline btn-primary min-h-12' onClick={editComment}>
                수정
              </div>
              <div className='btn btn-ghost min-h-12 border-neutral-content' onClick={() => setIsEdit(false)}>
                취소
              </div>
            </div>
          ) : (
            <div className='whitespace-pre-line pb-2 pr-6'>{comment.content}</div>
          )}
          <span className='btn bg-transparent rounded-md btn-sm mr-4 border-none' onClick={handleWrite}>
            답글
          </span>
          {comment.childCount !== '0' && (
            <span className='text-sm text-secondary cursor-pointer' onClick={handleReplyOpen}>
              <IoMdArrowDropdown className='inline-block' />
              답글 {comment.childCount}개
            </span>
          )}

          {writeChildReply && (
            <CommentInput
              videoId={videoId}
              commentLevel='child'
              groupIndex={comment.groupIndex}
              setIsUpdated={setIsReplyUpdated}
              setCommentList={setCommentList}
            />
          )}
          {isReplyOpen &&
            replyList.map((reply: commentType) => (
              <CommentItem
                videoId={videoId}
                comment={reply}
                setIsCommentUpdated={setIsReplyUpdated}
                key={reply.commentId}
                setCommentList={setReplyList}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CommentItem);
