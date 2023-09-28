import React from 'react';
import Button from 'react-bootstrap/Button';
import customerFieldsData from '../../data/customer_fields.json';
import InputField from '../utils/InputField';
import generateElementUniqueID from '../utils/generateId';
// Types ------------------------------------------------------------
type TCustomer = {
  customer_id: string;
} & Record<string, string>;


type TFieldsType = {
  [key: string]: {
    displayName: string;
    displayType: string;
    displayResults: string[];
  };
};

// Main -------------------------------------------------------------
const CustomerInputLine = (props: TProps) => {
  // Props ----------------------------------------------------------
  const { onRemoveCustomerSlot, customer, onUpdate } = props;
  const customerFields: TFieldsType = customerFieldsData;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <tr>
      {Object.keys(customerFields).map((keyName, index) => {
        const {
          displayName,
          displayType,
          displayResults,
        }: {
          displayName: string;
          displayType: string;
          displayResults: string[];
        } = customerFields[keyName];

        return (
          <td key={index}>
            <InputField
              elementIdToUse={generateElementUniqueID()}
              displayType={displayType}
              displayName={displayName}
              displayResults={displayResults}
              onChange={(updatedValue: string) =>
                onUpdate(customer.customer_id, keyName, updatedValue)
              }
            />
          </td>
        );
      })}
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
