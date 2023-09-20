import React from 'react';
import quoteFieldsData from '../../data/quote_fields.json';
import InputField from '../utils/InputField';
import Price from './Price';
import generateElementUniqueID from '../utils/generateId';
// Types ------------------------------------------------------------
type LineItem = {
  displayName: string;
  displayType: string;
  displayResults: string[];
};
type QuoteFields = {
  [key: string]: any;
};
type Customer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: string;
  residence_country?: string;
};
type Props = {
  customer: Customer;
  range: string;
  quote_ref_id: string;
  onChange: (
    customer_id: string,
    quote_ref_id: string,
    updatedKey: string,
    updatedValue: string | number,
  ) => void;
};
// Main -------------------------------------------------------------
const QuoteLineComp = (props: Props) => {
  // Props ----------------------------------------------------------
  const { customer, range, quote_ref_id, onChange } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  const quoteFields: QuoteFields = quoteFieldsData;
  // Handles --------------------------------------------------------
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <>
      {Object.values<LineItem>(quoteFields.lines[range]).map(
        (
          { displayName, displayType, displayResults }: LineItem,
          index: number,
        ) => (
          <td key={index}>
            <InputField
              elementIdToUse={generateElementUniqueID()}
              displayName={displayName}
              displayType={displayType}
              displayResults={displayResults}
              customer={customer}
              onChange={(updatedValue: string) =>
                onChange(
                  customer.customer_id,
                  quote_ref_id,
                  `${Object.keys(quoteFields.lines[range])}`,
                  updatedValue,
                )
              }
            />
          </td>
        ),
      )}

      <td>
        <Price
          product={'Current'}
          customerRefId={String(customer.customer_id)}
          quoteRefId={quote_ref_id}
        />
      </td>
    </>
  );
};

export default QuoteLineComp;
