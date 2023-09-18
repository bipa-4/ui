import React from 'react';
import Avatar from '../profile/Avatar';

/**
 * 대댓글 컴포넌트입니다.
 */
function ReplyItem() {
  return (
    <div className='flex mt-8 items-start'>
      <Avatar width={10} marginX={3} />
      <div>
        <div className='mb-2'>
          <span className='font-bold pr-3'>댓글 작성자</span>
          <span className='font-light'>2023.12.3</span>
        </div>
        <div className='w-full mb-2 '>
          댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글
          내용내용 ...댓글 내용내용 ...댓글 내용내용 댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용
          ...댓글 내용내용 ...댓글 내용내용 ......댓글 내용내용 ...댓글 내용내용 ...댓글 내용내용 ...
        </div>
      </div>
    </div>
  );
}

export default React.memo(ReplyItem);
