import { createContext, useContext, useState, ReactNode  } from 'react';

const CustomerDataContext = createContext({});
const SetCustomerDataContext = createContext({});

export const useCustomerData = () => useContext(CustomerDataContext);
export const useSetCustomerData = () => useContext(SetCustomerDataContext);

export const CustomerDataProvider = ({ children }: { children: ReactNode }) => {
  const [customerData, setCustomerData] = useState({
    Customers: { results: [] },
  });

  return (
    <CustomerDataContext.Provider value={customerData}>
      <SetCustomerDataContext.Provider value={{ setCustomerData }}>
        {children}
      </SetCustomerDataContext.Provider>
    </CustomerDataContext.Provider>
  );
};
