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
  setUploadProgress?: React.Dispatch<React.SetStateAction<number>>,
) {
  if (presignedVideoUrl && uploadVideoFile) {
    await axios({
      method: 'put',
      data: uploadVideoFile,
      url: presignedVideoUrl,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log('영상 업로드', uploadProgress);
          setUploadProgress?.(uploadProgress);
        }
      },
      headers: {
        'Content-Type': 'video/mp4',
      },
    });
  }

  if (presignedImageUrl && uploadImageFile) {
    await axios({
      method: 'put',
      data: uploadImageFile,
      url: presignedImageUrl,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }
}

export default S3upload;
