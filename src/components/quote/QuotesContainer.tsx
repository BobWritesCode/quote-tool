import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import QuoteContainer from './QuoteContainer';
import { QuotesContext } from '../../contexts/QuotesContext';

// Types ------------------------------------------------------------
type QuoteLine = {
  [key: string]: string | number;
};
type Quote = {
  quote_ref_id: string;
  quoteLines: QuoteLine[];
};
// Main -------------------------------------------------------------
const QuotesContainer = () => {
  // Props ----------------------------------------------------------
  // Refs -----------------------------------------------------------
  const wasCalled = useRef(false); // Checks for first render
  // Contexts -------------------------------------------------------
  const { quotesData, setQuotesData } = useContext(QuotesContext);
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  const [nextTempQuoteId, setNextTempQuoteId] = useState(10);
  // Handles --------------------------------------------------------
  /**
   *
   */
  const handleAddQuoteSlot = useCallback(() => {
    const newQuote: Quote = {
      quote_ref_id: String(nextTempQuoteId),
      quoteLines: [],
    };
    setNextTempQuoteId(nextTempQuoteId + 1);
    setQuotesData((prevQuotes: Quote) => ({
      ...prevQuotes,
      [String(nextTempQuoteId)]: newQuote,
    }));
  }, [nextTempQuoteId, setQuotesData]);
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
  }, [handleAddQuoteSlot]);
  //  Return --------------------------------------------------------
  return (
    <div>
      {/* Show quote slots */}
      {Object.values(quotesData).map((quote, i) => (
        <QuoteContainer
          key={quote.quote_ref_id}
          quote_ref_id={quote.quote_ref_id}
          onAddQuote={handleAddQuoteSlot}
          onRemoveQuote={handleRemoveQuoteSlot}
        />
      ))}
    </div>
  );
};

export default QuotesContainer;
