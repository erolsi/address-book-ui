import React from 'react';
import MainContent from 'components/main-content/main-content';
import MainNavbar from 'components/main-navbar/main-navbar';

export default function MainLayout({ children }: { children: React.ReactChild }) {
  return (
    <>
      <MainNavbar />
      <MainContent>{children}</MainContent>
    </>
  );
}
