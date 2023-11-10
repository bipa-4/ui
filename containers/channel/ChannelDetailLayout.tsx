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
import { useTranslation } from 'next-i18next';

interface ChannelProps {
  channelInfo: ChannelDetailType;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 5;

/**
 * 채널 상세 페이지 레이아웃
 * @param param0
 * @returns
 */
export default function ChannelDetailLayout({ channelInfo }: ChannelProps) {
  const router = useRouter();
  const { cid } = router.query;
  const { t } = useTranslation(['common', 'channelDetail']);

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

  // 무한 스크롤 관련 state
  const [videoList, setVideoList] = useState<VideoCardType[]>();
  const [hasMore, setHasMore] = useState(true);
  const [nextId, setNextId] = useState<string | null>('');

  // 검색
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const searchQuery = router.query?.keyword;

  const checkMyChannel = async () => {
    const flag = await fetcher(`${BASE_URL}/channel/flag/${cid}`);
    setIsMyChannel(flag);
  };

  const handleUpdate = () => {
    setIsUpdate((prev) => !prev);
  };

  const handleUpdateCancel = () => {
    setProfileImageFile(undefined);
    setPreviewUrl('');
    setIsUpdate((prev) => !prev);
  };

  const updateChannelToServer = async (updatedInfo: ChannelUpdateType) => {
    try {
      const res = await axios.put(`${BASE_URL}/channel/${cid}`, updatedInfo, { withCredentials: true });
      if (res.status === 200) {
        alert(`${t('edit.completeMessage', { ns: 'channelDetail' })}`);
        router.reload();
      }
    } catch (e) {
      alert(`수정 중 에러가 발생했습니다 : ${e}`);
    }
  };

  const updateChannel = async () => {
    if (profileImageFile) {
      const { imagePresignedUrl, imageName } = await getPresignedImageUrl(profileImageFile?.name, 'channelProfile');
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024; // 1MB
    const fileSize = e.target.files?.[0]?.size;

    if (fileSize && fileSize > maxSize) {
      alert('1MB 이하의 파일만 업로드 가능합니다.');
      e.target.value = '';
      return;
    }

    const selectedFile = e.target.files?.[0];
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
    console.log('채널내 영상 조회', res.data);
    setNextId(res.data.nextUUID);
    return res.data;
  };

  const fetchSearchVideos = async (nextUUID: string) => {
    const res = await fetcher(
      `${BASE_URL}/channel/${channelInfo.channelId}/video?${nextUUID ? 'page=' : ''}${nextUUID}${
        nextUUID ? '&' : ''
      }page_size=${PAGE_SIZE}&search_query=${searchKeyword}`,
    );
    console.log('검색 영상 조회', res);

    setNextId(res.page);
    return res;
  };

  const fetchMoreData = async () => {
    console.log('fetchMoreData', nextId);

    if (nextId === '') {
      return;
    }

    if (videoList && !nextId) {
      setHasMore(false);
      return;
    }

    if (nextId) {
      const data = searchKeyword ? await fetchSearchVideos(nextId) : await fetchVideo(nextId);
      setNextId(searchKeyword ? data.page : data.nextUUID);
      setVideoList((prevVideoList) => {
        if (prevVideoList) {
          return [...prevVideoList, ...data.videos];
        }
        return data.videos;
      });
    }
  };

  const fetchInitData = async () => {
    const initData = searchKeyword ? await fetchSearchVideos('') : await fetchVideo('');
    setVideoList(initData.videos as VideoCardType[]);
  };

  useEffect(() => {
    setSearchKeyword(searchQuery as string);
    fetchInitData();
    checkMyChannel();
  }, []);

  useEffect(() => {
    setHasMore(true);
    checkMyChannel();
    setSearchKeyword(searchQuery as string);
    fetchInitData();
  }, [channelInfo]);

  useEffect(() => {
    setHasMore(true);
    setSearchKeyword(searchQuery as string);
  }, [searchQuery]);

  useEffect(() => {
    fetchInitData();
  }, [searchKeyword]);

  return (
    <>
      <div className='flex w-full h-60 items-center border-0 border-b-2 border-slate-300 bg-base-100'>
        {isUpdate ? (
          <>
            <div className='w-48 flex flex-col justify-center items-center'>
              <div className='max-lg:hidden'>
                <Avatar width={32} marginX={5} imgUrl={previewUrl || channelInfo.profileUrl} />
              </div>
              <div className='lg:hidden'>
                <Avatar width={20} marginX={1} imgUrl={channelInfo.profileUrl} />
              </div>
              <div className='relative'>
                <input
                  type='file'
                  id='thumbnailFile'
                  accept='image/*'
                  onChange={handleFileChange}
                  className='absolute w-full h-full opacity-0 cursor-pointer'
                />
                <label className='btn btn-sm justify-center mt-3' htmlFor='thumbnailFile'>
                  {t('edit.changeImage', { ns: 'channelDetail' })}
                </label>
              </div>
            </div>

            <div className='grow pl-4 max-lg:px-1'>
              <input
                type='text'
                defaultValue={channelInfo.channelName}
                className='input input-bordered w-full max-w-lg mb-2'
                placeholder={t('edit.channelName', { ns: 'channelDetail' })}
                onChange={handleChannelName}
                maxLength={100}
              />
              <div>
                <textarea
                  id='videoDescription'
                  placeholder={t('edit.channelDescription', { ns: 'channelDetail' })}
                  defaultValue={`${channelInfo.content}`}
                  className='textarea textarea-bordered w-full h-20 resize-none max-w-lg'
                  onChange={handleChannelDescription}
                  maxLength={200}
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
                  {t('public')}
                </label>
                <label className='mr-4 label cursor-pointer inline-flex justify-start'>
                  <input
                    type='radio'
                    value='private'
                    checked={updatedChannelInfo.privateType}
                    onChange={handleChannelPrivacyType}
                    className='radio radio-secondary radio-sm mx-2'
                  />
                  {t('private')}
                </label>
              </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
              <div className='btn btn-secondary btn-md w-24 mb-1' onClick={updateChannel}>
                {t('button.edit')}
              </div>
              <div className='btn btn-md w-24' onClick={handleUpdateCancel}>
                {t('button.cancel')}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='max-lg:hidden'>
              <Avatar width={36} marginX={5} imgUrl={channelInfo.profileUrl} />
            </div>
            <div className='lg:hidden'>
              <Avatar width={20} marginX={1} imgUrl={channelInfo.profileUrl} />
            </div>
            <div className='grow pl-4'>
              {isMyChannel && (
                <div className='text-sm pt-4 opacity-80 pb-1'>
                  {channelInfo.privateType === true
                    ? `🔸 ${t('privateChannel', { ns: 'channelDetail' })}`
                    : `🔹 ${t('openChannel', { ns: 'channelDetail' })}`}
                </div>
              )}
              <Title text={channelInfo.channelName} />
              <div>{channelInfo.content}</div>
            </div>
            {isMyChannel && (
              <div className='btn' onClick={handleUpdate}>
                {t('channelEditButton', { ns: 'channelDetail' })}
              </div>
            )}
          </>
        )}
      </div>
      <div className='mt-7'>
        <div className='mx-5 flex justify-between items-center max-lg:mx-1'>
          <div
            onClick={() => router.push(`/channel/${channelInfo.channelId}`)}
            className='cursor-pointer w-1/2 basis-1/2'
          >
            <Title text={`${t('recentVideos')}`} />
          </div>
          <SearchInput
            path={`channel/${channelInfo.channelId}`}
            setKeyword={setSearchKeyword}
            searchItem={t('searchVideoPlaceHolder')}
          />
        </div>
        {videoList?.length === 0 && (
          <div className='mx-5 flex items-center m-auto justify-center h-52'>
            <div>
              {searchKeyword
                ? t('noSearchedVideo', { ns: 'channelDetail' })
                : t('noUploadedVideo', { ns: 'channelDetail' })}
            </div>
          </div>
        )}
        {!videoList && (
          <div className='mx-5 flex items-center m-auto justify-center h-52'>
            <LoadingSpinner />
          </div>
        )}
        {videoList && videoList?.length !== 0 && (
          <InfiniteVideoContainer videoList={videoList} dataFetcher={fetchMoreData} hasMore={hasMore} />
        )}
      </div>
    </>
  );
}
