import React from 'react';
import Button from 'react-bootstrap/Button';
import customerFieldsData from '../../data/customer_fields.json';
import InputField from '../utils/InputField';
// Types ------------------------------------------------------------
type Customer = {
  customer_id: number;
  [key: string]: string | number;
};
type Props = {
  customer: Customer;
  customerId: number;
  onUpdate: (targetId: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveCustomerSlot: (customerId: number) => void;
};
// Main -------------------------------------------------------------
const CustomerInputLine = (props: Props) => {
  // Props ----------------------------------------------------------
  const { onRemoveCustomerSlot, customer, onUpdate } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  // Allow user to edit form.
  const handleChange =
    (targetId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdate(targetId, e);
    };
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <tr>
      {Object.entries(customerFieldsData).map(
        ([fieldName, fieldData], index) => (
          <InputField
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
