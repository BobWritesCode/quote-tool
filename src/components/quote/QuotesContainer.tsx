import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import QuoteContainer from './QuoteContainer';
import { QuotesContext } from '../../contexts/QuotesContext';
import { CustomerContext } from '../../contexts/CustomerDataContext';

// Types ------------------------------------------------------------
type QuoteLine = {
  [key: string]: string | number;
};
type Quote = {
  [key: string]: QuoteLine;
};
type Quotes = {
  [key: string]: Quote;
};
// Main -------------------------------------------------------------
const QuotesContainer = () => {
  // Props ----------------------------------------------------------
  // Refs -----------------------------------------------------------
  const wasCalled = useRef(false); // Checks for first render
  // Contexts -------------------------------------------------------
  const { quotesData, setQuotesData } = useContext(QuotesContext);
  const { customerData } = useContext(CustomerContext);
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  const [nextTempQuoteId, setNextTempQuoteId] = useState(10);
  // Handles --------------------------------------------------------
  /**
   *
   */
  const handleAddQuoteSlot = useCallback(() => {
    const newQuote: Quote = {
      global: {}, // Add a "global" entry with an empty object
      ...Object.keys(customerData).reduce((acc: any, customerId: any) => {
        acc[customerId] = {};
        return acc;
      }, {}),
    };
    setNextTempQuoteId(nextTempQuoteId + 1);
    setQuotesData((prevQuotes: Quote) => ({
      ...prevQuotes,
      [String(nextTempQuoteId)]: newQuote,
    }));
  }, [nextTempQuoteId, setQuotesData, customerData]);
  /**
   *
   */
  const handleRemoveQuoteSlot = (target_quote_ref_id: string | number) => {
    const updatedQuotes = { ...quotesData };
    delete updatedQuotes[String(target_quote_ref_id)];
    setQuotesData(updatedQuotes);
  };
  // Effects --------------------------------------------------------

  /**
   *
   */
  useEffect(() => {
    // Checks for for first render. If first render then aborts.
    if (wasCalled.current) return;
    wasCalled.current = true;
    handleAddQuoteSlot();
  });
  //  Return --------------------------------------------------------
  return (
    <div>
      {/* Show quote slots */}
      {Object.keys(quotesData).map((key, i) => (
        <QuoteContainer
          key={key}
          quote_ref_id={key}
          onAddQuote={handleAddQuoteSlot}
          onRemoveQuote={handleRemoveQuoteSlot}
        />
      ))}
    </div>
  );
};

export default QuotesContainer;
