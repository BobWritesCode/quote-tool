import React, { useContext, useRef, useState, useEffect } from 'react';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import productsData from '../../data/products.json';
import quoteFieldsData from '../../data/quote_fields.json';
import Table from 'react-bootstrap/Table';
import { CustomerContext } from '../../contexts/CustomerDataContext';
import InputField from '../utils/InputField';
import Price from './Price';
import { QuotesContext } from '../../contexts/QuotesContext';
import generateElementUniqueID from '../utils/generateId';
import QuoteLineComp from './QuoteLineComp';
// Types ------------------------------------------------------------
type ProductData = {
  [key: string]: any;
};
type QuoteFields = {
  [key: string]: any;
};
type Props = {
  quote_ref_id: string;
  onAddQuote: () => void;
  onRemoveQuote: (customerId: string) => void;
};
type QuoteLine = {
  [key: string]: string | number;
};
type Customer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: string;
  residence_country?: string;
};
// Main -------------------------------------------------------------
const QuoteContainer = (props: Props) => {
  // Props -----------------------------------------------------------
  const { quote_ref_id, onAddQuote, onRemoveQuote } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  const { customerData } = useContext(CustomerContext);
  const { quotesData, setQuotesData } = useContext(QuotesContext);
  // Variables ------------------------------------------------------
  const [showProductRangeSelection, SetShowProductRangeSelection] =
    useState(false);
  const [range, setRange] = useState('Legacy');
  // Data ----------------------------------------------------------
  const products: ProductData = productsData;
  const quoteFields: QuoteFields = quoteFieldsData;
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().substr(0, 10);
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
    const fieldName = updatedKey as keyof QuoteLine;
    const fieldValue = updatedValue;
    updatedQuotes[quote_ref_id][customer_id][fieldName] = fieldValue;
    setQuotesData(updatedQuotes);
    if (updatedKey === 'range') {
      setRange(String(updatedValue));
    }
  };
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <div className={`${appStyles.Box} mb-2 p-3`}>
      Quote ref: {quote_ref_id}
      <br />
      {!showProductRangeSelection && (
        <Button variant="success" onClick={handleAddQuote}>
          Add quote...
        </Button>
      )}
      {showProductRangeSelection && (
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

          {/* {quotesData[quote_ref_id]['global']['range'] && (
            <Button
              as="input"
              type="button"
              value={quotesData[quote_ref_id]['global']['range']}
              variant="secondary"
              className="me-2"
            />
          )} */}
        </div>
      )}
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
              {Object.values(quoteFields['lines'][range]).map(
                (key: any, index: number) => (
                  <th key={index}>{key.displayName}</th>
                ),
              )}
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(customerData).map((customer: Customer, i) => (
              <tr key={i}>
                <QuoteLineComp
                  customer={customer}
                  range={range}
                  quote_ref_id={quote_ref_id}
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
      {showProductRangeSelection && (
        <Button
          variant="danger"
          value={quote_ref_id}
          onClick={handleRemoveQuote}
        >
          Delete quote...
        </Button>
      )}
    </div>
  );
};

export default QuoteContainer;
