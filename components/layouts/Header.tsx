import Image from 'next/image';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import LoginModal from '@/containers/main/LoginModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BiLogIn, BiSearch } from 'react-icons/bi';
import { useAtom } from 'jotai';
import { BsSun } from 'react-icons/bs';
import { LuMoonStar } from 'react-icons/lu';
import { useTheme } from 'next-themes';
import defaultUserImage from '@/public/images/user.png';
import { useTranslation } from 'next-i18next';
import userAtom from '@/atoms/user';
import customConfirmToast, { customWarningToast } from '@/utils/CustomToast';
import useMemberData from '@/hooks/useMemberData';

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('header');

  const { userData } = useMemberData();

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleKakaoLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_LOGIN_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    router.push(authUrl);
  };

  const handleGoogleLogin = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URI;
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;
    router.push(authUrl);
  };

  const handleLogout = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/account/logout`, {}, { withCredentials: true });
    if (res.status === 200) {
      setUser(null);
      customConfirmToast('로그아웃되었습니다.');
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = (e.target as HTMLFormElement).search.value;
    router.push(`/search?keyword=${searchTerm}`);
  };

  const handleTheme = () => {
    if (theme === 'dark') {
      setTheme('emerald');
      return;
    }
    setTheme('dark');
  };

  const handleLocaleChange = async (locale: string) => {
    await router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className='w-full'>
      <div className='navbar bg-base-100 justify-between shadow-md px-32 max-xl:px-2'>
        <div className='flex justify-start'>
          <div className='flex-none'>
            <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
              <input type='checkbox' id='my-drawer-3' className='hidden' />
              <FiMenu className='w-6 h-6 m-2 max-xl:m-1 max-xl:w-5 max-xl:h-5' />
            </label>
          </div>
          <button
            type='button'
            className='btn btn-ghost normal-case text-xl max-md:hidden'
            onClick={() => router.push('/')}
          >
            StreamWave
          </button>
        </div>
        <div className='grow justify-center mx-3 max-lg:mx-1 '>
          <form className='w-4/5 max-lg:w-full flex' onSubmit={handleSearch}>
            <div className='grow relative flex items-center justify-center w-full'>
              <input
                type='text'
                name='search'
                placeholder={t('searchVideo')}
                className='input input-bordered w-11/12 focus:outline-none pr-10 rounded-r-none'
              />
              <button type='submit' className='btn btn-secondary rounded-l-none px-3'>
                <BiSearch className='w-6 h-6 m-2 max-xl:w-4 max-xl:h-4 max-md:m-1' />
              </button>
            </div>
          </form>
        </div>

        <div className='flex justify-center'>
          <select
            className='select w-full max-w-xs focus:outline-none px-5 max-lg:hidden'
            defaultValue={router.locale}
            onChange={(e) => handleLocaleChange(e.target.value)}
          >
            <option value='en'>English</option>
            <option value='ko'>한국어</option>
          </select>
          <label className='swap swap-rotate rounded-full hover:bg-base-300 w-8 h-8 max-xl:mx-1 max-md:w-6 max-md:h-6 mx-2'>
            <input type='checkbox' onChange={handleTheme} />
            <BsSun className='swap-on w-6 h-6 max-xl:w-5 max-md:h-5 ' />
            <LuMoonStar className='swap-off w-6 h-6  max-xl:w-5 max-md:h-5' />
          </label>
          {user ? (
            <>
              <Link href='/upload'>
                <div className='btn bg-base-100 px-5 mx-2 max-xl:hidden'>upload</div>
              </Link>

              <div className='dropdown dropdown-end'>
                <button
                  type='button'
                  tabIndex={0}
                  className='btn btn-ghost btn-circle avatar border-none max-md:w-7 mx-2'
                >
                  <div className='w-10 rounded-full max-md:w-6'>
                    <Image
                      src={user.channelProfileUrl || defaultUserImage}
                      alt='profile'
                      width={200}
                      height={200}
                      onClick={toggleMenu}
                    />
                  </div>
                </button>
                {isMenuOpen && (
                  <ul className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-base-200'>
                    <li>
                      <Link href={`/channel/${user.channelId}`} onClick={toggleMenu}>
                        내 채널
                      </Link>
                    </li>
                    <li className='xl:hidden'>
                      <Link href='/upload' onClick={toggleMenu}>
                        업로드
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
            <div className='mx-3 cursor-pointer max-lg:mx-1'>
              <label htmlFor='my_modal_7' className='btn btn-outline btn-primary max-lg:hidden'>
                Login
              </label>
              <label htmlFor='my_modal_7' className='rounded-full hover:bg-base-300 w-8 h-8 lg:hidden'>
                <BiLogIn className='w-6 h-6' />
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
