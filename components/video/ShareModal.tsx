import { useEffect, useRef, useState } from 'react';
import { BsFillShareFill } from 'react-icons/bs';
import Image from 'next/image';
import useVideoData from '@/hooks/useVideoData';
import { useRouter } from 'next/router';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function ShareModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const { vid } = router.query;
  const { video } = useVideoData(vid?.toString());

  const currentPath = `https://bipa-streamwave.vercel.app${router.asPath}`; // 현재 경로 가져오기

  console.log(router);
  // 클립보드 복사 상태 관리
  const [isCopied, setIsCopied] = useState(false);

  // 클립보드에 경로 복사
  const copyPathToClipboard = () => {
    navigator.clipboard.writeText(currentPath).then(() => {
      setIsCopied(true);
    });
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_SHARE_API_KEY);
    }
  }, []);

  const shareKakao = () => {
    if (video) {
      window.Kakao.Share.sendCustom({
        templateId: 99049,
        templateArgs: {
          TITLE: video.videoTitle,
          THU: video.thumbnail,
          CONTENT: video.content,
          LIKE: 3,
          VID: vid,
          VIEW: video.readCnt,
        },
      });
    }
  };
  console.log(video);

  return (
    <>
      <div className='btn bg-slate-100 rounded-full mx-3' onClick={() => modalRef.current?.showModal()}>
        <BsFillShareFill />
      </div>
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>공유하기</h3>
          <div className=' my-3'>
            <div className='tooltip tooltip-open tooltip-right' data-tip='카카오로 편리하게 공유하기'>
              <Image
                src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
                alt='카카오톡 공유 보내기 버튼'
                width={40}
                height={40}
                className='cursor-pointer'
                onClick={shareKakao}
              />
            </div>
          </div>

          <div className='flex items-center border-b-2 w-11/12 '>
            <div className='flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap'>{currentPath}</div>
            <div className='tooltip' data-tip={isCopied ? 'copied!' : 'click to copy'}>
              <div
                onClick={copyPathToClipboard}
                className='btn btn-sm px-2 py-1 rounded-md'
                onMouseEnter={() => setIsCopied(false)}
              >
                복사
              </div>
            </div>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button type='submit'>close</button>
        </form>
      </dialog>
    </>
  );
}
