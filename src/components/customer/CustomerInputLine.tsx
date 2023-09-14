import React from 'react';
import Button from 'react-bootstrap/Button';
import customerFieldsData from '../../data/customer_fields.json';
import InputField from '../utils/InputField';
// Types ------------------------------------------------------------
type Customer = {
  customer_id: string;
  [key: string]: string | number;
};
type Props = {
  customer: Customer;
  customerId: number;
  onUpdate: (
    targetId: string,
    updatedKey: string,
    updatedValue: string,
  ) => void;
  onRemoveCustomerSlot: (customerId: string) => void;
};
// Main -------------------------------------------------------------
const CustomerInputLine = (props: Props) => {
  // Props ----------------------------------------------------------
  const { onRemoveCustomerSlot, customer, onUpdate } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <tr>
      {Object.entries(customerFieldsData).map(
        ([keyName, [displayName, displayType, displayResults]], index) => (
          <td>
            <InputField
              key={index}
              displayType={displayType}
              displayName={displayName}
              displayResults={displayResults}
              onChange={(updatedValue: string) =>
                onUpdate(customer.customer_id, keyName, updatedValue)
              }
            />
          </td>
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
