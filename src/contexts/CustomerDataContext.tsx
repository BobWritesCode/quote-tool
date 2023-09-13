import { createContext, useState, ReactNode } from 'react';

// types ------------------------------------------------------------
type Customer = {
  customer_id: number;
  [key: string]: string | number;
};
type Customers = { [key: string]: Customer };
type CustomerContextType = {
  customerData: Customers;
  setCustomerData: React.Dispatch<any>;
};
// exports ----------------------------------------------------------
export const CustomerContext = createContext<CustomerContextType>({
  customerData: {},
  setCustomerData: () => {},
});
export const CustomerContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [customerData, setCustomerData] = useState<Customers>({});
  return (
    <CustomerContext.Provider value={{ customerData, setCustomerData }}>
      {children}
    </CustomerContext.Provider>
  );
};
