import Image from 'next/image';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import LoginModal from '@/containers/main/LoginModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import crying from '@/public/images/crying.jpg';
import { atom, useAtom } from 'jotai';

type userHeader = {
  accountId: number;
  email: string;
  joinDate: number;
  loginId: string;
  loginType: string;
  name: string;
  profileUrl: string;
};

export const userAtom = atom(false);

export default function Header() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useAtom(userAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<userHeader>({
    accountId: 0,
    email: '',
    joinDate: 0,
    loginId: '',
    loginType: '',
    name: '',
    profileUrl: '',
  });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleKakaoLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_LOGIN_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const authUrl = ` https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    router.push(authUrl);
  };

  const handleGoogleLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URI;
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
    router.push(authUrl);
  };

  const handleLogout = () => {
    setIsLogin(false);
    alert('로그아웃되었습니다.');
  };

  console.log('헤더에서 조회 - 로그인여부', isLogin);
  console.log(user);

  useEffect(() => {
    if (isLogin) {
      const checkLogin = async () => {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await axios
          .get(`${BASE_URL}/account/check`, {
            withCredentials: true,
          })
          .catch((err) => console.log(err));
        console.log('유저정보: ', res);
        setUser(res?.data);
      };
      checkLogin();
    }
  }, [isLogin]);

  return (
    <div className='w-full'>
      <div className='navbar bg-base-100 justify-between shadow-md px-40 max-xl:px-5'>
        <div className='flex justify-start w-1/5'>
          <div className='flex-none'>
            <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
              <input type='checkbox' id='my-drawer-3' className='hidden' />
              <FiMenu className='w-6 h-6 m-2' />
            </label>
          </div>
          <Link href='/' className='btn btn-ghost normal-case text-xl'>
            StreamWave
          </Link>
        </div>
        <div className='grow w-3/5'>
          <div className='form-control grow'>
            <input
              type='text'
              placeholder='Search'
              className=' placeholder:italic input input-bordered md:w-4/5 m-auto max-xl:hidden'
            />
          </div>
        </div>
        <div className='flex justify-end w-1/5'>
          {isLogin ? (
            <>
              <Link href='/upload'>
                <div className='btn bg-base-100 px-5 mx-5'>upload</div>
              </Link>
              <div className='dropdown dropdown-end'>
                <button type='button' tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                  <div className='w-10 rounded-full'>
                    <Image src={crying} alt='profile' width={200} height={200} onClick={toggleMenu} />
                  </div>
                </button>
                {isMenuOpen && (
                  <ul className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
                    <li>
                      <Link href='/' className='justify-between' onClick={toggleMenu}>
                        프로필
                      </Link>
                    </li>
                    <li>
                      <Link href='/channel/1' onClick={toggleMenu}>
                        내 채널
                      </Link>
                    </li>
                    <li>
                      <Link href='/' onClick={handleLogout}>
                        로그아웃
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <div>
              <label htmlFor='my_modal_7' className='btn btn-outline btn-primary'>
                Login
              </label>
              <input type='checkbox' id='my_modal_7' className='modal-toggle' />
              <LoginModal kakaoLogin={handleKakaoLogin} googleLogin={handleGoogleLogin} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
