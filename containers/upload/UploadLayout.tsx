import Title from '@/components/typo/Title';
import React, { useState } from 'react';
import VideoSummaryItemCol from '@/components/video/VideoSummaryItemCol';
import axios from 'axios';

export default function UploadLayout() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [isVideoPublic, setIsVideoPublic] = useState(true);

  const url =
    'https://streamwaves3.s3.ap-northeast-2.amazonaws.com/example.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230920T041505Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIA6ABZ54JVH27XFY4W%2F20230920%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=e55e698854ee23ba0e941ca013510e26b935941045de7bcea02514d94803bca1';

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const videoUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(videoUrl);
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const thumbnailUrl = URL.createObjectURL(file);
      setThumbnailPreviewUrl(thumbnailUrl);
    }
  };

  const s3Upload = async (presignedUrl: string, video: File) => {
    const res = await axios({
      method: 'put',
      data: video,
      url: presignedUrl,
      headers: {
        'Content-Type': 'video/mp4',
      },
    });

    if (res.status === 200) {
      console.log('success');
    }
  };

  const handleUpload = async () => {
    if (videoFile && thumbnailFile) {
      await s3Upload(url, videoFile);
    }
  };

  const handleVideoPrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVideoPublic(e.target.value === 'public');
  };

  return (
    <div className='my-14 px-5 flex'>
      <div className='w-3/4 px-5'>
        <Title text='영상 업로드' />
        <div className='my-4'>
          <input
            type='file'
            id='videoFile'
            accept='video/*'
            onChange={handleVideoFileChange}
            className='border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        {videoPreviewUrl && (
          <div className='mb-8 w-3/5'>
            <label className='block font-medium mb-2'>영상 미리보기</label>
            <video src={videoPreviewUrl} controls className='w-full' />
          </div>
        )}
        <label htmlFor='thumbnailFile' className='block font-medium mb-2'>
          썸네일 이미지
        </label>
        <input
          type='file'
          id='thumbnailFile'
          accept='image/*'
          onChange={handleThumbnailFileChange}
          className='border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300 mb-8'
        />
        <div className='mb-4'>
          <label htmlFor='videoTitle' className='block font-medium mb-2'>
            영상 제목(50자)
          </label>
          <input
            type='text'
            id='videoTitle'
            placeholder='영상 제목을 입력하세요.'
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            className='border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='videoDescription' className='block font-medium mb-2'>
            영상 설명
          </label>
          <textarea
            id='videoDescription'
            placeholder='영상 설명을 입력하세요.'
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            className='border rounded-lg px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label className='block font-medium mb-2'>공개 여부</label>
          <div>
            <label className='mr-4'>
              <input type='radio' value='public' checked={isVideoPublic} onChange={handleVideoPrivacyChange} />
              공개
            </label>
            <label>
              <input type='radio' value='private' checked={!isVideoPublic} onChange={handleVideoPrivacyChange} />
              비공개
            </label>
          </div>
        </div>
      </div>

      <div className='mb-4 grow px-5 w-1/4'>
        <Title text='미리보기' />
        <div className='mt-5'>
          <VideoSummaryItemCol
            id={1}
            thumbnailUrl={thumbnailPreviewUrl !== null ? thumbnailPreviewUrl : ''}
            channelName='떼껄룩'
            title={videoTitle}
            channelImg='img'
          />
        </div>

        <div className='mt-5 text-center flex gap-2 justify-center'>
          <div className='btn flex-1 h-14'>취소</div>
          <div onClick={handleUpload} className='btn btn-primary flex-1 h-14'>
            업로드
          </div>
        </div>
      </div>
    </div>
  );
}
