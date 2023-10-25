import Avatar from '@/components/ui/Avatar';
import Title from '@/components/ui/Title';
import { ChannelDetailType, ChannelUpdateType } from '@/types/channelType';
import fetcher from '@/utils/axiosFetcher';
import { useState, useEffect } from 'react';
import axios from 'axios';
import S3Upload from '@/utils/S3Upload';
import { useRouter } from 'next/router';
import getPresignedImageUrl from '@/utils/getPresignedUrl';
import InfiniteVideoContainer from '@/components/video/InfiniteVideoContainer';
import { VideoCardType } from '@/types/videoType';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SearchInput from '@/components/ui/SearchInput';

interface ChannelProps {
  channelInfo: ChannelDetailType;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

/**
 * 채널 상세 페이지 레이아웃
 * Todo : 검색 파라미터 있을 때 무한스크롤에 다른 데이터 적용시키기
 * @param param0
 * @returns
 */
export default function ChannelDetailLayout({ channelInfo }: ChannelProps) {
  const router = useRouter();
  const { cid } = router.query;

  // 채널 수정 관련 state
  const [isMyChannel, setIsMyChannel] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [updatedChannelInfo, setUpdatedChannelInfo] = useState<ChannelUpdateType>({
    channelName: channelInfo.channelName,
    content: channelInfo.content,
    privateType: channelInfo.privateType,
    profileUrl: channelInfo.profileUrl,
  });

  console.log('updatedChannelInfo', updatedChannelInfo);

  // 무한 스크롤 관련 state
  const [videoList, setVideoList] = useState<VideoCardType[] | null>([]);
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState<string | null>(null);

  const checkMyChannel = async () => {
    const flag = await fetcher(`${BASE_URL}/channel/flag/${cid}`);
    setIsMyChannel(flag);
  };

  const handleUpdate = () => {
    setIsUpdate((prev) => !prev);
  };

  const updateChannelToServer = async (updatedInfo: ChannelUpdateType) => {
    try {
      const res = await axios.put(`${BASE_URL}/channel/${cid}`, updatedInfo, { withCredentials: true });
      if (res.status === 200) {
        alert('백엔드 채널 정보 수정 완료');
        router.reload();
      }
    } catch (e) {
      console.log('백엔드 수정 에러', e);
    }
  };

  const updateChannel = async () => {
    if (profileImageFile) {
      const { imagePresignedUrl, imageName } = await getPresignedImageUrl(profileImageFile?.name);
      setUpdatedChannelInfo((prev) => ({
        ...prev,
        profileUrl: `https://streamwaves3.s3.ap-northeast-2.amazonaws.com/${imageName}`,
      }));
      await S3Upload(imagePresignedUrl, profileImageFile);
      return;
    }
    updateChannelToServer(updatedChannelInfo);
  };

  // 프로필 이미지 파일 선택시 파일상태, 미리보기 상태 변경
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setProfileImageFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };

