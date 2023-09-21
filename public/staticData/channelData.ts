import { channelSummaryListType, channelType } from '@/types/channelType';

const channelDataList: channelSummaryListType = [
  {
    id: 1,
    channelImgUrl: '/images/crying.jpg',
    title: '떼껄룩',
    description: '채널임다',
  },
  {
    id: 2,
    channelImgUrl: '/images/crying.jpg',
    title: '웅양',
    description: '항상배고픔',
  },
  {
    id: 3,
    channelImgUrl: '/images/crying.jpg',
    title: 'ㅋㅋ',
    description: '내가3등',
  },
  {
    id: 4,
    channelImgUrl: '/images/crying.jpg',
    title: 'EsLint',
    description: '린트가 최고다',
  },
  {
    id: 5,
    channelImgUrl: '/images/crying.jpg',
    title: 'copilot',
    description: '갓파일럿이다',
  },
];

export const channelData: channelType = {
  id: 1,
  title: '샘플 채널입니다..',
  channelImgUrl: '/images/crying.jpg',
  description: '샘플 채널입니다.',
  orderedVideoList: [],
};

export default channelDataList;
