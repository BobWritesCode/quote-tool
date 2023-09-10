import React, { useRef, useState } from 'react';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import productsData from '../../data/products.json';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

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

  const wasStartDateSelected = useRef(false);

  const data: ProductData = productsData;
  const [range, setRange] = useState('');
  const [product, setProduct] = useState('');
  const [showProductRangeSelection, SetShowProductRangeSelection] =
    useState(false);
  const currentDate = new Date(); // Create a new Date object for the current date
  const formattedCurrentDate = currentDate.toISOString().substr(0, 10); // Format it as "YYYY-MM-DD"
  const [startDate, setStartDate] = useState('');

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRange(e.target.value);
    wasStartDateSelected.current = true;
  };
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleAddQuote = () => {
    SetShowProductRangeSelection(true);
    onAddQuoteSlot();
  };

  const handleRemoveQuote = () => {
    setProduct('');
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
              onChange={handleStartDateChange}
            />
          </FloatingLabel>

          <Button variant="primary" onClick={handleSetDateToToday}>
            Today
          </Button>
        </div>
      )}

      {wasStartDateSelected.current && (
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

      {range && (
        <Form.Select
          aria-label="Select product from range"
          className="mb-2"
          value={product}
          onChange={handleProductChange}
        >
          <option>Select product from range...</option>
          {data[range]?.map((item: string, index: number) => (
            <option key={index}>{item}</option>
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
