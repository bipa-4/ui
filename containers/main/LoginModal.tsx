import Image from 'next/image';

type Props = {
  kakaoLogin: () => void;
  googleLogin: () => void;
};

export default function Login({ kakaoLogin, googleLogin }: Props) {
  return (
    <div className='modal'>
      <div className='modal-box'>
        <h3 className='text-lg font-bold text-center pt-5'>StreamWave에 오신걸 환영합니다!</h3>
        <div className='py-10 text-center'>
          <div className='py-3'>소셜 계정으로 간편 로그인</div>
          <div className='flex mx-5 my-auto justify-center'>
            <div className='w-2/5'>
              <div className='h-11 w-full p-1 overflow-hidden cursor-pointer' onClick={kakaoLogin}>
                <Image
                  src='/images/kakao_login_large_narrow.png'
                  alt='kakao'
                  width={900}
                  height={900}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='h-11 w-full p-1 cursor-pointer' onClick={googleLogin}>
                <Image
                  src='/images/google_login.png'
                  alt='google'
                  width={900}
                  height={900}
                  className='w-full h-full object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <label className='modal-backdrop' htmlFor='my_modal_7'>
        Close
      </label>
    </div>
  );
}
