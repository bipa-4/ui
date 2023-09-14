type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return <div className='my-6 text-lg font-bold w-full'>{text}</div>;
}
