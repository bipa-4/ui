import Title from '../text/Title';
import Image from 'next/image';
import crying from '../../public/images/crying.jpg';

export default function CommentInput() {
  return (
    <div className='w-3/4 mx-1 my-5 max-2xl:w-full'>
      <div className='mx-1 my-2'>
        <Title text={'댓글'} />
      </div>
      <div className='flex w-full'>
        <div className='avatar items-center mx-2 basis-10'>
          <div className='w-10 rounded-full'>
            <Image src={crying} alt='cat' width={200} height={200} />
          </div>
        </div>
        <div className='grow'>
          <input type='text' placeholder='댓글 입력' className='input input-bordered input-primary rounded-md w-full' />
        </div>
        <button className='btn mx-3 btn-outline btn-primary'>등록</button>
      </div>
    </div>
  );
}
