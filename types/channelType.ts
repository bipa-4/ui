import { VideoSummaryType } from './videoType';

export interface channelSummaryType {
  id: number;
  title: string;
  channelImgUrl: string;
  description: string;
}

export interface channelType extends channelSummaryType {
  orderedVideoList: Array<VideoSummaryType>;
}

export interface channelSummaryListType extends Array<channelSummaryType> {}
