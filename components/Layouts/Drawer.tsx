import React, { ReactNode } from 'react';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

export default function Drawer({ children }: LayoutProps) {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Header />
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 pt-28">
          {/* Sidebar content here */}
          <li>
            <a>홈</a>
          </li>
          <li>
            <a>채널</a>
          </li>
          <li>
            <a>카테고리</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
