import { userAtom } from '@/components/layouts/Header';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

axios.defaults.withCredentials = true;
export default function Callback() {
  const router = useRouter();
  const setLogin = useSetAtom(userAtom);
  const authCode = router.asPath; // auth/kakao/callback?code=xxxxx
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const auth = async () => {
      const res = await axios.get(BASE_URL + authCode);
      console.log('콜백 페이지 응답 !', res);
      setLogin(true);
    };
    auth();
    router.push('/');
  }, []);

  return (
    <div className='h-screen flex items-center'>
      <div className='m-auto '>로그인 중..</div>
    </div>
  );
}
