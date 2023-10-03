import Image from 'next/image';
import defaultUserImage from '@/public/images/user.png';

type Props = {
  width: number | 'full';
  marginX: number;
  nickname?: string;
  imgUrl?: string;
};

/**
 * 프로필 사진을 원형으로 표시하는데 사용되는 컴포넌트입니다.
 * @param {number | 'full'} width  이미지 너비
 * @param {number} marginX 이미지와 닉네임 사이의 간격
 * @param {string} imageUrl 이미지 주소
 * @param {string} nickname 닉네임
 * @returns 아바타 컴포넌트
 */
export default function Avatar({ width, marginX, nickname, imgUrl }: Props) {
  return (
    <div className='flex'>
      <div className={`avatar items-center mx-${marginX}`}>
        <div className={`w-${width} h-${width} rounded-full basis-${width}`}>
          <Image src={imgUrl || defaultUserImage} alt='cat' width={500} height={500} />
        </div>
      </div>
      <p className='w-4/5 px-1 line-clamp-1'>{nickname && nickname}</p>
    </div>
  );
}

Avatar.defaultProps = {
  nickname: '',
  imgUrl: defaultUserImage,
};