  const handleChannelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedChannelInfo((prev) => ({ ...prev, channelName: e.target.value }));
  };

  const handleChannelDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedChannelInfo((prev) => ({ ...prev, content: e.target.value }));
  };

  const handleChannelPrivacyType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedChannelInfo((prev) => ({ ...prev, privateType: e.target.value !== 'public' }));
  };

  useEffect(() => {
    if (profileImageFile && updatedChannelInfo.profileUrl !== profileImageFile.name) {
      updateChannelToServer(updatedChannelInfo);
    }
  }, [updatedChannelInfo.profileUrl]);

  const fetchVideo = async (nextUUID: string) => {
    const res = await axios.get(
      `${BASE_URL}/channel/video/${channelInfo.channelId}?${nextUUID ? 'page=' : ''}${nextUUID}${
        nextUUID ? '&' : ''
      }pageSize=${PAGE_SIZE}`,
      {
        withCredentials: true,
      },
    );
    if (res.status !== 200) {
      return {
        videos: null,
        nextUUID: '',
      };
    }
    setNextId(res.data.nextUUID);
    return res.data;
  };

  const fetchMoreData = async () => {
    if (!nextId) {
      setHasMore(false);
      return;
    }

    if (nextId) {
      const data = await fetchVideo(nextId);

      setNextId(data.nextUUID);
      setVideoList((prevVideoList) => {
        if (prevVideoList) {
          return [...prevVideoList, ...data.videos];
        }
        return data.videos;
      });
    }
  };

  useEffect(() => {
    const fetchInitData = async () => {
      const initData = await fetchVideo('');
      setVideoList(initData.videos as VideoCardType[]);
    };
    fetchInitData();
    checkMyChannel();
  }, []);

  console.log(videoList);

  return (
    <>
      <div className='flex w-full h-60 items-center border-0 border-b-2 border-slate-300  bg-base-100'>
        {isUpdate ? (
          <>
            <div className='w-48 flex flex-col justify-center items-center'>
              <Avatar width={32} marginX={5} imgUrl={previewUrl || channelInfo.profileUrl} />
              <div className='relative'>
                <input
                  type='file'
                  id='thumbnailFile'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='absolute w-full h-full opacity-0 cursor-pointer'
                />
                <label className='btn btn-sm justify-center mt-3' htmlFor='thumbnailFile'>
                  이미지 수정
                </label>
              </div>
            </div>

            <div className='grow pl-4'>
              <input
                type='text'
                defaultValue={channelInfo.channelName}
                className='input input-bordered w-full max-w-lg mb-2'
                placeholder='채널 이름을 입력하세요.'
                onChange={handleChannelName}
              />
              <div>
                <textarea
                  id='videoDescription'
                  placeholder='채널 설명을 입력하세요.'
                  defaultValue={channelInfo.content}
                  className='textarea textarea-bordered w-full h-20 resize-none max-w-lg'
                  onChange={handleChannelDescription}
                />
              </div>
              <div>
                <label className='mr-4 label cursor-pointer inline-flex justify-start'>
                  <input
                    type='radio'
                    value='public'
                    checked={!updatedChannelInfo.privateType}
                    onChange={handleChannelPrivacyType}
                    className='radio radio-secondary radio-sm mx-2'
                  />
                  공개
                </label>
                <label className='mr-4 label cursor-pointer inline-flex justify-start'>
                  <input
                    type='radio'
                    value='private'
                    checked={updatedChannelInfo.privateType}
                    onChange={handleChannelPrivacyType}
                    className='radio radio-secondary radio-sm mx-2'
                  />
                  비공개
                </label>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <div className='btn btn-secondary btn-md w-24 mb-1' onClick={updateChannel}>
                수정하기
              </div>
              <div className='btn btn-md w-24' onClick={handleUpdate}>
                취소
              </div>
            </div>
          </>
        ) : (
          <>
            <Avatar width={36} marginX={5} imgUrl={channelInfo.profileUrl} />
            <div className='grow pl-4'>
              <div className='text-sm pt-4 opacity-80 pb-1'>
                {isMyChannel && (channelInfo.privateType === true ? '🔸 비공개 채널' : '🔹 공개 채널')}
              </div>
              <Title text={channelInfo.channelName} />
              <div>{channelInfo.content}</div>
            </div>
            {isMyChannel && (
              <div className='btn' onClick={handleUpdate}>
                채널 정보 수정
              </div>
            )}
          </>
        )}
      </div>
      <div className='mt-7'>
        <div className='mx-5 flex justify-between items-center'>
          <Title text='최근 업로드' />
          <SearchInput path={`channel/${channelInfo.channelId}`} />
        </div>
        {videoList?.length === 0 ? (
          <div className='mx-5 flex items-center'>
            <LoadingSpinner />
          </div>
        ) : videoList === null ? (
          <div className='mx-5 flex items-center m-auto justify-center h-52'>업로드한 영상이 없습니다.</div>
        ) : (
          <InfiniteVideoContainer videoList={videoList} dataFetcher={fetchMoreData} hasMore={hasMore} />
        )}
      </div>
    </>
  );
}
