import React from 'react';
import { Button, Card } from 'react-bootstrap';
import SubCampaign from './Campaign';
import { SubCampaign as SubCampaignType } from '../types';

interface SubCampaignListProps {
  subCampaigns: SubCampaignType[];
  onUpdate: (index: number, subCampaign: SubCampaignType) => void;
  onDelete: (index: number, adIndexes: number[]) => void; 
  showErrors: boolean;
}

const SubCampaignList: React.FC<SubCampaignListProps> = ({ subCampaigns, onUpdate, onDelete, showErrors }) => {
  const getSelectedAdsIndexes = (subCampaignIndex: number) => {
    return subCampaigns[subCampaignIndex].ads
      .map((ad, index) => ({ ad, index }))
      .filter(({ ad }) => ad.selected)
      .map(({ index }) => index);
  };

  const handleDeleteSelectedAds = (subCampaignIndex: number) => {
    const selectedAdIndexes = getSelectedAdsIndexes(subCampaignIndex);
    if (selectedAdIndexes.length > 0) {
      onDelete(subCampaignIndex, selectedAdIndexes);
    }
  };

  return (
    <div>
      {subCampaigns.map((subCampaign, subCampaignIndex) => (
        <Card key={subCampaignIndex} className="mb-3">
          <Card.Body>
            <SubCampaign
              subCampaign={subCampaign}
              onUpdate={(updatedSubCampaign) => onUpdate(subCampaignIndex, updatedSubCampaign)}
              onDelete={()=>{}}
              showErrors={showErrors}
            />
            <Button
              variant="danger"
              className="mt-2"
              onClick={() => handleDeleteSelectedAds(subCampaignIndex)}
              title="Xóa quảng cáo đã chọn"
            >
              {getSelectedAdsIndexes(subCampaignIndex).length > 0
                ? `Xóa ${getSelectedAdsIndexes(subCampaignIndex).length} quảng cáo đã chọn`
                : 'Xóa quảng cáo đã chọn'}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SubCampaignList;