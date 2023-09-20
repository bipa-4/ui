export type VideoItemType = {
  id: number;
  thumbnailUrl: string;
  title: string;
  channelImg: string;
  channelName: string;
  viewCount?: number;
  uploadDate?: string;
};
export type VideoListType = {
  title?: string;
  videoList: Array<VideoItemType>;
};
