import userAtom from '@/atoms/atoms';
import fetcher from '@/utils/axiosFetcher';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Callback() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const authCode = router.asPath;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const auth = async () => {
      try {
        const authRes = await fetcher(BASE_URL + authCode);
        const userRes = await fetcher(`${BASE_URL}/account/check`);
        setUser(userRes);
        console.log('콜백 authRes !', authRes);
        console.log('콜백 userRes !', userRes);
      } catch (error) {
        console.log('error !', error);
      }
    };
    auth();
  }, []);

  useEffect(() => {
    if (user) {
      console.log('콜백페이지 전역 user 세팅!', user);
      console.log('메인으로');
      router.push('/');
    }
  }, [user]);

  return (
    <div className='h-screen flex items-center bg-base-100'>
      <div className='m-auto '>로그인 중..</div>
    </div>
  );
}
