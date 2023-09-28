import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import customerFieldsData from '../../data/customer_fields.json';
import InputField from '../utils/InputField';
import generateElementUniqueID from '../utils/generateId';
import { CustomerContext } from '../../contexts/CustomerDataContext';
// Types ------------------------------------------------------------
type TCustomer = {
  customer_id: string;
} & Record<string, string>;

type TCustomers = { [key: string]: TCustomer };

type TFieldsType = {
  [key: string]: {
    displayName: string;
    displayType: string;
    displayResults: string[];
  };
};

type TProps = {
  customer: TCustomer;
  customerId: number;
  onRemoveCustomerSlot: (customerId: string) => void;
};

const CustomerInputLine = (props: TProps) => {

  const { onRemoveCustomerSlot, customer } = props;
  const customerFields: TFieldsType = customerFieldsData;
  const { customerData, setCustomerData } = useContext(CustomerContext);

  const handleUpdateCustomer = (
    targetId: string,
    updatedKey: keyof TCustomer,
    updatedValue: string,
  ) => {

    const updatedCustomerData: TCustomers = { ...customerData };
    updatedCustomerData[targetId][updatedKey] = updatedValue;
    setCustomerData(updatedCustomerData);
  };
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
                handleUpdateCustomer(customer.customer_id, keyName, updatedValue)
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
