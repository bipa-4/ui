import { useEffect, useRef } from 'react';
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
    <div className='btn bg-slate-100 rounded-full mx-3' onClick={() => modalRef.current?.showModal()}>
      <BsFillShareFill />
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>공유하기</h3>
          <div onClick={shareKakao}>
            <Image
              src='https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png'
              alt='카카오톡 공유 보내기 버튼'
              width={30}
              height={30}
            />
          </div>

          <p className='py-4'>Press ESC key or click outside to close</p>
        </div>
      </dialog>
    </div>
  );
}
