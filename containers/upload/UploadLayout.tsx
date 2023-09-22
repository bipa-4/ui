import Title from '@/components/ui/Title';
import React, { useState } from 'react';
import VideoSummaryItemCol from '@/components/video/VideoSummaryItemCol';
import axios from 'axios';
import VideoType from '@/types/videoType';

export default function UploadLayout() {
  // s3에 업로드할 파일
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // 미리보기 url
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>();
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string>();

  // 백엔드에 전송할 비디오 객체
  const [video, setVideo] = useState<VideoType>({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    isPublic: true,
  });

  const url = '';

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

  const handleUpload = async () => {
    const s3Upload = async (presignedUrl: string, uploadFile: File) => {
      const res = await axios({
        method: 'put',
        data: uploadFile,
        url: presignedUrl,
        headers: {
          'Content-Type': 'video/mp4',
        },
      });

      if (res.status === 200) {
        console.log('success');
      }
    };

    if (videoFile && thumbnailFile) {
      await s3Upload(url, videoFile);
    }
  };

  const handleVideoPrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => ({ ...prev, isPublic: e.target.value === 'public' }));
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideo((prev) => ({ ...prev, description: e.target.value }));
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
            value={video.title}
            onChange={handleTitle}
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
            value={video.description}
            onChange={handleDescription}
            className='border rounded-lg px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='mb-4'>
          <label className='block font-medium mb-2'>공개 여부</label>
          <div>
            <label className='mr-4'>
              <input type='radio' value='public' checked={video.isPublic} onChange={handleVideoPrivacyChange} />
              공개
            </label>
            <label>
              <input type='radio' value='private' checked={!video.isPublic} onChange={handleVideoPrivacyChange} />
              비공개
            </label>
          </div>
        </div>
      </div>

      <div className='mb-4 grow px-5 w-1/4'>
        <Title text='미리보기' />
        <div className='mt-5'>
          <VideoSummaryItemCol
            thumbnail={thumbnailPreviewUrl || '/images/defaultThumbnailImage.png'}
            videoTitle={video.title}
            channelProfileUrl=''
            channelName=''
            readCnt={0}
            createAt='9999-99-99'
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
