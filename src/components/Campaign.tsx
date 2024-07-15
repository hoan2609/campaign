import React, { useState } from 'react';
import { Button, Card, Form as BootstrapForm, Table } from 'react-bootstrap';
import { SubCampaign as SubCampaignType, Ad as AdType } from '../types';
import Ad from './Ad';

interface SubCampaignProps {
  subCampaign: SubCampaignType;
  onUpdate: (subCampaign: SubCampaignType) => void;
  onDelete: () => void;
  showErrors: boolean;
}

const SubCampaign: React.FC<SubCampaignProps> = ({ subCampaign, onUpdate, onDelete, showErrors }) => {
  const [selectedAds, setSelectedAds] = useState<boolean[]>(subCampaign.ads.map(() => false));

  const handleAdUpdate = (index: number, ad: AdType) => {
    const newAds = [...subCampaign.ads];
    newAds[index] = ad;
    onUpdate({ ...subCampaign, ads: newAds });
  };

  const handleAddAd = () => {
    const newAd: AdType = { name: '', quantity: 1 };
    onUpdate({
      ...subCampaign,
      ads: [...subCampaign.ads, newAd]
    });
    setSelectedAds([...selectedAds, false]);
  };

  const handleDeleteAd = (index: number) => {
    const newAds = subCampaign.ads.filter((_, i) => i !== index);
    onUpdate({ ...subCampaign, ads: newAds });
    setSelectedAds(newAds.map(() => false));
  };


  const handleDeleteSelectedAds = () => {
    const selectedIndexes = selectedAds
      .map((selected, index) => selected ? index : -1)
      .filter(index => index !== -1);

    const newAds = subCampaign.ads.filter((_, index) => !selectedIndexes.includes(index));
    onUpdate({ ...subCampaign, ads: newAds });
    setSelectedAds(newAds.map(() => false));
  };



  const handleSelectAd = (index: number, selected: boolean) => {
    const newSelectedAds = [...selectedAds];
    newSelectedAds[index] = selected;
    setSelectedAds(newSelectedAds);
  };

  const handleSelectAllAds = (selected: boolean) => {
    setSelectedAds(selectedAds.map(() => selected));
  };

  const anyAdSelected = selectedAds.some(selected => selected);

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <BootstrapForm.Group controlId="subCampaignName" className="flex-grow-1">
            <BootstrapForm.Label>Tên chiến dịch con *</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              value={subCampaign.name}
              onChange={(e) => onUpdate({ ...subCampaign, name: e.target.value })}
              isInvalid={showErrors && !subCampaign.name}
            />
            {showErrors && !subCampaign.name && (
              <BootstrapForm.Control.Feedback type="invalid">
                Tên chiến dịch con là bắt buộc
              </BootstrapForm.Control.Feedback>
            )}
          </BootstrapForm.Group>
          
          <Button variant="danger" onClick={onDelete} title="Xóa chiến dịch con" className="d-flex align-items-center mt-4 ms-3">
            <i className="bi bi-trash" ></i> 
          </Button>
        </div>
        <BootstrapForm.Group controlId="subCampaignStatus">
          <BootstrapForm.Check
            type="checkbox"
            label="Đang hoạt động"
            checked={subCampaign.status}
            onChange={(e) => onUpdate({ ...subCampaign, status: e.target.checked })}
          />
        </BootstrapForm.Group>
        <h5>Danh sách quảng cáo</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
         
          {anyAdSelected && (
            <Button
              variant="danger"
              onClick={handleDeleteSelectedAds}
              title="Xóa quảng cáo đã chọn"
            >
              Xóa quảng cáo đã chọn
            </Button>
          )}
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <BootstrapForm.Check
                  type="checkbox"
                  label=""
                  checked={selectedAds.every((selected) => selected)}
                  onChange={(e) => handleSelectAllAds(e.target.checked)}
                />
              </th>
              <th>Tên quảng cáo *</th>
              <th>Số lượng *</th>
              <th>

              <Button
            variant="success"
            onClick={handleAddAd}
            title="Thêm quảng cáo"
          >
                       <i className="bi bi-plus"></i> 

          </Button>

              </th>
            </tr>
          </thead>
          <tbody>
            {subCampaign.ads.map((ad, index) => (
              <tr key={index}>
                <td>
                  <BootstrapForm.Check
                    type="checkbox"
                    checked={selectedAds[index]}
                    onChange={(e) => handleSelectAd(index, e.target.checked)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={ad.name}
                    onChange={(e) => handleAdUpdate(index, { ...ad, name: e.target.value })}
                    className={`form-control ${showErrors && !ad.name ? 'is-invalid' : ''}`}
                  />
                  {showErrors && !ad.name && (
                    <div className="invalid-feedback">Tên quảng cáo là bắt buộc</div>
                  )}
                </td>
                <td>
                  <input
                    type="number"
                    value={ad.quantity}
                    onChange={(e) => handleAdUpdate(index, { ...ad, quantity: +e.target.value })}
                    className={`form-control ${showErrors && ad.quantity <= 0 ? 'is-invalid' : ''}`}
                  />
                  {showErrors && ad.quantity <= 0 && (
                    <div className="invalid-feedback">Số lượng phải lớn hơn 0</div>
                  )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAd(index)}
                    title="Xóa quảng cáo"
                  >
                               <i className="bi bi-trash"></i>

                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default SubCampaign;