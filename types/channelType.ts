import { VideoCardType } from './videoType';

export interface ChannelSummaryType {
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
  updateFlag: boolean;
}
