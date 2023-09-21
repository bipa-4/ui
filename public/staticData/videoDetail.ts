import { VideoItemType } from '@/types/videoType';

const videoItem: VideoItemType = {
  id: 1,
  thumbnailUrl: '/images/crying.jpg',
  title: '떼껄룩',
  channelImgUrl: '/images/crying.jpg',
  channelName: '채널임다',
  viewCount: 100,
  createDate: '2021-08-24',
  description: '채널임다',
  videoUrl: 'https://www.youtube.com/embed/7C2z4GqqS5E',
  recommendedVideoList: [
    {
      id: 1,
      thumbnailUrl: '/images/crying.jpg',
      title: '떼껄룩',
      channelImgUrl: '/images/crying.jpg',
      channelName: '채널임다',
      viewCount: 100,
      createDate: '2021-08-24',
    },
    {
      id: 2,
      thumbnailUrl: '/images/crying.jpg',
      title: '떼껄룩',
      channelImgUrl: '/images/crying.jpg',
      channelName: '채널임다',
      viewCount: 100,
      createDate: '2021-08-24',
    },
  ],
};

export default videoItem;
