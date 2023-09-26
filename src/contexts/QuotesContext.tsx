import { createContext, useState, ReactNode } from 'react';

// Types ------------------------------------------------------------
type TQuoteLine = {
  [key: string]: string | number | string[];
};
type TQuote = {
  [key: string]: TQuoteLine;
};
type TQuotes = {
  [key: string]: TQuote;
};
type QuotesContextType = {
  quotesData: TQuotes;
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
  const [quotesData, setQuotesData] = useState<TQuotes>({});

  return (
    <QuotesContext.Provider value={{ quotesData, setQuotesData }}>
      {children}
    </QuotesContext.Provider>
  );
};
