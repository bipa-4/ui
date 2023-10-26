import { useTranslation } from 'next-i18next';
import Image from 'next/image';

type Props = {
  kakaoLogin: () => void;
  googleLogin: () => void;
};

export default function Login({ kakaoLogin, googleLogin }: Props) {
  const { t } = useTranslation('header');

  return (
    <div className='modal  bg-base-100'>
      <div className='modal-box'>
        <h3 className='text-lg font-bold text-center pt-5'>{t('welcome')}</h3>
        <div className='py-10 text-center'>
          <div className='py-3'>{t('loginComment')}</div>
          <div className='w-2/5 m-auto'>
            <Image
              src='/images/kakao_login_large_narrow.png'
              alt='kakao'
              width={200}
              height={100}
              className='w-full pb-2 cursor-pointer'
              onClick={kakaoLogin}
            />
            <Image
              src='/images/google_login.png'
              alt='google'
              width={200}
              height={100}
              className='w-full cursor-pointer'
              onClick={googleLogin}
            />
          </div>
        </div>
      </div>
      <label className='modal-backdrop' htmlFor='my_modal_7'>
        Close
      </label>
    </div>
  );
}
