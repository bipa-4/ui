import Image from 'next/image';
import crying from '../../public/images/crying.jpg';

type Props = {
  width: number;
  marginX: number;
  nickname?: string;
};

/**
 * 프로필 사진을 원형으로 표시하는데 사용되는 컴포넌트입니다.
 * @param {number} width  이미지 너비
 * @param {number} marginX 이미지와 닉네임 사이의 간격
 * @param {string} imageUrl 이미지 주소
 * @param {string} nickname 닉네임
 * @returns 아바타 컴포넌트
 */
export default function Avatar({ width, marginX, nickname }: Props) {
  return (
    <div className={`avatar items-center mx-${marginX} basis-10`}>
      <div className={`w-${width} h-${width} rounded-full`}>
        <Image src={crying} alt='cat' width={200} height={200} />
      </div>
      {nickname && <p className='px-2'>{nickname}</p>}
    </div>
  );
}

Avatar.defaultProps = {
  nickname: '',
};
