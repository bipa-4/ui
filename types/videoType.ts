export default interface VideoType {
  id?: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  viewCount?: number;
  createDate?: string;
  isPublic: boolean;
}

export interface VideoCardType {
  id?: number;
  thumbnailUrl: string;
  title: string;
  channelImgUrl: string;
  channelName: string;
  viewCount?: number;
  createDate?: string;
}

export interface VideoDetailType extends VideoCardType {
  description: string;
  videoUrl: string;
  recommendedVideoList: Array<VideoCardType>;
}
