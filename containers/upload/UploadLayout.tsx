import Title from '@/components/ui/Title';
import React, { useEffect, useState } from 'react';
import VideoSummaryItemCol from '@/components/video/VideoSummaryItemCol';
import axios from 'axios';
import VideoType from '@/types/videoType';
import useCategoryList from '@/hooks/useCategoryList';
import dayjs from 'dayjs';
import S3upload from '@/utils/S3Upload';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getPresignedImageUrl, { getPresignedVideoUrl } from '@/utils/getPresignedUrl';
import userAtom from '@/atoms/user';
import customConfirmToast, { customWarningToast } from '@/utils/CustomToast';

type updateVideoType = {
  updateVideo?: VideoType;
};

export default function UploadLayout({ updateVideo }: updateVideoType) {
  // 수정인지 업로드인지
  const isUpdate: boolean = !!updateVideo;
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  // 유저 상태(전역)
  const user = useAtomValue(userAtom);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // 카테고리 목록
  const { categoryList } = useCategoryList();

  // s3에 업로드할 파일
  const [videoFile, setVideoFile] = useState<File>();
  const [thumbnailFile, setThumbnailFile] = useState<File>();

  // 미리보기 url
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>(updateVideo?.videoUrl || '');
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string>(updateVideo?.thumbnailUrl || '');

  // 백엔드에 전송할 비디오 객체
  const [video, setVideo] = useState<VideoType>(
    updateVideo || {
      title: '',
      content: '',
      videoUrl: '',
      thumbnailUrl: '',
      privateType: false,
      category: [],
    },
  );

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSize = 1024 * 1024 * 50; // 50MB
    const fileSize = e.target.files?.[0]?.size;

    if (fileSize && fileSize > maxSize) {
      customWarningToast('50MB 이하의 파일만 업로드 가능합니다.');
      e.target.value = '';
      return;
    }

    if (file) {
      setVideoFile(file);
      const videoUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(videoUrl);
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSize = 1024 * 1024; // 1MB
    const fileSize = e.target.files?.[0]?.size;

    if (fileSize && fileSize > maxSize) {
      customWarningToast('1MB 이하의 파일만 업로드 가능합니다.');
      e.target.value = '';
      return;
    }

    if (file) {
      setThumbnailFile(file);
      const thumbnailUrl = URL.createObjectURL(file);
      setThumbnailPreviewUrl(thumbnailUrl);
    }
  };

  const handleVideoPrivacyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideo((prev) => ({ ...prev, privateType: e.target.value !== 'public' }));
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

  const postVideoData = async (videoData: VideoType) => {
    try {
      if (!isUpdate) {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/video/upload`, videoData, {
          withCredentials: true,
        });
        customConfirmToast('업로드되었습니다.');
        router.push('/');
      } else {
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/video/${updateVideo?.id}`, videoData, {
          withCredentials: true,
        });
        customConfirmToast('수정되었습니다.');
        router.push('/');
      }
      setIsUploading(false);
    } catch (err) {
      customWarningToast(`백엔드 업로드 에러 : , ${err}`);
    }
  };

  const upload = async () => {
    if (!video.title) {
      customWarningToast('제목을 입력해주세요.');
      return;
    }
    if (!video.content) {
      customWarningToast('설명을 입력해주세요.');
      return;
    }

    if (videoFile && thumbnailFile) {
      setIsUploading(true);

      try {
        const { imagePresignedUrl, imageName } = await getPresignedImageUrl(thumbnailFile?.name, 'thumbnail');
        const { videoPresignedUrl, videoName } = await getPresignedVideoUrl(videoFile?.name);

        await S3upload(imagePresignedUrl, thumbnailFile, videoPresignedUrl, videoFile, setUploadProgress);
        setVideo((prev) => ({
          ...prev,
          videoUrl: `https://du30t7lolw1uk.cloudfront.net/${videoName}`,
          thumbnailUrl: `https://du30t7lolw1uk.cloudfront.net/${imageName}`,
        }));
      } catch (e) {
        customWarningToast(`error : ${e} 관리자에게 문의하세요.`);
      }
    } else {
      customWarningToast('파일을 선택해주세요.');
    }
  };

  const update = async () => {
    if (!video.title) {
      customWarningToast('제목을 입력해주세요.');
      return;
    }

    if (!video.content) {
      customWarningToast('설명을 입력해주세요.');
      return;
    }

    if (thumbnailFile) {
      setIsUploading(true);

      try {
        const { imagePresignedUrl, imageName } = await getPresignedImageUrl(thumbnailFile?.name, 'thumbnail');
        await S3upload(imagePresignedUrl, thumbnailFile);
        setVideo((prev) => ({
          ...prev,
          thumbnailUrl: `https://du30t7lolw1uk.cloudfront.net/${imageName}`,
        }));
      } catch (e) {
        customWarningToast(`error : ${e} 관리자에게 문의하세요.`);
      }
    }

    if (videoFile) {
      setIsUploading(true);

      try {
        const { videoPresignedUrl, videoName } = await getPresignedVideoUrl(videoFile?.name);
        await S3upload(null, null, videoPresignedUrl, videoFile, setUploadProgress);
        setVideo((prev) => ({
          ...prev,
          videoUrl: `https://du30t7lolw1uk.cloudfront.net/${videoName}`,
        }));
      } catch (e) {
        customWarningToast(`error : ${e} 관리자에게 문의하세요.`);
      }
    }

    // 비디오 수정
    if (!videoFile && !thumbnailFile) {
      postVideoData(video);
    }
  };

  useEffect(() => {
    if (videoFile || thumbnailFile) {
      postVideoData(video);
    }
  }, [video.videoUrl, video.thumbnailUrl]);

  if (!user) {
    return (
      <div className='min-h-screen flex flex-col justify-center mx-auto text-center'>
        <h1 className='text-3xl font-bold tracking-tight  md:text-5xl'>로그인이 필요합니다.</h1>
        <br />
        <Link className='w-64 p-1 mx-auto font-bold text-center  border border-gray-500 rounded-lg sm:p-4' href='/'>
          돌아가기
        </Link>
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className='min-h-[85vh] flex justify-center items-center m-auto'>
        <div
          className='radial-progress'
          style={{ '--value': uploadProgress, '--size': '8rem', '--thickness': '0.3rem' } as React.CSSProperties}
        >
          {uploadProgress} %
        </div>
      </div>
    );
  }

  return (
    <div className='my-14 px-5 flex max-lg:flex-col min-h-screen'>
      <div className='w-3/4 px-5 max-lg:w-full'>
        <Title text='영상 업로드' />
        <div className='py-5'>
          <label htmlFor='videoFile' className='block font-medium mb-2'>
            동영상 파일(50MB 이하)
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
            썸네일 이미지(1MB 이하)
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
            영상 제목(100자)
          </label>
          <input
            type='text'
            id='videoTitle'
            placeholder='영상 제목을 입력하세요.'
            value={video.title}
            onChange={handleTitle}
            className='input input-bordered w-full'
            maxLength={100}
            required
          />
        </div>
        <div className='pb-8'>
          <label htmlFor='videoDescription' className='block font-medium mb-2'>
            영상 설명(3000자)
          </label>
          <textarea
            id='videoDescription'
            placeholder='영상 설명을 입력하세요.'
            value={video.content}
            onChange={handleDescription}
            className='textarea textarea-bordered w-full h-32 resize-none '
            maxLength={3000}
            required
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
                checked={video.category.includes(category.categoryNameId)}
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
                checked={!video.privateType}
                onChange={handleVideoPrivacyChange}
                className='radio radio-secondary radio-sm mx-2'
              />
              공개
            </label>
            <label className='mr-4 label cursor-pointer inline-flex justify-start'>
              <input
                type='radio'
                value='private'
                checked={video.privateType}
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
            videoId=''
            thumbnail={thumbnailPreviewUrl || '/images/defaultThumbnailImage.png'}
            videoTitle={video.title}
            channelProfileUrl={user.channelProfileUrl}
            channelName={user.channelName}
            readCount={0}
            createAt={dayjs().format('YYYY-MM-DD HH:mm:ss')}
            privateType={video.privateType}
          />
        </div>

        <div className='mt-5 text-center flex gap-2 justify-center'>
          <Link href='/' className='btn flex-1 h-14'>
            취소
          </Link>
          {isUpdate ? (
            <button onClick={update} className='btn btn-primary flex-1 h-14' type='button' disabled={isUploading}>
              {isUploading ? '수정 중...' : '수정'}
            </button>
          ) : (
            <button onClick={upload} className='btn btn-primary flex-1 h-14' type='button' disabled={isUploading}>
              {isUploading ? '업로드 중...' : '업로드'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

UploadLayout.defaultProps = {
  updateVideo: null,
};
