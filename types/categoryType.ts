import { VideoCardType } from './videoType';

export interface CategoryNameType {
  categoryNameId: number;
  categoryName: string;
}

export interface CategoryType extends CategoryNameType {
  categoryVideos: VideoCardType[];
}
