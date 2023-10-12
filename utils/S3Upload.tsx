import axios from 'axios';

/**
 * S3에 업로드하는 커스텀 훅
 * @param imageUrl 썸네일 이미지 url
 * @param uploadImageFile 썸네일 이미지 파일
 * @param videoUrl 비디오 url
 * @param uploadVideoFile 비디오 파일
 */
async function S3upload(imageUrl: string, uploadImageFile: File, videoUrl?: string, uploadVideoFile?: File) {
  try {
    if (videoUrl && uploadVideoFile) {
      const videoRes = await axios({
        method: 'put',
        data: uploadVideoFile,
        url: videoUrl,
        headers: {
          'Content-Type': 'video/mp4',
        },
      });

      if (videoRes.status === 200) {
        console.log('Video upload success');
      }
    }

    const thumbnailRes = await axios({
      method: 'put',
      data: uploadImageFile,
      url: imageUrl,
      headers: {
        'Content-Type': 'image/png',
      },
    });

    if (thumbnailRes.status === 200) {
      console.log('Image upload success');
    }
  } catch (error) {
    console.log('s3 업로드 에러', error);
  }
}

export default S3upload;
