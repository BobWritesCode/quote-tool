import React, { useContext, useRef, useState } from 'react';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import productsData from '../../data/products.json';
import quoteFieldsData from '../../data/quote_fields.json';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Table from 'react-bootstrap/Table';
import { CustomerContext } from '../../contexts/CustomerDataContext';
import InputField from '../utils/InputField';
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
  onRemoveQuote: (customerId: number) => void;
};
// Main -------------------------------------------------------------
const QuoteContainer = (props: Props) => {
  // Props -----------------------------------------------------------
  const { quote_ref_id, onAddQuote, onRemoveQuote } = props;
  // Refs -----------------------------------------------------------
  const wasStartDateSelected = useRef(false);
  // Contexts -------------------------------------------------------
  const { customerData, setCustomerData } = useContext(CustomerContext);
  // Variables ------------------------------------------------------
  const [range, setRange] = useState('');
  const [showProductRangeSelection, SetShowProductRangeSelection] =
    useState(false);
  const [startDate, setStartDate] = useState('');
  const [currency, setCurrency] = useState('GBP');
  const [paymentFrequency, setPaymentFrequency] = useState('Monthly');
  // Data ----------------------------------------------------------
  const currencies = ['GBP', 'EUR', 'USD'];
  const paymentFrequencies = ['Monthly', 'Quarterly', 'Annual'];
  const products: ProductData = productsData;
  const quoteFields: QuoteFields = quoteFieldsData;
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toISOString().substr(0, 10);
  // Handles --------------------------------------------------------
  /**
   *
   */
  const handleRangeChange = (key: string) => {
    setRange(key);
    wasStartDateSelected.current = true;
  };
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
   *
   */
  const handleSetDateToToday = () => {
    setStartDate(formattedCurrentDate);
    wasStartDateSelected.current = true;
  };
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <div className={`${appStyles.Box} mb-2 p-3`}>
      {!showProductRangeSelection && (
        <Button variant="success" onClick={handleAddQuote}>
          Add quote...
        </Button>
      )}

      {showProductRangeSelection && (
        <div className="d-flex mb-2">
          {/* Input for start date */}
          <FloatingLabel
            controlId="floatingInput"
            label="Start Date"
            className="me-2"
          >
            <Form.Control
              type="date"
              name="start_date"
              placeholder="Start date"
              value={startDate}
              onChange={(e) => setStartDate(e.currentTarget.value)}
            />
          </FloatingLabel>

          <Button
            variant="primary"
            className="me-2"
            onClick={handleSetDateToToday}
          >
            Today
          </Button>

          {range && (
            <Button
              as="input"
              type="button"
              value={range}
              variant="secondary"
              className="me-2"
            />
          )}

          {range && (
            <>
              <ButtonGroup className="me-2">
                {currencies.map((key, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`currency-${idx}`}
                    type="radio"
                    variant={'outline-secondary'}
                    name={key}
                    value={key}
                    checked={currency === key}
                    onChange={(e) => setCurrency(e.currentTarget.value)}
                  >
                    {key}
                  </ToggleButton>
                ))}
              </ButtonGroup>

              <ButtonGroup className="me-2">
                {paymentFrequencies.map((key, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`paymentFrequency-${idx}`}
                    type="radio"
                    variant={'outline-secondary'}
                    name={key}
                    value={key}
                    checked={paymentFrequency === key}
                    onChange={(e) => setPaymentFrequency(e.currentTarget.value)}
                  >
                    {key}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </>
          )}
        </div>
      )}

      {wasStartDateSelected.current &&
        !range &&
        Object.keys(products).map((key, index) => (
          <Button
            key={index}
            variant="success"
            onClick={() => handleRangeChange(key)}
            className="me-2"
            value={key}
          >
            {key}
          </Button>
        ))}

      {range && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              {Object.values(quoteFields['lines'][range]).map(
                (key: any, index: number) => (
                  <th key={index}>{key[0]}</th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {Object.values(customerData).map((customer, i) => (
              <tr key={i}>
                {Object.entries(quoteFields['lines'][range]).map(
                  ([fieldName, fieldData], index) => (
                    <InputField
                      key={index}
                      dataName={fieldName}
                      data={fieldData}
                      customer={customer}
                    />
                  ),
                )}
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
