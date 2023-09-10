import { createContext, useState, ReactNode } from 'react';

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

type CustomerContextType = {
  customerData: Customers;
  setCustomerData: React.Dispatch<any>;
};

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
