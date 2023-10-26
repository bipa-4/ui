import React, { useEffect, useRef, useState } from 'react';
import userAtom from '@/atoms/user';
import { IoMdArrowDropdown } from 'react-icons/io';
import { commentType } from '@/types/commentType';
import { useAtomValue } from 'jotai';
import axios from 'axios';
import fetcher from '@/utils/axiosFetcher';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Avatar from '../ui/Avatar';
import CommentInput from './CommentInput';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';

type commentPropsType = {
  videoId: string;
  comment: commentType;
  setIsCommentUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  commentLevel: 'parent' | 'child';
};

/**
 * 댓글 컴포넌트입니다.
 * Todo: 렌더링 최적화
 */
function CommentItem({ videoId, comment, setIsCommentUpdated, commentLevel }: commentPropsType) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [writeChildReply, setWriteChildReply] = useState(false);
  const user = useAtomValue(userAtom);
  const [isEdit, setIsEdit] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [isReplyUpdated, setIsReplyUpdated] = useState(false);
  const [replyList, setReplyList] = useState<commentType[]>([]);
  const [childCount, setChildCount] = useState(comment.childCount);
  const router = useRouter();
  const { t, i18n } = useTranslation('videoDetail');
  const isUpdated = t('comment.isUpdated');
  dayjs.extend(relativeTime);
  dayjs.locale(i18n.language);

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
    setChildCount(res.length);
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
    if (commentLevel === 'parent') {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${videoId}/commentParent/${comment.commentId}`,
          {
            withCredentials: true,
          },
        );
        if (res.status === 200) {
          alert('삭제되었습니다.');
          setIsCommentUpdated(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (commentLevel === 'child') {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${videoId}/commentChild/${comment.commentId}`,
          {
            withCredentials: true,
          },
        );
        if (res.status === 200) {
          alert('삭제되었습니다.');
          setIsCommentUpdated(true);
        }
      } catch (error) {
        console.log(error);
      }
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
    const applyUpdatedComment = async () => {
      if (isReplyUpdated) {
        await getReplies();
        setIsReplyUpdated(false);
      }
    };
    applyUpdatedComment();
  }, [isReplyUpdated]);

  const moveToChannel = () => {
    router.push(`/channel/${comment.channelId}`);
  };

  return (
    <div className='flex mt-8 items-start'>
      <div onClick={() => console.log(comment.isUpdated)} className='cursor-pointer'>
        <Avatar width={10} marginX={3} imgUrl={comment.channelProfileUrl} />
      </div>
      <div className='grow'>
        <div className='h-10 flex items-center justify-between mr-4'>
          <div>
            <span className='font-bold pr-3 cursor-pointer' onClick={moveToChannel}>
              {comment.channelName}
            </span>
            <span className='font-light text-sm pr-3'>{dayjs(comment.createAt).fromNow()}</span>
            <span className='opacity-60 text-sm font-light'>{comment.isUpdated === 'true' ? isUpdated : ''}</span>
            {/* <span>gIdx: {comment.groupIndex}</span> */}
          </div>

          {!isEdit && user?.channelId === comment.channelId && (
            <div>
              <span className='pr-3 text-blue-500 cursor-pointer text-sm' onClick={() => setIsEdit(true)}>
                {t('modify')}
              </span>
              <span className='text-red-500 cursor-pointer text-sm' onClick={deleteComment}>
                {t('delete')}
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
                {t('modify')}
              </div>
              <div className='btn btn-ghost min-h-12 border-neutral-content' onClick={() => setIsEdit(false)}>
                {t('delete')}
              </div>
            </div>
          ) : (
            <div className='whitespace-pre-line pb-2 pr-6'>{comment.content}</div>
          )}
          {commentLevel === 'parent' && (
            <>
              <span className='btn bg-transparent rounded-md btn-sm mr-4 border-none' onClick={handleWrite}>
                {t('comment.reply')}
              </span>
              {childCount !== 0 && (
                <span className='text-sm text-secondary cursor-pointer' onClick={handleReplyOpen}>
                  <IoMdArrowDropdown className='inline-block' />
                  답글 {childCount}개
                </span>
              )}
            </>
          )}

          {writeChildReply && (
            <CommentInput
              videoId={videoId}
              commentLevel='child'
              groupIndex={comment.groupIndex}
              setIsUpdated={setIsReplyUpdated}
              setWriteChildReply={setWriteChildReply}
            />
          )}
          {isReplyOpen &&
            replyList.map((reply: commentType) => (
              <CommentItem
                videoId={videoId}
                comment={reply}
                setIsCommentUpdated={setIsReplyUpdated}
                key={reply.commentId}
                commentLevel='child'
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CommentItem);
