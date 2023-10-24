import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className='footer p-10 bg-base-300 text-neutral-content px-36'>
      <aside>
        <Image src='/images/favicon-removebg-preview.png' alt='streamWave' width={100} height={100} />
        <p>
          (주)더존비즈온 채용형 교육
          <br />
          비트교육센터 3기 - 4조 SurfWave
        </p>
      </aside>
      <nav>
        <header className='footer-title'>About us</header>
        <Link href='https://github.com/bipa-4'>
          <AiFillGithub className='w-10 h-10' />
        </Link>
        <div className='grid grid-flow-col gap-4'></div>
      </nav>
    </footer>
  );
}
