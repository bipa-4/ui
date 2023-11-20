import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function getPresignedImageUrl(imageName: string, folderName: 'thumbnail' | 'channelProfile') {
  const res = await axios.post(`${BASE_URL}/video/presigned/image?imageName=${imageName}&folderName=${folderName}`);
  return {
    imageName: res.data.fileName,
    imagePresignedUrl: res.data.fileUrl,
  };
}

export async function getPresignedVideoUrl(videoName: string) {
  const res = await axios.post(`${BASE_URL}/video/presigned/video?videoName=${videoName}&folderName=video`);
  return {
    videoName: res.data.fileName,
    videoPresignedUrl: res.data.fileUrl,
  };
}
