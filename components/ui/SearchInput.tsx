import { BiSearch } from 'react-icons/bi';

export default function SearchInput() {
  return (
    <form>
      <label className='relative block'>
        <span className='sr-only'>Search</span>
        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
          <BiSearch className='w-5 h-5 stroke-slate-200' />
        </span>
        <input
          type='text'
          placeholder='검색'
          className='input input-bordered w-full max-w-xs placeholder:text-slate-400 block  py-2 pl-9 pr-3 sm:text-sm '
        />
      </label>
    </form>
  );
}
