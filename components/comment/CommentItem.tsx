import { useState } from 'react';
import Avatar from '../profile/avatar';
import { IoMdArrowDropdown } from 'react-icons/io';
import ReplyItem from './ReplyItem';

/**
 * 댓글 컴포넌트입니다.
 */
export default function CommentItem() {
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleReplyOpen = () => {
    setIsReplyOpen((prev) => !prev);
  };
  return (
    <div className='flex mt-8 items-start'>
      <Avatar width={10} marginX={3} />
      <div>
        <div className='mb-2'>
          <span className='font-bold pr-3'>댓글 작성자</span>
          <span className='font-light'>2023.12.3</span>
        </div>
        <div className='w-full mb-2'>
          <div className='pb-2 pr-6'>
            댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글
            내용내용 ...댓글 내용내용 ...댓글 내용내용 댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용
            ...댓글 내용내용 ...댓글 내용내용 ......댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...
          </div>
          <span className='btn bg-transparent rounded-md btn-sm mr-4 border-none'>답글</span>
          <span className='text-sm text-secondary cursor-pointer' onClick={handleReplyOpen}>
            <IoMdArrowDropdown className='inline-block' />
            답글 3개
          </span>
          {isReplyOpen && <ReplyItem />}
        </div>
      </div>
    </div>
  );
}
