export default interface VideoType {
  id?: number;
  title: string;
  content: string;
  videoUrl: string;
  thumbnailUrl: string;
  viewCount?: number;
  createDate?: string;
  isPublic: boolean;
  category: string[];
}

export interface VideoCardType {
  channelName: string;
  channelProfileUrl: string;
  thumbnail: string;
  videoTitle: string;
  createAt: string;
  readCount: number;
  videoId: number;
}

export interface VideoDetailType extends VideoCardType {
  channelId: number;
  videoUrl: string;
  content: string;
  isLike: boolean | null;
  likeCount: number;
  recommendedList: VideoCardType[];
}
