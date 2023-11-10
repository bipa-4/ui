import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { BiSearch } from 'react-icons/bi';

type SearchInputProps = {
  path: string;
  setKeyword: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchItem: string;
};

export default function SearchInput({ path, setKeyword, searchItem }: SearchInputProps) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 기본 동작 방지
    const searchTerm = (e.target as HTMLFormElement).search.value;
    setKeyword(searchTerm);
    router.push(`/${path}?keyword=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <label className='relative block'>
        <span className='sr-only'>Search</span>
        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <BiSearch className='w-5 h-5 stroke-slate-200' />
        </span>
        <input
          type='text'
          name='search'
          placeholder={`${searchItem}`}
          className='input input-bordered w-full max-w-xs placeholder:text-slate-400 block  py-2 pl-9 pr-3 sm:text-sm '
        />
      </label>
    </form>
  );
}
