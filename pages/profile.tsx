import { userAtom } from '@/components/layouts/Header';
import Avatar from '@/components/ui/Avatar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Title from '@/components/ui/Title';
import { useAtomValue } from 'jotai';

export default function profile() {
  const user = useAtomValue(userAtom);

  if (!user) {
    return (
      <div className='mx-44 max-xl:mx-7 min-h-screen flex justify-center items-center'>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className='mx-44 max-xl:mx-7 min-h-screen'>
      <div className='flex w-full h-60 items-center border-0 border-b-2 border-slate-300'>
        <div className='w-48'>
          <Avatar width='full' marginX={5} imgUrl={user.profileUrl} />
        </div>
        <div className='grow pl-4'>
          <Title text={user.loginId} />
          <div>{user.email}</div>
        </div>
      </div>
      <div>이름: {user.name}</div>
    </div>
  );
}
