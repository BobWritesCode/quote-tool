import { createContext, useState, ReactNode } from 'react';

// types ------------------------------------------------------------
type TCustomer = {
  customer_id: string;
  [key: string]: string | number;
};
type TCustomers = { [key: string]: TCustomer };
type CustomerContextType = {
  customerData: TCustomers;
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
  const [customerData, setCustomerData] = useState<TCustomers>({});
  return (
    <CustomerContext.Provider value={{ customerData, setCustomerData }}>
      {children}
    </CustomerContext.Provider>
  );
};
