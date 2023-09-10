import React, { useState } from 'react';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import productsData from '../../data/products.json';

interface ProductData {
  [key: string]: any;
}

// type ProductData = {
//   Current: string[];
//   Legacy: string[];
// };

const QuoteContainer = () => {
  const data: ProductData = productsData;
  const [range, setRange] = useState('');
  const [showProductRangeSelection, SetShowProductRangeSelection] =
    useState(false);

  const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRange(e.target.value);
  };

  const handleAddQuote = () => {
    SetShowProductRangeSelection(true);
  }

  return (
    <div className={`${appStyles.Box} mb-2 p-3`}>
      {!showProductRangeSelection && (<Button variant="success" onClick={handleAddQuote}>Add quote...</Button>)}
      {showProductRangeSelection && (
        <Form.Select
          aria-label="Select product range"
          onChange={handleRangeChange}
        >
          <option>Open this select menu</option>
          {Object.keys(data).map((key, index) => (
            <option key={index}>{key}</option>
          ))}
        </Form.Select>
      )}

      {range && (
        <Form.Select aria-label="Select product from range">
          <option>Open this select menu</option>
          {data[range].map((item: string, index: number) => (
            <option key={index}>{item}</option>
          ))}
        </Form.Select>
      )}
    </div>
  );
};

export default QuoteContainer;
