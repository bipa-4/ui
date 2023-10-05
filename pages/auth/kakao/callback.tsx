import { userAtom } from '@/components/layouts/Header';
import axios from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Callback() {
  const router = useRouter();
  const setUser = useSetAtom(userAtom);
  const authCode = router.asPath;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const auth = async () => {
      const res = await axios.get(BASE_URL + authCode, { withCredentials: true });
      console.log('콜백 페이지 응답 !', res);
      setUser(res.data);
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
