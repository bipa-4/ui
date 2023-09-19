import Link from 'next/link';

type CategoryLayoutProps = {
  children: React.ReactNode;
  category: '교육' | '시사' | '라이프스타일';
};

export default function CategoryLayout({ children, category }: CategoryLayoutProps) {
  const categories: Record<string, string> = {
    교육: 'education',
    시사: 'politics',
    라이프스타일: 'lifestyle',
  };

  return (
    <div className='mx-40 max-xl:mx-10'>
      <div className='flex text-lg border-0 border-b border-slate-300'>
        {Object.keys(categories).map((item) => (
          <Link href={`/category/${categories[item]}`} key={categories[item]}>
            <div
              className={`rounded-md mr-2 mt-3 px-5 py-3 hover:bg-slate-200 font-${
                category === item ? 'bold' : 'medium'
              }`}
            >
              {item}
            </div>
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}
