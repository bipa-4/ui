import axios from 'axios';

/**
 * S3에 업로드하는 커스텀 훅
 * @param imageUrl 썸네일 이미지 url
 * @param uploadImageFile 썸네일 이미지 파일
 * @param videoUrl 비디오 url
 * @param uploadVideoFile 비디오 파일
 */
async function S3upload(
  presignedImageUrl: string | null,
  uploadImageFile: File | null,
  presignedVideoUrl?: string,
  uploadVideoFile?: File,
) {
  if (presignedVideoUrl && uploadVideoFile) {
    const videoRes = await axios({
      method: 'put',
      data: uploadVideoFile,
      url: presignedVideoUrl,
      headers: {
        'Content-Type': 'video/mp4',
      },
    });
    console.log('videoRes', videoRes);
    if (videoRes.status === 200) {
      console.log('Video upload success');
    } else {
      console.log('CDN Video upload failed');
    }
  }

  if (presignedImageUrl && uploadImageFile) {
    const thumbnailRes = await axios({
      method: 'put',
      data: uploadImageFile,
      url: presignedImageUrl,
      headers: {
        'Content-Type': 'image/png',
      },
    });

    console.log('thumbnailRes', thumbnailRes);

    if (thumbnailRes.status === 200) {
      console.log('Image upload success');
    } else {
      console.log('CDN Image upload failed');
    }
  }
}

export default S3upload;
