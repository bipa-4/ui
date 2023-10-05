import { ChannelSummaryType, ChannelType } from '@/types/channelType';

const channelDataList: ChannelSummaryType[] = [
  {
    channelId: 1,
    profileUrl: '/images/crying.jpg',
    channelName: '떼껄룩',
    content: '채널임다',
  },
  {
    channelId: 2,
    profileUrl: '/images/crying.jpg',
    channelName: '웅양',
    content: '항상배고픔',
  },
  {
    channelId: 3,
    profileUrl: '/images/crying.jpg',
    channelName: 'ㅋㅋ',
    content: '내가3등',
  },
  {
    channelId: 4,
    profileUrl: '/images/crying.jpg',
    channelName: 'EsLint',
    content: '린트가 최고다',
  },
  {
    channelId: 5,
    profileUrl: '/images/crying.jpg',
    channelName: 'copilot',
    content: '갓파일럿이다',
  },
];

export const channelData: ChannelType = {
  channelId: 1,
  channelName: '샘플 채널입니다..',
  profileUrl: '/images/crying.jpg',
  content: '샘플 채널입니다.',
  orderedVideoList: [],
};

export default channelDataList;
