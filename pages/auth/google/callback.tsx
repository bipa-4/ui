import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

axios.defaults.withCredentials = true;
export default function Callback() {
  const router = useRouter();
  const authCode = router.asPath; // auth/kakao/callback?code=xxxxx
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    axios
      .get(BASE_URL + authCode)
      .then((res) => {
        console.log('응답 !', res);
        router.push('/');
      })
      .catch((err) => {
        console.log('에러 발생 ! ! !', err);
      });
  }, []);

  return (
    <div className='h-screen flex items-center'>
      <div className='m-auto '>로그인 중..</div>
    </div>
  );
}
