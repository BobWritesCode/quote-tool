import React, { useState, useEffect } from 'react';
import quoteFieldsData from '../../data/quote_fields.json';
import InputField from '../utils/InputField';
import Price from './Price';
import generateElementUniqueID from '../utils/generateId';
import funcGetProductCode from '../../functions/funcGetProductCode';
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
    console.log(updatedKey, updatedValue);
    if (updatedKey === 'quoteProduct') {
      setProduct(updatedValue);
    }
    onChange(
      customer.customer_id,
      quote_ref_id,
      `${Object.keys(quoteFields[range])}`,
      updatedValue,
    );
  };
  // Effects --------------------------------------------------------

  // Return ---------------------------------------------------------
  return (
    <>
      {Object.values<CustomerOptions>(quoteFields[range]['Customer']).map(
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
      )}
      {product &&
        Object.values<ProductOptions>(quoteFields[range]['ProductOptions']).map(
          (key, index) => (
            console.log(key, key.displayName, key[product]),
            (
              <td key={index}>
                <InputField
                  elementIdToUse={generateElementUniqueID()}
                  displayName={key.displayName}
                  displayType={key[product]['displayType']}
                  displayResults={key[product]['displayResults']}
                  // productCode={prodCode}
                  customer={customer}
                  onChange={(updatedValue: string) =>
                    handleChange(
                      updatedValue,
                      `${
                        Object.keys(quoteFields[range]['ProductOptions'])[index]
                      }`,
                    )
                  }
                />
              </td>
            )
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
