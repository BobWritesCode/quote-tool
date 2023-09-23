import React, { useState, useContext, useEffect, useRef } from 'react';
import quoteFieldsData from '../../data/quote_fields.json';
import InputField from '../utils/InputField';
import Price from './Price';
import generateElementUniqueID from '../utils/generateId';
import { QuotesContext } from '../../contexts/QuotesContext';
import funcSetDefaultQuoteValues from '../../functions/funcSetDefaultQuoteValues';
import funcResultsToDisplay from '../../functions/funcResultsToDisplay';
// Types ------------------------------------------------------------
type CustomerOptions = {
  displayName: string;
  displayType: string;
  displayResults: string[];
};
type ProductOptions = {
  displayName: string;
} & Record<string, any>;
type QuoteFields = {
  [key: string]: any;
};
type Customer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: number;
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
  const isInitialRender = useRef(true);
  // Contexts -------------------------------------------------------
  const [product, setProduct] = useState('');
  const { quotesData, setQuotesData } = useContext(QuotesContext);
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
    const cust_id = customer.customer_id;
    if (updatedKey === 'quoteProduct') {
      setProduct(updatedValue);
      const updatedQuotes = funcSetDefaultQuoteValues(
        quotesData,
        quote_ref_id,
        cust_id,
        quoteFields[range]['ProductOptions'],
        range,
        updatedValue,
      );
      setQuotesData(updatedQuotes);
    } else {
      onChange(
        // Customer id to update.
        cust_id,
        // Quote Id to update.
        quote_ref_id,
        // Key to update.
        updatedKey,
        // Update value to...
        updatedValue,
      );
    }
  };
  // Effects --------------------------------------------------------

  useEffect(() => {
    if (isInitialRender.current) {
      // Sets product for customer to first product in range on first render.
      setProduct(quoteFields[range]['Customer']["quoteProduct"]["displayResults"][0]);
    }
  }, [quoteFields, range]);

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
            quote={quotesData[quote_ref_id]}
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
          displayResults={funcResultsToDisplay(
            quotesData,
            quote_ref_id,
            key[product]['displayResults'],
          )}
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
