import Title from '@/components/ui/Title';
import React, { useState } from 'react';
import VideoSummaryItemCol from '@/components/video/VideoSummaryItemCol';
import axios from 'axios';
import VideoType from '@/types/videoType';
import useCategoryList from '@/hooks/useCategoryList';
import dayjs from 'dayjs';

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
    isPublic: true,
    category: 0,
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

  const s3Upload = async (videoUrl: string, uploadVideoFile: File, imageUrl: string, uploadImageFile: File) => {
    try {
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

      const thumbnailRes = await axios({
        method: 'put',
        data: uploadImageFile,
        url: imageUrl,
        headers: {
          'Content-Type': 'image/png',
        },
      });

      if (thumbnailRes.status === 200) {
        console.log('Thumbnail upload success');
      }
    } catch (error) {
      console.log('s3 업로드 에러', error);
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
    // const category = e.target.value;
    setVideo((prev) => ({ ...prev, category: 1 }));
    // if (e.target.checked) {
    //  setVideo((prev) => ({ ...prev, category: category}));
    // }
    // else {
    //  setVideo((prev) => ({ ...prev, category: prev.category.filter((c) => c !== category) }));
    // }
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
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/video/upload`, video);
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
        //  'https://du30t7lolw1uk.cloudfront.net/example.mp4?Expires=1696494220&Signature=QYkwmNlA66QqfWN6SnZ2K0Mw4utqMINPGG~nMDdMPSndIAQQ2pe9rvjb8VxR5OwvWDfPoTYoPT68czgdYB9KQ3JOpEbgkTZ39l4s-BEb9V9x17jRmmFyVAVBBI4ZAQsgOdK4WAfhSMR3QJ2jbxTgRhqoaI3zcG0b9WTYlmc3G8KuPi57DzWQHnuUcRUBb-69-Vsi3JiO-gvI9ZLtVDYDUChvFR2wTH2dUNrkXMNKocG0ZZaHhUonS9tHY1jb0CyhLzGWKeAl95oCaR0GnrrlR5djvQanE8xMYoPi8D-59sVaZWINulgwTiJ~uGsP1euWMMHW5xWBMl6tCV5rUqhWOA__&Key-Pair-Id=629daae5-dd22-4b80-8c98-500e4d99372e';
        // const imageUrl = '';
        await s3Upload(videoUrl, videoFile, imageUrl, thumbnailFile);
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
            <label className='mr-4 label cursor-pointer inline-flex justify-start' key={category.id}>
              <input
                type='checkbox'
                value={category.id}
                onChange={handleCategoryChange}
                className='checkbox checkbox-secondary checkbox-sm mx-2'
              />
              <span className='label-text'>{category.name}</span>
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
                checked={video.isPublic}
                onChange={handleVideoPrivacyChange}
                className='radio radio-secondary radio-sm mx-2'
              />
              공개
            </label>
            <label className='mr-4 label cursor-pointer inline-flex justify-start'>
              <input
                type='radio'
                value='private'
                checked={!video.isPublic}
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
            thumbnail={thumbnailPreviewUrl || '/images/defaultThumbnailImage.png'}
            videoTitle={video.title}
            channelProfileUrl=''
            channelName=''
            readCnt={0}
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
