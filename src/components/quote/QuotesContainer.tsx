import React, { useCallback, useEffect, useRef, useState } from 'react';
import QuoteContainer from './QuoteContainer';

type Quote = {
  temp_quote_id: number;
};

type Quotes = { [key: string]: Quote };

const QuotesContainer = () => {
  // set up key for slots components
  const [quotes, setQuotes] = useState<Quotes>({});
  // set up for temp quote id for new quotes
  const [nextTempQuoteId, setNextTempQuoteId] = useState(10);
  // Checks for first render
  const wasCalled = useRef(false);

  // Add new quote
  const handleAddQuoteSlot = useCallback(() => {
    const newQuote: Quote = {
      temp_quote_id: nextTempQuoteId,
    };
    setNextTempQuoteId(nextTempQuoteId + 1);
    setQuotes((prevQuotes) => ({
      ...prevQuotes,
      [nextTempQuoteId]: newQuote,
    }));
  }, [nextTempQuoteId]);

  useEffect(() => {
    // Checks for for first render. If first render then aborts.
    if (wasCalled.current) return;
    wasCalled.current = true;
    handleAddQuoteSlot();
  }, [handleAddQuoteSlot]);

  // Remove quote
  const handleRemoveQuoteSlot = (e: any) => {
    const updatedQuotes = { ...quotes };
    delete updatedQuotes[e];
    setQuotes(updatedQuotes);
  };

  return (
    <div>
      {/* Show quote slots */}
      {Object.values(quotes).map((quote, i) => (
        <QuoteContainer
          key={quote.temp_quote_id}
          quoteData={quote}
          onAddQuoteSlot={handleAddQuoteSlot}
          onRemoveQuoteSlot={handleRemoveQuoteSlot}
        />
      ))}
    </div>
  );
};

export default QuotesContainer;
