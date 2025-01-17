import React, { useCallback } from 'react';

import { CUSTOM } from '@actions/types';
import CampaignInvestigatorRow from '../CampaignInvestigatorRow';
import GenericCampaignItem from './GenericCampaignItem';
import MiniCampaignT from '@data/interfaces/MiniCampaignT';
import CampaignItemHeader from './CampaignItemHeader';

interface Props {
  campaign: MiniCampaignT;
  onPress: (id: string, campaign: MiniCampaignT) => void;
}

function CampaignItem({ campaign, onPress }: Props) {
  const handleOnPress = useCallback(() => {
    onPress(campaign.uuid, campaign);
  }, [onPress, campaign]);
  return (
    <GenericCampaignItem
      campaign={campaign}
      lastUpdated={campaign.updatedAt}
      onPress={handleOnPress}
    >
      <CampaignItemHeader
        campaign={campaign}
        investigators={<CampaignInvestigatorRow campaign={campaign} />}
        name={campaign.cycleCode !== CUSTOM ? campaign.name : undefined}
      />
    </GenericCampaignItem>
  );
}

export default React.memo(CampaignItem);
