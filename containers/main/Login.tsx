import Image from 'next/image';

export default function Login() {
  return (
    <div className='modal'>
      <div className='modal-box'>
        <h3 className='text-lg font-bold text-center pt-5'>StreamWave에 오신걸 환영합니다!</h3>
        <div className='py-10 text-center'>
          <div className='py-3'>소셜 계정으로 간편 로그인</div>
          <div className='w-2/3 flex m-auto justify-center'>
            <div>
              <div className='h-11 w-full p-1 overflow-hidden'>
                <Image
                  src='/images/kakao_login_large_narrow.png'
                  alt='kakao'
                  width={900}
                  height={900}
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='h-11 w-full p-1'>
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
