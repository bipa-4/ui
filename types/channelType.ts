export interface channelSummaryType {
  id: number;
  title: string;
  imgUrl: string;
  description: string;
}

export interface channelSummaryListType extends Array<channelSummaryType> {}
