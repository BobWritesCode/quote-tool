import React, { useContext, useState } from 'react';
import CustomerInputLine from './CustomerInputLine';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import { CustomerContext } from '../../contexts/CustomerDataContext';
import customerFieldsData from '../../data/customer_fields.json';
import Table from 'react-bootstrap/Table';
import { QuotesContext } from '../../contexts/QuotesContext';
// Types ------------------------------------------------------------
type Customer = {
  customer_id: string;
  [key: string]: string | number;
};
// Main -------------------------------------------------------------
const CustomerContainer = () => {
  // Props ----------------------------------------------------------
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  const { customerData, setCustomerData } = useContext(CustomerContext);
  const { quotesData, setQuotesData } = useContext(QuotesContext);
  // Variables ------------------------------------------------------
  // set up key for slots components
  const [nextCustomerId, setNextCustomerId] = useState(0);
  // Data -----------------------------------------------------------
  // Handles --------------------------------------------------------
  /**
   * Add customer input row, and add customer too all quotes.
   */
  const handleAddCustomerSlot = () => {
    const newCustomer: Customer = {
      customer_id: String(nextCustomerId),
    };
    const updatedCustomers = { ...customerData };
    updatedCustomers[nextCustomerId] = newCustomer;
    setCustomerData(updatedCustomers);
    setNextCustomerId(nextCustomerId + 1);
    // Add customer to all quotes
    const updatedQuotes = { ...quotesData };
    for (const quote in updatedQuotes) {
      updatedQuotes[quote][nextCustomerId] = {};
    }
    setQuotesData(updatedQuotes);
  };
  /**
   * Remove customer input row, and remove customer from all quotes.
   * @param e Customer ID to remove
   */
  const handleRemoveCustomerSlot = (e: any) => {
    const updatedCustomers = { ...customerData };
    delete updatedCustomers[e];
    setCustomerData(updatedCustomers);
    // Remove customer from all quotes
    const updatedQuotes = { ...quotesData };
    for (const quote in updatedQuotes) {
      delete updatedQuotes[quote][e];
    }
    setQuotesData(updatedQuotes);
  };
  /**
   * Update customer dict
   * @param e Customer data to update
   */
  const handleUpdate = (
    targetId: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedCustomers: any = { ...customerData };
    const fieldName = e.target.name as keyof Customer;
    const fieldValue = e.target.value;
    updatedCustomers[targetId][fieldName] = fieldValue;
    setCustomerData(updatedCustomers);
  };
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
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
