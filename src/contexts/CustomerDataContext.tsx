import { createContext, useState, ReactNode } from 'react';

// types ------------------------------------------------------------
type TCustomer = {
  customer_id: string;
} & Record<string, any>;

type TCustomers = { [key: string]: TCustomer };

type TCustomerContextType = {
  customerData: TCustomers;
  setCustomerData: React.Dispatch<any>;
};
// exports ----------------------------------------------------------
export const CustomerContext = createContext<TCustomerContextType>({
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
