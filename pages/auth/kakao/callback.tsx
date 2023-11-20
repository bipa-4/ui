import userAtom from '@/atoms/user';
import fetcher from '@/utils/axiosFetcher';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps = async (context: GetServerSidePropsContext) => ({
  props: {
    ...(await serverSideTranslations(context.locale ?? 'ko', ['footer', 'common', 'header'])),
  },
});

export default function Callback() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const authCode = router.asPath;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const auth = async () => {
      try {
        await fetcher(BASE_URL + authCode);
        const userRes = await fetcher(`${BASE_URL}/account/check`);
        setUser(userRes);
      } catch (error) {
        console.log('error !', error);
      }
    };
    auth();
  }, []);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      router.push('/');
    }
  }, [user]);

  return (
    <div className='h-screen flex items-center bg-base-100'>
      <div className='m-auto '>로그인 중..</div>
    </div>
  );
}
