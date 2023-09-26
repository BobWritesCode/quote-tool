import React from 'react';
import PricingCurrent from './PricingCurrent';
// Types ------------------------------------------------------------
type TProps = {
  product: string;
  quoteRefId: string;
  customerRefId: string;
};
// Main -------------------------------------------------------------
const Price = (props: TProps) => {
  // Props ----------------------------------------------------------
  const { product, quoteRefId, customerRefId } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  // Handles --------------------------------------------------------
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <>
      {(() => {
        switch (product) {
          case 'Current':
            return <PricingCurrent quoteRefId={quoteRefId} customerRefId={customerRefId} />;
          case 'Legacy':
            return 'Banana is good!';
          default:
            return 'N/A';
        }
      })()}
    </>
  );
};

export default Price;
