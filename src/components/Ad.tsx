import React from 'react';
import { Ad as AdType } from '../types';
import { Button, Form as BootstrapForm } from 'react-bootstrap';

interface AdProps {
  ad: AdType;
  onUpdate: (values: AdType) => void;
  onDelete: () => void;
  showErrors: boolean;
  selected: boolean;
  onSelect: (selected: boolean) => void;
}

const Ad: React.FC<AdProps> = ({ ad, onUpdate, onDelete, showErrors, selected, onSelect }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...ad, name: e.target.value });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);
    if (quantity > 0) {
      onUpdate({ ...ad, quantity });
    }
  };

  return (
    <tr>
      <td>
        <BootstrapForm.Check
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
        />
      </td>
      <td>
        <BootstrapForm.Control
          type="text"
          value={ad.name}
          onChange={handleNameChange}
          isInvalid={showErrors && !ad.name}
        />
        {showErrors && !ad.name && (
          <BootstrapForm.Control.Feedback type="invalid">
            Tên quảng cáo là bắt buộc
          </BootstrapForm.Control.Feedback>
        )}
      </td>
      <td>
        <BootstrapForm.Control
          type="number"
          value={ad.quantity}
          onChange={handleQuantityChange}
          isInvalid={showErrors && ad.quantity <= 0}
        />
        {showErrors && ad.quantity <= 0 && (
          <BootstrapForm.Control.Feedback type="invalid">
            Số lượng phải lớn hơn 0
          </BootstrapForm.Control.Feedback>
        )}
      </td>
      <td>
        <Button variant="link" onClick={onDelete} className="icon-button" title="Xóa quảng cáo">
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default Ad;