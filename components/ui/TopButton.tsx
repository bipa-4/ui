import React, { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    showButton && (
      <div className='fixed right-8 bottom-5 z-10'>
        <button type='button' onClick={scrollToTop} className='btn btn-circle'>
          <IoIosArrowUp className='w-5 h-5' />
        </button>
      </div>
    )
  );
}
