export interface VideoSummaryType {
  id: number;
  thumbnailUrl: string;
  title: string;
  channelImgUrl: string;
  channelName: string;
  viewCount: number;
  createDate: string;
}

export interface VideoItemType extends VideoSummaryType {
  description: string;
  videoUrl: string;
  recommendedVideoList: Array<VideoSummaryType>;
}

export type VideoSummaryListType = {
  title?: string;
  videoList: Array<VideoSummaryType>;
};
