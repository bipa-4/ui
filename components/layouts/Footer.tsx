import React from 'react';
import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import { useTranslation } from 'next-i18next';

export default function Footer() {
  const { t } = useTranslation('footer');

  const handleGithubClick = () => {
    window.location.href = 'https://github.com/bipa-4';
  };

  return (
    <footer className='footer p-10 bg-base-300 text-neutral-content px-36'>
      <aside>
        <Image src='/images/favicon-removebg-preview.png' alt='streamWave' width={100} height={100} />
        <p>
          {t('organization')}
          <br />
          {t('team')}
        </p>
      </aside>
      <nav>
        <header className='footer-title'>About us</header>
        <div className='grid grid-flow-col gap-4 cursor-pointer' onClick={handleGithubClick}>
          <AiFillGithub className='w-10 h-10' />
        </div>
      </nav>
    </footer>
  );
}
