import { userAtom } from '@/components/layouts/Header';
import Avatar from '@/components/ui/Avatar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Title from '@/components/ui/Title';
import { useAtomValue } from 'jotai';

export default function ProfileLayout() {
  const user = useAtomValue(userAtom);

  if (!user) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className='flex w-full h-60 items-center border-0 border-b-2 border-slate-300'>
        <div className='w-48'>
          <Avatar width='full' marginX={5} imgUrl={user.userProfileUrl} />
        </div>
        <div className='grow pl-4'>
          <Title text={user.loginId} />
          <div>{user.email}</div>
        </div>
      </div>
      <div>이름: {user.userName}</div>
    </>
  );
}
