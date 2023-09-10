import React, { useState } from 'react';
import CustomerInput from './CustomerInput';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';

type Customer = {
  customer_id: number;
  first_name: string;
  initials: string;
  last_name: string;
  dob: string;
  nationality: string;
  residence_country: string;
};

type Customers = { [key: string]: Customer };

type Slot = Customer;

const CustomerContainer = () => {
  // set up key for slots components
  const [customers, setCustomers] = useState<Customers>({});

  const [nextCustomerId, setNextCustomerId] = useState(10);

  // Add a player slot to the form
  const handleAddCustomerSlot = () => {
    const newSlot: Slot = {
      customer_id: nextCustomerId,
      first_name: '', // Initialize the properties with default values
      initials: '',
      last_name: '',
      dob: '',
      nationality: '',
      residence_country: '',
    };
    setNextCustomerId(nextCustomerId + 1);
    setCustomers((prevCustomers) => ({
      ...prevCustomers,
      [nextCustomerId]: newSlot, // Assign the new customer using the nextCustomerId as the key
    }));
  };

  /**
   * Remove customer input row
   * @param e Customer ID to remove
   */
  const handleRemoveCustomerSlot = (e: any) => {
    const updatedCustomers = { ...customers };
    delete updatedCustomers[e];
    setCustomers(updatedCustomers);
  };

  // Return ------------------
  return (
    <div className={`${appStyles.Box} mb-2 p-3`}>
      {/* Show customer slots */}
      {Object.values(customers).map((customer, i) => (
        <CustomerInput
          key={customer.customer_id}
          id={i}
          data={customer}
          onRemoveCustomerSlot={handleRemoveCustomerSlot}
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
