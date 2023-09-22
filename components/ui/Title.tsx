type TitleProps = {
  text: string;
};

export default function Title({ text }: TitleProps) {
  return <h1 className='text-xl font-bold w-auto max-lg:text-lg'>{text}</h1>;
}
