import { userAtom } from '@/components/layouts/Header';
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
        setUser(userRes.data);
        console.log('authRes !', authRes);
        console.log('authRes !', userRes);
      } catch (error) {
        console.log('error !', error);
      }
    };
    auth();
  }, []);

  // const { userInfo, error } = useMemberData();

  useEffect(() => {
    console.log('user !', user);
    router.push('/');
  }, [user]);

  return (
    <div className='h-screen flex items-center'>
      <div className='m-auto '>로그인 중..</div>
    </div>
  );
}
