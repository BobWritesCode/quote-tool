import React from 'react';
import Button from 'react-bootstrap/Button';
import customerFieldsData from '../../data/customer_fields.json';
import CustomerInputField from './CustomerInputField';

type Customer = {
  customer_id: number;
  first_name: string;
  initials: string;
  last_name: string;
  dob: string;
  nationality: string;
  residence_country: string;
  [key: string]: string | number;
};

type Props = {
  customer: Customer;
  customerId: number;
  onUpdate: (targetId: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveCustomerSlot: (customerId: number) => void;
};

const CustomerInputLine = (props: Props) => {
  const { onRemoveCustomerSlot, customer , onUpdate } = props;

  // Allow user to edit form.
  const handleChange =
    (targetId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate(targetId, e);
    };

  // Return ------------------
  return (
    <tr>
      {Object.entries(customerFieldsData).map(
        ([fieldName, fieldData], index) => (
          <CustomerInputField
            key={index}
            dataName={fieldName}
            data={fieldData}
            value={customer[fieldName]}
            onUpdate={handleChange(customer.customer_id)}
          />
        ),
      )}
      <td>
        <Button
          variant="danger"
          onClick={() => onRemoveCustomerSlot(customer.customer_id)}
        >
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default CustomerInputLine;
