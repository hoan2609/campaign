import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Card } from 'react-bootstrap';
import { Campaign } from '../types';

interface CampaignInfoProps {
  campaign: Campaign['information'];
  onUpdate: (values: Campaign['information']) => void;
  showErrors: boolean;
}

const CampaignInfoSchema = Yup.object().shape({
  name: Yup.string().required('Tên chiến dịch là bắt buộc')
});

const CampaignInfo: React.FC<CampaignInfoProps> = ({ campaign, onUpdate, showErrors }) => {
  return (
    <Formik
      initialValues={campaign}
      validationSchema={CampaignInfoSchema}
      onSubmit={onUpdate}
    >
      {({ handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Card>
            <Card.Body>
              <BootstrapForm.Group controlId="campaignName">
                <BootstrapForm.Label>Tên chiến dịch *</BootstrapForm.Label>
                <Field name="name" className="form-control" />
                {showErrors && <ErrorMessage name="name" component="div" className="text-danger" />}
              </BootstrapForm.Group>
              <BootstrapForm.Group controlId="campaignDescribe">
                <BootstrapForm.Label>Mô tả</BootstrapForm.Label>
                <Field name="describe" as="textarea" className="form-control" />
              </BootstrapForm.Group>
              <Button type="submit">Lưu</Button>
            </Card.Body>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default CampaignInfo;