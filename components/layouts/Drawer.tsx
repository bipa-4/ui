import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import useCategoryList from '@/hooks/useCategoryList';
import Footer from './Footer';
import Header from './Header';
import { useTranslation } from 'next-i18next';

type LayoutProps = {
  children: ReactNode;
};

export default function Drawer({ children }: LayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { categoryList } = useCategoryList();
  const { t } = useTranslation('common');

  const menu = [
    {
      id: 1,
      name: t('sidebar.home'),
      link: '/',
    },
    {
      id: 2,
      name: t('sidebar.channels'),
      link: '/channels',
    },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className='drawer'>
      <input
        id='my-drawer-3'
        type='checkbox'
        className='drawer-toggle'
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className='drawer-content flex flex-col'>
        <Header />
        {children}
        <Footer />
      </div>
      <div className='drawer-side'>
        <label htmlFor='my-drawer-3' className='drawer-overlay' />
        <ul className='menu p-4 w-80 min-h-full bg-base-200 pt-28'>
          {menu.map((item) => (
            <li key={item.id}>
              <Link href={item.link} className='text-xl py-3' onClick={toggleDrawer}>
                {item.name}
              </Link>
            </li>
          ))}
          <li className='collapse bg-base-200 transition-none'>
            <input type='checkbox' />
            <div className='collapse-title text-xl py-3 w-56'>{t('sidebar.categories')}</div>
            <ul className='menu collapse-content bg-base-200 w-56 rounded-box '>
              {categoryList?.map((item, idx) => (
                <li key={item.categoryNameId || idx}>
                  <Link href={`/category/${item.categoryNameId}`} onClick={toggleDrawer}>
                    {item.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
