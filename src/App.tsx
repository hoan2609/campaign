import React, { useState } from 'react';
import { Container, Tab, Tabs, Button, Alert } from 'react-bootstrap';
import { Campaign } from './types';
import SubCampaign from './components/Campaign';

const App: React.FC = () => {
  const [campaign, setCampaign] = useState<Campaign>({
    information: { name: '', describe: '' },
    subCampaigns: [
      { name: 'Chiến dịch con 1', status: true, ads: [{ name: '', quantity: 1 }] }
    ]
  });

  const [showErrors, setShowErrors] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validate = () => {
    const errors: string[] = [];

    if (!campaign.information.name) {
      errors.push('Tên chiến dịch là bắt buộc');
    }

    campaign.subCampaigns.forEach((subCampaign, index) => {
      if (!subCampaign.name) {
        errors.push(`Tên chiến dịch con ${index + 1} là bắt buộc`);
      }

      if (subCampaign.ads.length === 0) {
        errors.push(`Chiến dịch con ${index + 1} phải có ít nhất 1 quảng cáo`);
      } else {
        subCampaign.ads.forEach((ad, adIndex) => {
          if (!ad.name) {
            errors.push(`Tên quảng cáo trong chiến dịch con ${index + 1} là bắt buộc`);
          }
          if (ad.quantity <= 0) {
            errors.push(`Số lượng quảng cáo trong chiến dịch con ${index + 1} phải lớn hơn 0`);
          }
        });
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      alert('Thành công');
    } else {
      setShowErrors(true);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Quản lý Chiến Dịch</h1>
      <Tabs defaultActiveKey="info" id="campaign-tabs" className="mb-3">
        <Tab eventKey="info" title="Thông tin">
          <div className="my-3">
            <form>
              <div className="mb-3">
                <label className="form-label">Tên chiến dịch *</label>
                <input
                  type="text"
                  className={`form-control ${showErrors && !campaign.information.name ? 'is-invalid' : ''}`}
                  value={campaign.information.name}
                  onChange={(e) => setCampaign({ ...campaign, information: { ...campaign.information, name: e.target.value } })}
                />
                {showErrors && !campaign.information.name && (
                  <div className="invalid-feedback">Tên chiến dịch là bắt buộc</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <input
                  type="text"
                  className="form-control"
                  value={campaign.information.describe || ''}
                  onChange={(e) => setCampaign({ ...campaign, information: { ...campaign.information, describe: e.target.value } })}
                />
              </div>
            </form>
          </div>
        </Tab>
        <Tab eventKey="subCampaigns" title="Chiến dịch con">
          <div className="my-3">
            {campaign.subCampaigns.map((subCampaign, index) => (
              <SubCampaign
                key={index}
                subCampaign={subCampaign}
                onUpdate={(updatedSubCampaign) => {
                  const updatedSubCampaigns = [...campaign.subCampaigns];
                  updatedSubCampaigns[index] = updatedSubCampaign;
                  setCampaign({ ...campaign, subCampaigns: updatedSubCampaigns });
                }}
                onDelete={() => {
                  const updatedSubCampaigns = campaign.subCampaigns.filter((_, i) => i !== index);
                  setCampaign({ ...campaign, subCampaigns: updatedSubCampaigns });
                }}
                showErrors={showErrors}
              />
            ))}
            <Button
              variant="success"
              className="mt-3"
              onClick={() => setCampaign({
                ...campaign,
                subCampaigns: [...campaign.subCampaigns, { name: '', status: true, ads: [{ name: '', quantity: 1 }] }]
              })}
            >
              Thêm Chiến dịch con
            </Button>
          </div>
        </Tab>
      </Tabs>
      {showErrors && validationErrors.length > 0 && (
        <Alert variant="danger">
          {validationErrors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </Alert>
      )}
      <div className="d-flex justify-content-end mt-3">
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </div>
    </Container>
  );
};

export default App;