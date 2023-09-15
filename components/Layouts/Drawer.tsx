import React, { ReactNode } from 'react';
import Link from 'next/link';
import Footer from './Footer';
import Header from './header';

type LayoutProps = {
  children: ReactNode;
};

export default function Drawer({ children }: LayoutProps) {
  return (
    <div className='drawer'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        <Header />
        {children}
        <Footer />
      </div>
      <div className='drawer-side '>
        <label htmlFor='my-drawer-3' className='drawer-overlay' />
        <ul className='menu p-4 w-80 min-h-full bg-base-200 pt-28'>
          <li>
            <Link href='/' className='text-base'>
              홈
            </Link>
          </li>
          <li>
            <Link href='/' className='text-base'>
              채널
            </Link>
          </li>
          <li className='collapse bg-base-200 transition-none'>
            <input type='checkbox' />
            <div className='collapse-title text-base font-bold w-56'>카테고리</div>
            <ul className='menu collapse-content bg-base-200 w-56 rounded-box '>
              <li>
                <Link href='/'>교육</Link>
              </li>
              <li>
                <Link href='/'>시사/정치</Link>
              </li>
              <li>
                <Link href='/'>라이프스타일</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
