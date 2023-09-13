import React from 'react';
import PricingCurrent from './PricingCurrent';
// Types ------------------------------------------------------------
type Props = {
  product: string;
  quoteRefId: string;
};
// Main -------------------------------------------------------------
const Price = (props: Props) => {
  // Props ----------------------------------------------------------
  const { product, quoteRefId } = props;
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
            return <PricingCurrent quoteRefId={quoteRefId} />;
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
