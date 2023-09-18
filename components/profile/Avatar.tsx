import Image from 'next/image';
import crying from '../../public/images/crying.jpg';

type Props = {
  width: number;
  marginX: number;
  imageUrl?: string;
  nickname?: string;
};

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
