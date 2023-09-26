import React, { useContext, useState } from 'react';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import productsData from '../../data/products.json';
import quoteFieldsData from '../../data/quote_fields.json';
import Table from 'react-bootstrap/Table';
import { CustomerContext } from '../../contexts/CustomerDataContext';
import InputField from '../utils/InputField';
import { QuotesContext } from '../../contexts/QuotesContext';
import generateElementUniqueID from '../utils/generateId';
import QuoteLineComp from './QuoteLineComp';
import funcGetProductCode from '../../functions/funcGetProductCode';
import funcSetDefaultQuoteValues from '../../functions/funcSetDefaultQuoteValues';
// Types ------------------------------------------------------------
type TProductData = {
  [key: string]: any;
};
type TQuoteFields = {
  [key: string]: any;
};
type TProps = {
  quote_ref_id: string;
  onAddQuote: () => void;
  onRemoveQuote: (customerId: string) => void;
};
type TQuoteLine = {
  [key: string]: string | number | string[];
};
type TCustomer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: number;
  residence_country?: string;
};
// Main -------------------------------------------------------------
const QuoteContainer = (props: TProps) => {
  // Props -----------------------------------------------------------
  const { quote_ref_id, onAddQuote, onRemoveQuote } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  const { customerData } = useContext(CustomerContext);
  const { quotesData, setQuotesData } = useContext(QuotesContext);
  // Variables ------------------------------------------------------
  const [showProductRangeSelection, SetShowProductRangeSelection] =
    useState(false);
  const [range, setRange] = useState('');
  // Data ----------------------------------------------------------
  const products: TProductData = productsData;
  const quoteFields: TQuoteFields = quoteFieldsData;
  // Handles --------------------------------------------------------
  /**
   *
   */
  const handleAddQuote = () => {
    SetShowProductRangeSelection(true);
    onAddQuote();
  };
  /**
   *
   */
  const handleRemoveQuote = (e: any) => {
    onRemoveQuote(e.target.value);
  };
  /**
   * Update quotes dict on change to quote.
   */
  const handleChange = (
    customer_id: string,
    quote_ref_id: string,
    updatedKey: string,
    updatedValue: string | number,
  ) => {
    const updatedQuotes: any = { ...quotesData };
    const fieldName = updatedKey as keyof TQuoteLine;
    const fieldValue = updatedValue;
    if (customer_id !== 'global') {
      updatedQuotes[quote_ref_id][customer_id]['ProductCode'] =
        funcGetProductCode(
          customerData[customer_id],
          updatedQuotes[quote_ref_id][customer_id],
          updatedQuotes[quote_ref_id]['global'],
        );
    }
    updatedQuotes[quote_ref_id][customer_id][fieldName] = fieldValue;
    setQuotesData(updatedQuotes);
    if (updatedKey === 'range') {
      setRange(String(updatedValue));
    }
  };

  // Effects --------------------------------------------------------
  // JSX build section ----------------------------------------------
  /**
   *
   * @returns
   */
  const jsxAddQuoteButton = () => {
    return (
      <Button variant="success" onClick={handleAddQuote}>
        Add quote...
      </Button>
    );
  };
  /**
   *
   * @returns
   */
  const jsxDeleteQuoteButton = () => {
    return (
      <Button variant="danger" value={quote_ref_id} onClick={handleRemoveQuote}>
        Delete quote...
      </Button>
    );
  };
  /**
   *
   * @returns
   */
  const jsxGlobalQuoteOptions = () => {
    if (Object.keys(quotesData[quote_ref_id]['global']).length === 0) {
      const updatedQuotes = funcSetDefaultQuoteValues(
        quotesData,
        quote_ref_id,
        'global',
        quoteFields['top'],
        range,
      );
      setQuotesData(updatedQuotes);
    }
    return (
      <div className="d-flex mb-2">
        {Object.values(quoteFields['top']).map((key: any, index: number) => (
          <InputField
            key={index}
            elementIdToUse={generateElementUniqueID()}
            displayType={key.displayType}
            displayName={key.displayName}
            displayResults={key.displayResults}
            onChange={(updatedValue: string) =>
              handleChange(
                'global',
                quote_ref_id,
                `${Object.keys(quoteFields['top'])[index]}`,
                updatedValue,
              )
            }
          />
        ))}
      </div>
    );
  };
  // Return ---------------------------------------------------------
  return (
    <div className={`${appStyles.Box} mb-2 p-3`}>
      {/* Quote ref: {quote_ref_id} */}
      <br />
      {!showProductRangeSelection && jsxAddQuoteButton()}
      {showProductRangeSelection && jsxGlobalQuoteOptions()}
      {quotesData[quote_ref_id]['global']['start_date'] &&
        !quotesData[quote_ref_id]['global']?.['range'] && (
          <>
            <InputField
              displayType={'buttons'}
              displayName={'Range selection'}
              displayResults={Object.keys(products)}
              onChange={(updatedValue: string) =>
                handleChange('global', quote_ref_id, 'range', updatedValue)
              }
              elementIdToUse={''}
            />
          </>
        )}
      {quotesData[quote_ref_id]?.['global']['range'] && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {Object.values(quoteFields[range]['Customer']).map(
                (key: any, index: number) => (
                  <th key={index}>{key.displayName}</th>
                ),
              )}
              {Object.values(quoteFields[range]['ProductOptions']).map(
                (key: any, index: number) => (
                  <th key={index}>{key.displayName}</th>
                ),
              )}
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(customerData).map((customer: TCustomer, i) => (
              <tr key={i}>
                <QuoteLineComp
                  customer={customer}
                  range={range}
                  quote_ref_id={quote_ref_id}
                  currency={quotesData[quote_ref_id]['global'].currency}
                  onChange={(
                    customer_id,
                    quote_ref_id,
                    updatedKey,
                    updatedValue,
                  ) =>
                    handleChange(
                      customer_id,
                      quote_ref_id,
                      updatedKey,
                      updatedValue,
                    )
                  }
                />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showProductRangeSelection && jsxDeleteQuoteButton()}
    </div>
  );
};

export default QuoteContainer;
