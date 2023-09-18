import Avatar from '../profile/avatar';
import { IoMdArrowDropdown } from 'react-icons/io';

/**
 * 댓글 컴포넌트입니다.
 */
export default function CommentItem() {
  return (
    <div className='flex mt-8 items-start'>
      <Avatar width={10} marginX={3} />
      <div>
        <div className='mb-2'>
          <span className='font-bold pr-3'>댓글 작성자</span>
          <span className='font-light'>2023.12.3</span>
        </div>
        <div className='w-4/5 mb-2'>
          댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글
          내용내용 ...댓글 내용내용 ...댓글 내용내용 댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용
          ...댓글 내용내용 ...댓글 내용내용 ......댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...
        </div>
        <div className='w-4/5 '>
          <span className='btn bg-transparent rounded-md btn-sm mr-4'>답글</span>
          <span className='text-sm text-secondary'>
            <IoMdArrowDropdown className='inline-block' />
            답글 3개
          </span>
        </div>
      </div>
    </div>
  );
}
