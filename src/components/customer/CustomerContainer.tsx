import React, { useContext, useState } from 'react';
import CustomerInput from './CustomerInput';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import { CustomerContext } from '../../contexts/CustomerDataContext';

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
    const updatedCustomers = { ...customerData };
    delete updatedCustomers[e];
    setCustomerData(updatedCustomers);
  };

  /**
   * Update customer dict
   * @param e Customer data to update
   */
  const handleUpdate = (e: any) => {
    const updatedCustomers = { ...customerData };
    updatedCustomers[e.customer_id] = e;
    setCustomerData(updatedCustomers);
  };

  // Return ------------------
  return (
    <div className={`${appStyles.Box} mb-2 p-3`}>
      {/* Show customer slots */}
      {Object.values(customerData).map((customer, i) => (
        <CustomerInput
          key={customer.customer_id}
          id={customer.customer_id}
          data={customer}
          onRemoveCustomerSlot={handleRemoveCustomerSlot}
          onUpdate={handleUpdate}
        />
      ))}

      {/* Add person button */}
      <Button variant="primary" onClick={handleAddCustomerSlot}>
        Add person
      </Button>
    </div>
  );
};

export default CustomerContainer;
