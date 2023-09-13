import React, { useContext, useEffect } from 'react';
import { QuotesContext } from '../../contexts/QuotesContext';

// Types ------------------------------------------------------------
type Props = {
  quoteRefId: string;
};
// Main -------------------------------------------------------------
const PricingCurrent = (props: Props) => {
  // Props ----------------------------------------------------------
  const { quoteRefId } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  const { quotesData, setQuotesData } = useContext(QuotesContext);
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  // Handles --------------------------------------------------------
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return <div>£0</div>;
};

export default PricingCurrent;
