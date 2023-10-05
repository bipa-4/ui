export default interface VideoType {
  id?: number;
  title: string;
  content: string;
  videoUrl: string;
  thumbnailUrl: string;
  viewCount?: number;
  createDate?: string;
  isPublic: boolean;
  category: number;
}

export interface VideoCardType {
  videoId?: number;
  thumbnail: string;
  videoTitle: string;
  channelProfileUrl: string;
  channelName: string;
  readCnt: number;
  createAt: string;
}

export interface VideoDetailType extends VideoCardType {
  content: string;
  videoUrl: string;
  recommendedList: Array<VideoCardType>;
}
