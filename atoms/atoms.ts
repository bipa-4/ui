import { userInfoType } from '@/types/userType';
import { atom } from 'jotai';

export const userAtom = atom<userInfoType | null>(null);
