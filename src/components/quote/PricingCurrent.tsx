import React, { useContext, useState } from 'react';
import { QuotesContext } from '../../contexts/QuotesContext';
import { CustomerContext } from '../../contexts/CustomerDataContext';

// Types ------------------------------------------------------------
type TProps = {
  quoteRefId: string;
  customerRefId: string;
};
// Main -------------------------------------------------------------
const PricingCurrent = (props: TProps) => {
  // Props ----------------------------------------------------------
  const { quoteRefId, customerRefId } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  const { quotesData} = useContext(QuotesContext);
  // const { customerData } = useContext(CustomerContext);
  // Variables ------------------------------------------------------
  // const [prodCode, setProdCode] = useState('')
  // Data -----------------------------------------------------------
  // Handles --------------------------------------------------------
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return <div>{}</div>;
};

export default PricingCurrent;
