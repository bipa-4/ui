import { userInfoType } from '@/types/userType';
import { atom } from 'jotai';

const userAtom = atom<userInfoType | null>(null);

export default userAtom;
