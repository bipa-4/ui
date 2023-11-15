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
import CommentDropDown from './CommentDropDown';

type commentPropsType = {
  videoId: string;
  uploader: string;
  comment: commentType;
  setIsCommentUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  commentLevel: 'parent' | 'child';
};

/**
 * 댓글 컴포넌트입니다.
 * Todo: 렌더링 최적화
 */
function CommentItem({ videoId, uploader, comment, setIsCommentUpdated, commentLevel }: commentPropsType) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [writeChildReply, setWriteChildReply] = useState(false);
  const user = useAtomValue(userAtom);
  const [isEditing, setIsEditing] = useState(false);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [editedComment, setEditedComment] = useState(comment.content);
  const [isReplyUpdated, setIsReplyUpdated] = useState(false);
  const [replyList, setReplyList] = useState<commentType[]>([]);
  const [childCount, setChildCount] = useState(comment.childCount);
  const router = useRouter();
  const { t, i18n } = useTranslation('videoDetail');
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
      setIsEditing(false);
    }
  };

  const pinComment = async () => {
    // alert('고정(추후 구현 예정)');
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${videoId}/comment-pick`,
      {
        'commentId': comment.commentId,
        'isPicked': true,
      },
      {
        withCredentials: true,
      },
    );
    if (res.status === 200) {
      alert('고정되었습니다.');
      setIsCommentUpdated(true);
    }
  };

  const unPinComment = async () => {
    // alert('고정 해제(추후 구현 예정)');
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/${videoId}/comment-pick/${comment.commentId}`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      alert('고정 해제 되었습니다.');
      setIsCommentUpdated(true);
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
    <div className='flex items-start pt-4'>
      <div onClick={() => moveToChannel} className='cursor-pointer'>
        <Avatar width={10} marginX={3} imgUrl={comment.channelProfileUrl} />
      </div>
      <div className='grow'>
        <div className='opacity-80 text-sm font-light pt-1'>
          {comment.isPicked ? `📌 ${t('comment.isPicked')}` : ''}
        </div>
        <div className='h-10 flex items-center justify-between mr-4'>
          <div>
            <span className='font-bold pr-3 cursor-pointer' onClick={moveToChannel}>
              {comment.channelName}
            </span>
            <span className='font-light text-sm pr-3'>{dayjs(comment.createAt).fromNow()}</span>
            <span className='opacity-60 text-sm font-light'>
              {comment.isUpdated ? `(${t('comment.isEdited')})` : ''}
            </span>
          </div>
          {user && (
            <CommentDropDown
              commentLevel={commentLevel}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isPicked={comment.isPicked}
              deleteComment={deleteComment}
              isChannelOwner={uploader === user?.channelId}
              isCommentWriter={comment.channelId === user?.channelId}
              pinComment={pinComment}
              unpinComment={unPinComment}
            />
          )}
        </div>
        <div className='w-full mb-2'>
          {isEditing ? (
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
              <div className='btn btn-ghost min-h-12 border-neutral-content' onClick={() => setIsEditing(false)}>
                {t('cancel')}
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
                uploader={uploader}
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
