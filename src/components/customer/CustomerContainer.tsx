import React, { useContext, useState } from 'react';
import CustomerInputLine from './CustomerInputLine';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import { CustomerContext } from '../../contexts/CustomerDataContext';
import customerFieldsData from '../../data/customer_fields.json';
import Table from 'react-bootstrap/Table';

type Customer = {
  customer_id: number;
  first_name: string;
  initials: string;
  last_name: string;
  dob: string;
  nationality: string;
  residence_country: string;
};

const CustomerContainer = () => {
  const { customerData, setCustomerData } = useContext(CustomerContext);

  // set up key for slots components
  const [nextCustomerId, setNextCustomerId] = useState(0);

  // Add a player slot to the form
  const handleAddCustomerSlot = () => {
    const newCustomer: Customer = {
      customer_id: Number(nextCustomerId),
      first_name: '',
      initials: '',
      last_name: '',
      dob: '',
      nationality: '',
      residence_country: '',
    };
    // Update customerData using the numeric key
    const updatedCustomers = { ...customerData };
    updatedCustomers[nextCustomerId] = newCustomer;
    setCustomerData(updatedCustomers);
    setNextCustomerId(nextCustomerId + 1);
  };

  /**
   * Remove customer input row
   * @param e Customer ID to remove
   */
  const handleRemoveCustomerSlot = (e: any) => {
    console.log('REMOVED', e, customerData);
    const updatedCustomers = { ...customerData };
    delete updatedCustomers[e];
    console.log('updatedCustomers', updatedCustomers);
    setCustomerData(updatedCustomers);
  };

  /**
   * Update customer dict
   * @param e Customer data to update
   */
  const handleUpdate = (
    targetId: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedCustomers: any = { ...customerData };
    const fieldName = e.target.name as keyof Customer;
    const fieldValue = e.target.value;
    updatedCustomers[targetId][fieldName] = fieldValue;
    setCustomerData(updatedCustomers);
  };

  // Return ------------------
  return (
    <div className={`${appStyles.Box} mb-2 p-3`}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {Object.values(customerFieldsData).map((key, index) => (
              <th key={index}>{key[0]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(customerData).map((customer, ind) => (
            <CustomerInputLine
              key={ind}
              customer={customer}
              customerId={nextCustomerId}
              onRemoveCustomerSlot={handleRemoveCustomerSlot}
              onUpdate={(targetId, e) => handleUpdate(targetId, e)}
            />
          ))}
        </tbody>
      </Table>
      {/* Add person button */}
      <Button variant="primary" onClick={handleAddCustomerSlot}>
        Add person
      </Button>
    </div>
  );
};

export default CustomerContainer;
