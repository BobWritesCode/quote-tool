import React, { useContext, useRef, useState } from 'react';
import appStyles from '../../styles/App.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import productsData from '../../data/products.json';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { CustomerContext } from '../../contexts/CustomerDataContext';
// Types ------------------------------------------------------------
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
// Main -------------------------------------------------------------
const QuoteContainer = (props: Props) => {
  // Props -----------------------------------------------------------
  // Refs -----------------------------------------------------------
  const wasStartDateSelected = useRef(false);
  // Contexts -------------------------------------------------------
  // Variables ------------------------------------------------------
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
  // Data ----------------------------------------------------------
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
    onAddQuoteSlot();
  };
  /**
   *
   */
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
              <th>Name</th>
              <th>Age</th>
              <th>Residence</th>
              <th>Plan</th>
              <th>Quote</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(customerData).map((customer, i) => (
              <tr key={i}>
                <td>
                  {customer.first_name} {customer.initials} {customer.last_name}{' '}
                </td>
                <td>{customer.dob}</td>
                <td>{customer.residence_country}</td>
                <td>
                  <Form.Select aria-label="Select product">
                    {(products[range] as string[]).map((key, index) => (
                      <option key={index}>{key}</option>
                    ))}
                  </Form.Select>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </Table>
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
