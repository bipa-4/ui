import Image from 'next/image';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import LoginModal from '@/containers/main/LoginModal';
import crying from '../../public/images/crying.jpg';

export default function Header() {
  const isLogin = false;

  return (
    <div className='w-full'>
      <div className='navbar bg-base-100 justify-between shadow-sm px-40 max-xl:px-5'>
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
              <div className='btn bg-base-100 px-5'>upload</div>
              <div className='dropdown dropdown-end'>
                <button type='button' tabIndex={0} className='btn btn-ghost btn-circle avatar'>
                  <div className='w-10 rounded-full'>
                    <Image src={crying} alt='profile' width={200} height={200} />
                  </div>
                </button>
                <ul className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
                  <li>
                    <Link href='/' className='justify-between'>
                      프로필
                    </Link>
                  </li>
                  <li>
                    <Link href='/'>내 채널</Link>
                  </li>
                  <li>
                    <Link href='/'>로그아웃</Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <label htmlFor='my_modal_7' className='btn btn-outline btn-primary'>
                Login
              </label>

              <input type='checkbox' id='my_modal_7' className='modal-toggle' />
              <LoginModal />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
