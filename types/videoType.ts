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
  videoId?: number;
  thumbnail: string;
  videoTitle: string;
  channelProfileUrl: string;
  channelName: string;
  readCnt?: number;
  createAt?: string;
}

export interface VideoDetailType extends VideoCardType {
  description: string;
  videoUrl: string;
  recommendedVideoList: Array<VideoCardType>;
}
