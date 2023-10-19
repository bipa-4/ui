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
 * @returns 아바타 컴포넌트
 */
export default function Avatar({ width, marginX, imgUrl }: Props) {
  return (
    <div className={`avatar mx-${marginX} w-${width}`}>
      <div className={`w-full h-${width} rounded-full basis-${width}`}>
        <Image src={imgUrl || defaultUserImage} alt='cat' width={800} height={800} />
      </div>
    </div>
  );
}

Avatar.defaultProps = {
  nickname: '',
  imgUrl: defaultUserImage,
};
