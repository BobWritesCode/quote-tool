import React, { useState, useEffect, useContext } from 'react';
import quoteFieldsData from '../../data/quote_fields.json';
import InputField from '../utils/InputField';
import Price from './Price';
import generateElementUniqueID from '../utils/generateId';
import { QuotesContext } from '../../contexts/QuotesContext';
// Types ------------------------------------------------------------
type CustomerOptions = {
  displayName: string;
  displayType: string;
  displayResults: string[];
};
type ProductOptions = {
  displayName: string;
} & Record<string, any>;
//   [key: string]: {
//     displayType: string;
//     displayResults: string[];
//   };
// };
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
  currency: string | number;
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
  const { customer, range, quote_ref_id, currency, onChange } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  const [product, setProduct] = useState('');
  const { quotesData } = useContext(QuotesContext);
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  const quoteFields: QuoteFields = quoteFieldsData;
  // Handles --------------------------------------------------------
  /**
   *
   * @param updatedValue
   * @param updatedKey
   */
  const handleChange = (updatedValue: string, updatedKey: string) => {
    if (updatedKey === 'quoteProduct') {
      setProduct(updatedValue);
    }
    onChange(
      // Customer id to update.
      customer.customer_id,
      // Quote Id to update.
      quote_ref_id,
      // Key to update.
      updatedKey,
      // Update value to...
      updatedValue,
    );
  };
  /**
   * Checks to see if there is result variable is set to choose the
   * correct variable. For example if displayResultVariable is set
   * to "currency", and the currency selected is "EUR", then
   * the "EUR" array from displayResults is returned.
   * @param displayResults A table of results.
   * @returns The correct array of results if there is a
   * displayResultVariable set in the table.
   */
  const handleDisplayResults = (displayResults: any) => {
    if (displayResults.displayResultVariable) {
      displayResults =
        displayResults[
          quotesData[quote_ref_id]['global'][
            `${displayResults.displayResultVariable}`
          ]
        ];
    }
    return displayResults;
  };
  // Effects --------------------------------------------------------
  // JSX build section ----------------------------------------------
  const showCustomerFields = () => {
    return Object.values<CustomerOptions>(quoteFields[range]['Customer']).map(
      ({ displayName, displayType, displayResults }, index: number) => (
        <td key={index}>
          <InputField
            elementIdToUse={generateElementUniqueID()}
            displayName={displayName}
            displayType={displayType}
            displayResults={displayResults}
            customer={customer}
            onChange={(updatedValue: string) =>
              handleChange(
                updatedValue,
                `${Object.keys(quoteFields[range]['Customer'])[index]}`,
              )
            }
          />
        </td>
      ),
    );
  };

  const showProductFields = () => {
    return Object.values<ProductOptions>(
      quoteFields[range]['ProductOptions'],
    ).map((key, index) => (
      <td key={index}>
        <InputField
          elementIdToUse={generateElementUniqueID()}
          displayName={key.displayName}
          displayType={key[product]['displayType']}
          displayResults={handleDisplayResults(key[product]['displayResults'])}
          // productCode={prodCode}
          customer={customer}
          onChange={(updatedValue: string) =>
            handleChange(
              updatedValue,
              `${Object.keys(quoteFields[range]['ProductOptions'])[index]}`,
            )
          }
        />
      </td>
    ));
  };

  const showPriceField = () => {
    return (
      <td>
        <Price
          product={'Current'}
          customerRefId={String(customer.customer_id)}
          quoteRefId={quote_ref_id}
        />
      </td>
    );
  };

  // Return ---------------------------------------------------------
  return (
    <>
      {showCustomerFields()}
      {product && showProductFields()}
      {showPriceField()}
    </>
  );
};

export default QuoteLineComp;
