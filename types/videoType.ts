export default interface VideoType {
  id?: string;
  title: string;
  content: string;
  videoUrl: string;
  thumbnailUrl: string;
  viewCount?: number;
  createDate?: string;
  privateType: boolean;
  category: string[];
}

export interface VideoCardType {
  channelName: string;
  channelProfileUrl: string;
  thumbnail: string;
  videoTitle: string;
  createAt: string;
  readCount: number;
  videoId: string;
  privateType: boolean;
  channelId?: string;
}

export interface VideoDetailType extends VideoCardType {
  channelId: string;
  videoUrl: string;
  content: string;
  likeCount: number;
  updateAt: string;
  categoryId: string[];
  recommendedList: VideoCardType[];
}
