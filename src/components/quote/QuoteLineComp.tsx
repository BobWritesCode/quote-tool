import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
import quoteFieldsData from '../../data/quote_fields.json';
import InputField from '../utils/InputField';
import Price from './Price';
import generateElementUniqueID from '../utils/generateId';
import { QuotesContext } from '../../contexts/QuotesContext';
import funcSetDefaultQuoteValues from '../../functions/funcSetDefaultQuoteValues';
import funcResultsToDisplay from '../../functions/funcResultsToDisplay';
import funcGetProductCode from '../../functions/funcGetProductCode';
import { CustomerContext } from '../../contexts/CustomerDataContext';
// Types ------------------------------------------------------------
type TCustomerOptions = {
  displayName: string;
  displayType: string;
  displayResults: string[];
};
type TProductOptions = {
  displayName: string;
} & Record<string, any>;

type TQuoteFields = {
  [key: string]: any;
};
type TCustomer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: number;
  residence_country?: string;
};
type TQuoteLine = {
  [key: string]: string | number | string[];
};
type TQuote = {
  [key: string]: TQuoteLine;
};
type TQuotes = {
  [key: string]: TQuote;
};

type TProps = {
  customer: TCustomer;
  range: string;
  quote_ref_id: string;
  currency: string | number | string[];
};
// Main -------------------------------------------------------------
const QuoteLineComp = (props: TProps) => {
  console.log('QuoteLineComp');
  // Props ----------------------------------------------------------
  const { customer, range, quote_ref_id } = props;
  const cust_id = customer.customer_id;
  // Refs -----------------------------------------------------------
  const isInitialRender = useRef(true);
  // Contexts -------------------------------------------------------
  const { quotesData, setQuotesData } = useContext(QuotesContext);
  const { customerData } = useContext(CustomerContext);
  // Variables ------------------------------------------------------
  const [product, setProduct] = useState('');
  // Data -----------------------------------------------------------
  const quoteFields: TQuoteFields = quoteFieldsData;
  // Handles --------------------------------------------------------
  /**
   *
   * @param updatedValue
   * @param updatedKey
   */
  const handleChange = (updatedValue: string, updatedKey: string) => {
    if (updatedKey === 'quoteProduct') {
      setProduct(updatedValue);
      const updatedQuotes = funcSetDefaultQuoteValues(
        { ...quotesData },
        quote_ref_id,
        cust_id,
        quoteFields[range]['ProductOptions'],
        range,
        updatedValue,
      );
      // Set product code for customer for quote
      updatedQuotes[quote_ref_id][cust_id]['quoteProductCode'] =
        funcGetProductCode(
          customer,
          updatedQuotes[quote_ref_id][cust_id],
          updatedQuotes[quote_ref_id]['global'],
        );
      setQuotesData(updatedQuotes);
    } else {
      const updatedQuotes: TQuotes = { ...quotesData };
      const fieldName = updatedKey as keyof TQuoteLine;
      const fieldValue = updatedValue;
      updatedQuotes[quote_ref_id][cust_id][fieldName] = fieldValue;
      // Set product code for customer for quote
      updatedQuotes[quote_ref_id][cust_id]['quoteProductCode'] =
        funcGetProductCode(
          customer,
          updatedQuotes[quote_ref_id][cust_id],
          updatedQuotes[quote_ref_id]['global'],
        );
      setQuotesData(updatedQuotes);
    }
  };
  // Effects --------------------------------------------------------

  useEffect(() => {
    console.log('QuoteLineComp - useEffect 1');
    if (isInitialRender.current) {
      // Sets product for customer to first product in range on first render.
      setProduct(
        quoteFields[range]['Customer']['quoteProduct']['displayResults'][0],
      );
      const updatedQuotes = funcSetDefaultQuoteValues(
        { ...quotesData },
        quote_ref_id,
        cust_id,
        quoteFields[range]['ProductOptions'],
        range,
        quoteFields[range]['Customer']['quoteProduct']['displayResults'][0],
      );
      // Set product code for customer for quote
      updatedQuotes[quote_ref_id][cust_id]['quoteProductCode'] =
        funcGetProductCode(
          customer,
          updatedQuotes[quote_ref_id][cust_id],
          updatedQuotes[quote_ref_id]['global'],
        );
      setQuotesData(updatedQuotes);
    }
  }, []);

  useEffect(() => {
    console.log('QuoteLineComp - useEffect', quote_ref_id, cust_id);
    const updatedQuotes: TQuotes = { ...quotesData };
    const newProdCode = funcGetProductCode(
      customer,
      quotesData[quote_ref_id][cust_id],
      quotesData[quote_ref_id]['global'],
    );

    updatedQuotes[quote_ref_id][cust_id]['quoteProductCode'] = newProdCode;
    setQuotesData(updatedQuotes);
  }, [customerData]);

  const jsxCustomerFields = () => {
    return Object.values<TCustomerOptions>(quoteFields[range]['Customer']).map(
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

  const jsxProductFields = () => {
    return Object.values<TProductOptions>(
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
          quote={quotesData[quote_ref_id][customer.customer_id]}
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

  const jsxPriceField = () => {
    return Object.values(
      quotesData[quote_ref_id][customer.customer_id].quoteProductCode,
    ).map((k, i) => (
      <td>
        <Price
          product={'Current'}
          returnPrice={()=>''}
        />
      </td>
    ));
  };

  // Return ---------------------------------------------------------
  return (
    <>
      {jsxCustomerFields()}
      {product && jsxProductFields()}
      {jsxPriceField()}
    </>
  );
};

export default QuoteLineComp;
