import React, { ReactNode } from 'react';
import DaisyHeader from './DaisyHeader';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <DaisyHeader />
      <button className="btn btn-primary">One</button>
      <button className="btn btn-secondary">Two</button>
      <button className="btn btn-accent btn-outline">Three</button>
      <div>{children}</div>
    </>
  );
}
