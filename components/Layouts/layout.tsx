import React, { ReactNode } from 'react';
import Drawer from './Drawer';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Drawer>{children}</Drawer>
  );
}
