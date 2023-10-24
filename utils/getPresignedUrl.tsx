import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function getPresignedImageUrl(imageName: string) {
  const res = await axios.post(`${BASE_URL}/video/presigned/image?imageName=${imageName}`);
  console.log('getPresignedImageUrl', res);
  return {
    imageName: res.data.fileName,
    imagePresignedUrl: res.data.fileUrl,
  };
}

export async function getPresignedVideoUrl(videoName: string) {
  const res = await axios.post(`${BASE_URL}/video/presigned/video?videoName=${videoName}`);
  console.log('getPresignedVideoUrl', res);

  return {
    videoName: res.data.fileName,
    videoPresignedUrl: res.data.fileUrl,
  };
}
