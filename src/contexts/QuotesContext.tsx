import { createContext, useState, ReactNode } from 'react';

// Types ------------------------------------------------------------
type QuoteLine = {
  [key: string]: string | number;
};
type Quote = {
  [key: string]: QuoteLine[];
};
type Quotes = {
  [key: string]: Quote[];
};
type QuotesContextType = {
  quotesData: Quotes;
  setQuotesData: React.Dispatch<any>;
};

// Exports ----------------------------------------------------------
export const QuotesContext = createContext<QuotesContextType>({
  quotesData: {},
  setQuotesData: () => {},
});

export const QuotesContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [quotesData, setQuotesData] = useState<Quotes>({});

  return (
    <QuotesContext.Provider value={{ quotesData, setQuotesData }}>
      {children}
    </QuotesContext.Provider>
  );
};
