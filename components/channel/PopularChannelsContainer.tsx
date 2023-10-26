import React, { useEffect, useState } from 'react';
import Title from '@/components/ui/Title';
import { ChannelSummaryType } from '@/types/channelType';
import fetcher from '@/utils/axiosFetcher';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';
import ChannelItem from './ChannelSummarylItem';
import ChannelSummarySkeletonRow from '../skeleton/ChannelSummarySkeletonRow';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function ChannelContainer() {
  const [channelList, setChannelList] = useState<ChannelSummaryType[]>();
  const { data } = useSWR(`${BASE_URL}/channel/top5`, fetcher);
  const { t } = useTranslation('common');

  useEffect(() => {
    setChannelList(data);
  }, [data]);

  const skeletonRows = [];

  for (let i = 0; i < 5; i++) {
    skeletonRows.push(<ChannelSummarySkeletonRow key={i} />);
  }

  if (!channelList) {
    return (
      <div>
        <div className=' px-2 py-4'>
          <Title text={t('popularChannels')} />
        </div>
        <div>{skeletonRows}</div>
      </div>
    );
  }

  return (
    <div>
      <div className=' px-2 py-4'>
        <Title text={t('popularChannels')} />
      </div>
      <div>
        {channelList.map((item) => (
          <ChannelItem key={item.channelId} channelItem={item} rank={item.ranking} />
        ))}
      </div>
    </div>
  );
}
