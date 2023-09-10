import React, { useRef, useState } from 'react';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import productsData from '../../data/products.json';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useCustomerData } from '../../contexts/CustomerDataContext';

interface ProductData {
  [key: string]: any;
}

type Quote = {
  temp_quote_id: number;
};

type Props = {
  quoteData: Quote;
  onAddQuoteSlot: () => void;
  onRemoveQuoteSlot: (id: number) => void;
};

const QuoteContainer = (props: Props) => {
  const { quoteData, onAddQuoteSlot, onRemoveQuoteSlot } = props;

  const CustomerData = useCustomerData();

  const wasStartDateSelected = useRef(false);

  const data: ProductData = productsData;
  const [range, setRange] = useState('');
  const [showProductRangeSelection, SetShowProductRangeSelection] =
    useState(false);
  const currentDate = new Date(); // Create a new Date object for the current date
  const formattedCurrentDate = currentDate.toISOString().substr(0, 10); // Format it as "YYYY-MM-DD"
  const [startDate, setStartDate] = useState('');

  const currencies = ['GBP', 'EUR', 'USD'];
  const [currency, setCurrency] = useState('GBP');

  const paymentFrequencies = ['Monthly', 'Quarterly', 'Annual'];
  const [paymentFrequency, setPaymentFrequency] = useState('Monthly');

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRange(e.target.value);
    wasStartDateSelected.current = true;
  };

  const handleAddQuote = () => {
    SetShowProductRangeSelection(true);
    onAddQuoteSlot();
  };

  const handleRemoveQuote = () => {
    onRemoveQuoteSlot(quoteData.temp_quote_id);
  };

  const handleSetDateToToday = () => {
    setStartDate(formattedCurrentDate);
    wasStartDateSelected.current = true;
  };
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

      {wasStartDateSelected.current && !range && (
        <Form.Select
          aria-label="Select product range"
          className="mb-2"
          onChange={handleRangeChange}
          value={range}
        >
          <option>Select product range...</option>
          {Object.keys(data).map((key, index) => (
            <option key={index}>{key}</option>
          ))}
        </Form.Select>
      )}

      {showProductRangeSelection && (
        <Button variant="danger" onClick={handleRemoveQuote}>
          Delete quote...
        </Button>
      )}
    </div>
  );
};

export default QuoteContainer;
