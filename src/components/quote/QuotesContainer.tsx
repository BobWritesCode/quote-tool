import React, { useCallback, useEffect, useRef, useState } from 'react';
import QuoteContainer from './QuoteContainer';

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
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  const [nextTempQuoteId, setNextTempQuoteId] = useState(10);
  // Handles --------------------------------------------------------
  /**
   *
   */
  const handleAddQuoteSlot = useCallback(() => {
    const newQuote: Quote = {
      temp_quote_id: nextTempQuoteId,
    };
    setNextTempQuoteId(nextTempQuoteId + 1);
    setQuotes((prevQuotes) => ({
      ...prevQuotes,
      [nextTempQuoteId]: newQuote,
    }));
  /**
   *
   */
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
      {Object.values(quotes).map((quote, i) => (
        <QuoteContainer
          key={quote.temp_quote_id}
          quoteData={quote}
          onAddQuote={handleAddQuoteSlot}
          onRemoveQuote={handleRemoveQuoteSlot}
        />
      ))}
    </div>
  );
};

export default QuotesContainer;
