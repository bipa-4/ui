import { VideoCardType } from './videoType';

export interface CategoryNameType {
  categoryNameId: string;
  categoryName: string;
}

export interface CategoryType extends CategoryNameType {
  nextUUID: string;
  videos: VideoCardType[];
}
