type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return <div className='text-xl font-bold w-auto max-lg:text-lg'>{text}</div>;
}
