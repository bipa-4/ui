import { useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/atoms/atoms';
import axios from 'axios';
import { set } from 'nprogress';
import Avatar from '../ui/Avatar';
import LoadingSpinner from '../ui/LoadingSpinner';

type commentPropsType = {
  videoId: string;
  commentType: 'parent' | 'child';
  groupIndex: string | null;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * 댓글 입력 컴포넌트입니다.
 */

export default function CommentInput({ videoId, commentType, groupIndex, setIsUpdated }: commentPropsType) {
  const user = useAtomValue(userAtom);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [commentInput, setCommentInput] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  // const router = useRouter();

  // 댓글 입력창 엔터에 따라 높이 조절
  const handleResizeHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textarea.current === null) return;
    textarea.current.style.height = 'auto';
    textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    setCommentInput(e.target.value);
  };

  const postCommentHandler = async () => {
    setIsPosting(true);
    if (commentType === 'parent') {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commentParent`,
          {
            'content': commentInput,
            'parentChild': 0,
            'videoId': videoId,
          },
          { withCredentials: true },
        );
        // if (res.status === 200) {
        //  alert('댓글이 등록되었습니다.');
        //  console.log(res);
        // } else {
        //  console.log(res.data);
        // }
        if (textarea.current) {
          textarea.current.value = '';
        }
      } catch (error) {
        alert(`댓글 등록에 실패했습니다 : ${error}`);
      }
      setIsUpdated(true);
      setIsPosting(false);
      return;
    }
    if (commentType === 'child') {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/commentChild?groupIndex=${groupIndex}`,
          {
            'content': commentInput,
            'parentChild': 1,
            'videoId': videoId,
          },
          { withCredentials: true },
        );
        if (res.status === 200) {
          alert('댓글이 등록되었습니다.');
        }
      } catch (error) {
        alert(`댓글 등록에 실패했습니다 : ${error}`);
      }
      setIsUpdated(true);
      setIsPosting(false);
    }
  };

  return (
    <>
      <div className='flex w-full py-3 items-center'>
        <Avatar width={10} marginX={3} imgUrl={user?.channelProfileUrl} />
        <div className='grow flex items-center'>
          <textarea
            rows={1}
            placeholder='댓글 입력'
            ref={textarea}
            onChange={handleResizeHeight}
            className='input input-bordered input-primary rounded-md w-full resize-none p-2 min-h-12 '
            disabled={!user}
          />
        </div>
        <button type='button' className='btn mx-3 btn-outline btn-primary min-h-12' onClick={postCommentHandler}>
          등록
        </button>
      </div>
      {isPosting && (
        <div className='flex items-center m-auto pt-5'>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}
