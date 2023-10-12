import Title from '@/components/ui/Title';
import React, { useState } from 'react';
import VideoSummaryItemCol from '@/components/video/VideoSummaryItemCol';
import axios from 'axios';
import VideoType from '@/types/videoType';
import useCategoryList from '@/hooks/useCategoryList';
import dayjs from 'dayjs';
import S3upload from '@/utils/S3Upload';
import { set } from 'video.js/dist/types/tech/middleware';

export default function UploadLayout() {
  // 카테고리 목록
  const { categoryList } = useCategoryList();

  // s3에 업로드할 파일
  const [videoFile, setVideoFile] = useState<File>();
  const [thumbnailFile, setThumbnailFile] = useState<File>();

  // 미리보기 url
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>();
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string>();

  // 백엔드에 전송할 비디오 객체
  const [video, setVideo] = useState<VideoType>({
    title: '',
    content: '',
    videoUrl: '',
    thumbnailUrl: '',
    privateType: true,
    category: [],
  });
  console.log(video);

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

  const handleVideoPrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => ({ ...prev, isPublic: e.target.value === 'public' }));
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideo((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setVideo((prevVideo) => {
      if (e.target.checked) {
        return {
          ...prevVideo,
          category: [...prevVideo.category, category],
        };
      }
      return {
        ...prevVideo,
        category: prevVideo.category.filter((c) => c !== category),
      };
    });
  };

  const getToday = () => dayjs().format('YYYY-MM-DD');

  // presigned url 받아오기
  const getPresignedUrl = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/video/presigned?videoName=${videoFile?.name}&imageName=${thumbnailFile?.name}`,
    );
    return {
      videoUrl: res.data.videoUrl,
      imageUrl: res.data.imageUrl,
    };
  };
  // setVideoUploadUrl(res.data.videoUrl);
  // setThumbnailUploadUrl(res.data.imageUrl);

  const postVideoData = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/video/upload`, video, {
        withCredentials: true,
      });
      console.log('백엔드에 업로드 : ', res);
    } catch (err) {
      console.log('백엔드 업로드 에러 : ', err);
    }
  };

  const upload = async () => {
    if (!video.title) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!video.content) {
      alert('설명을 입력해주세요.');
      return;
    }

    if (videoFile && thumbnailFile) {
      try {
        const { videoUrl, imageUrl } = await getPresignedUrl();
        // const videoUrl =
        //  'http://du30t7lolw1uk.cloudfront.net/example2.mp4?Expires=1696990740&Signature=Rsr8Te21r0xGFejEkhXxE4ava~VMAc8apBNIR5pFKWQrg8VHOJgK5X185VKIO82IRG7Tu9n08Ci409Bh-zibjbGlDaeodmu~WvKXmgOwRV5KZ1cn4jtlteAlCkJxICbnZ2ApzPIJ98cx~4pV75CKN37sja3SQGCpmHuzoCudejT0D1ZU6hkUjm6TsOPOeidyDFvvRqaQ2-xLgJVXSypB7UMV0KUenjx4tUjlcJIROt5VlfklUrpjHqpkz3tcL1sZNywLgSrz2uiev6r88IMfhA2gqOp5CunCB6r9Up8k6wFOI6VdWbheY7HeLKuFQ0XdcV9111MTPvzhHPJ400GE8w__&Key-Pair-Id=K2BGKC2WPH3ISX';
        // const imageUrl = '';
        // await s3Upload(videoUrl, videoFile, imageUrl, thumbnailFile);
        console.log('videoUrl', videoUrl);
        console.log('imageUrl', imageUrl);
        setVideo((prev) => ({ ...prev, videoUrl: videoUrl, thumbnailUrl: imageUrl }));
        await S3upload(imageUrl, thumbnailFile, videoUrl, videoFile);
        await postVideoData();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('파일을 선택해주세요.');
    }
  };

  return (
    <div className='my-14 px-5 flex max-lg:flex-col min-h-screen'>
      <div className='w-3/4 px-5 max-lg:w-full'>
        <Title text='영상 업로드' />
        <div className='py-5'>
          <label htmlFor='videoFile' className='block font-medium mb-2'>
            동영상 파일
          </label>
          <input
            type='file'
            id='videoFile'
            accept='video/*'
            onChange={handleVideoFileChange}
            className='file-input file-input-bordered w-full max-w-lg'
          />
        </div>
        {videoPreviewUrl && (
          <div className='mb-8 w-3/5 '>
            <label className='block font-medium mb-2'>영상 미리보기</label>
            <video src={videoPreviewUrl} controls className='w-full' />
          </div>
        )}
        <div className='pb-8'>
          <label htmlFor='thumbnailFile' className='block font-medium mb-2'>
            썸네일 이미지
          </label>
          <input
            type='file'
            id='thumbnailFile'
            accept='image/*'
            onChange={handleThumbnailFileChange}
            className='file-input file-input-bordered w-full max-w-lg'
          />
        </div>

        <div className='pb-8'>
          <label htmlFor='videoTitle' className='block font-medium mb-2'>
            영상 제목(50자)
          </label>
          <input
            type='text'
            id='videoTitle'
            placeholder='영상 제목을 입력하세요.'
            value={video.title}
            onChange={handleTitle}
            className='input input-bordered w-full'
          />
        </div>
        <div className='pb-8'>
          <label htmlFor='videoDescription' className='block font-medium mb-2'>
            영상 설명
          </label>
          <textarea
            id='videoDescription'
            placeholder='영상 설명을 입력하세요.'
            value={video.content}
            onChange={handleDescription}
            className='textarea textarea-bordered w-full h-32 resize-none '
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='videoDescription' className='block font-medium mb-2'>
            카테고리
          </label>
          {categoryList?.map((category) => (
            <label className='mr-4 label cursor-pointer inline-flex justify-start' key={category.categoryNameId}>
              <input
                type='checkbox'
                value={category.categoryNameId}
                onChange={handleCategoryChange}
                className='checkbox checkbox-secondary checkbox-sm mx-2'
              />
              <span className='label-text'>{category.categoryName}</span>
            </label>
          ))}
        </div>
        <div className='mb-4'>
          <label className='block font-medium mb-2'>공개 여부</label>
          <div>
            <label className='mr-4 label cursor-pointer inline-flex justify-start'>
              <input
                type='radio'
                value='public'
                checked={video.privateType}
                onChange={handleVideoPrivacyChange}
                className='radio radio-secondary radio-sm mx-2'
              />
              공개
            </label>
            <label className='mr-4 label cursor-pointer inline-flex justify-start'>
              <input
                type='radio'
                value='private'
                checked={!video.privateType}
                onChange={handleVideoPrivacyChange}
                className='radio radio-secondary radio-sm mx-2'
              />
              비공개
            </label>
          </div>
        </div>
      </div>

      <div className='mb-4 grow px-5 w-1/4 max-lg:w-3/5'>
        <Title text='미리보기' />
        <div className='mt-5'>
          <VideoSummaryItemCol
            videoId={0}
            thumbnail={thumbnailPreviewUrl || '/images/defaultThumbnailImage.png'}
            videoTitle={video.title}
            channelProfileUrl=''
            channelName=''
            readCount={0}
            createAt={getToday()}
          />
        </div>

        <div className='mt-5 text-center flex gap-2 justify-center'>
          <div className='btn flex-1 h-14'>취소</div>
          <div onClick={upload} className='btn btn-primary flex-1 h-14'>
            업로드
          </div>
        </div>
      </div>
    </div>
  );
}
