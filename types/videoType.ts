export type VideoItemType = {
  id: number;
  thumbnailUrl: string;
  title?: string;
  channelImg?: string;
  channelName?: string;
  view_count?: number;
  upload_date?: string;
};
export type VideoListType = {
  title?: string;
  videoList: Array<VideoItemType>;
};
