import { VideoCardType } from './videoType';

export interface ChannelSummaryType {
  ranking?: number;
  channelId: number;
  channelName: string;
  content: string;
  profileUrl: string;
}

export interface ChannelType extends ChannelSummaryType {
  orderedVideoList: Array<VideoCardType>;
}

export interface ChannelDetailType extends ChannelSummaryType {
  privateType: boolean;
}

export interface ChannelUpdateType {
  channelName: string;
  content: string;
  privateType: boolean;
  profileUrl: string;
}
