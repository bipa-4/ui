type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return <div className='my-6 text-xl font-bold w-full max-lg:text-lg'>{text}</div>;
}
