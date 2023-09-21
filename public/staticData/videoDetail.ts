import { VideoItemType } from '@/types/videoType';

const videoItem: VideoItemType = {
  id: 1,
  thumbnailUrl: '/images/crying.jpg',
  title: '현명하게 추석을 보내는 방법',
  channelImgUrl: '/images/crying.jpg',
  channelName: '채널이름뭐로하지',
  viewCount: 100,
  createDate: '2021-08-24',
  description:
    '추석을 현명하게 보내는 방법을 알려드립니다. 여러가지 방법이 있을겁니다. 아무래도 최고는 집밖에 안나가는거겠죠? 그럼 이만~',
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
