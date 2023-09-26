import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import customerFieldsData from '../../data/customer_fields.json';
// Types ------------------------------------------------------------

type TCustomer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: number;
  residence_country?: string;
  age?:string;
};

type TProps = {
  displayName: string;
  displayType: string;
  displayResults: string[];
  elementIdToUse: string;
  onChange: (e: string) => void;
  customer?: TCustomer;
  productCode?: String;
  quote?: any;
};

// Main -------------------------------------------------------------
/**
 *
 * @param props
 * @returns
 */
const InputField = (props: TProps) => {
  // Props ----------------------------------------------------------
  const {
    displayType,
    displayName,
    customer,
    quote,
    displayResults,
    onChange,
    elementIdToUse,
    // productCode,
  } = props;
  // Refs -----------------------------------------------------------
  // Variables ------------------------------------------------------
  const [chosenOption, setChosenOption] = useState(displayResults[0]);
  // Data -----------------------------------------------------------
  // Handles --------------------------------------------------------
  /**
   *
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };
  /**
   *
   * @param e
   */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onChange(e.currentTarget.value);
  };
  /**
   *
   * @param e
   */
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChosenOption(e.currentTarget.value);
    onChange(e.currentTarget.value);
  };
  /**
   *
   * @param e
   */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenOption(e.currentTarget.value);
    onChange(e.currentTarget.value);
  };
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <>
      {(() => {
        let hasMatchingKey = null;
        switch (displayType) {
          case 'display':
            if (customer) {
              // Get customer field keys.
              const customerKeys = Object.keys(customerFieldsData);
              // Check if displayResults match customerFields data keys.
              hasMatchingKey = Object.values(displayResults).some((value) =>
                customerKeys.includes(value),
              );
            }
            // If find matching keys, then use customer dict to get strings, and add spaces between entries.
            if (hasMatchingKey) {
              return (displayResults as (keyof TCustomer)[])
                .map((value: keyof TCustomer) => customer?.[value])
                .join(' ');
            } else {
              return Object.values(displayResults)
                .map((value) => value)
                .join('%%%');
            }
          case 'displayAge':
            if (customer?.['date_of_birth']) {
              const date1 = new Date(customer?.['date_of_birth']);
              const date2 = new Date(quote['global']['start_date']);

              const date1Year = date1.getFullYear();
              const date1Month = date1.getMonth();
              const date1Day = date1.getDate();

              const date2Year = date2.getFullYear();
              const date2Month = date2.getMonth();
              const date2Day = date2.getDate();

              let age = date2Year - date1Year;

              // Check if the birthday has already occurred this year
              if (
                date2Month < date1Month ||
                (date2Month === date1Month && date2Day < date1Day)
              ) {
                age--;
              }

              return age;
            }
            return 'DOB?';

          case 'displayProductCode':
            return quote.quoteProductCode ? quote.quoteProductCode : '';

          case 'text':
            return (
              <Form.Control
                name={displayName}
                type="text"
                maxLength={50}
                onChange={handleChange}
              />
            );
          case 'date':
            return (
              <Form.Control
                type="date"
                name={displayName}
                onChange={handleChange}
              />
            );
          case 'select':
            return (
              <Form.Select
                name={displayName}
                onChange={(e) => {
                  handleSelectChange(e);
                }}
              >
                {Object.values(displayResults).map(
                  (value: any, idx: number) => (
                    <option key={idx} value={value}>
                      {value}
                    </option>
                  ),
                )}
              </Form.Select>
            );
          case 'radio':
            return (
              <ButtonGroup className="me-2">
                {displayResults.map((value: string | number, idx: number) => (
                  <ToggleButton
                    key={idx}
                    id={`${elementIdToUse}${idx}`}
                    type="radio"
                    variant={'outline-secondary'}
                    value={value}
                    checked={chosenOption === value}
                    onChange={(e) => {
                      handleRadioChange(e);
                    }}
                  >
                    {value}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            );
          case 'buttons':
            return displayResults.map(
              (value: string | number, index: number) => (
                <Button
                  key={index}
                  variant="success"
                  value={value}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                  ) => handleClick(e)}
                  className="me-2"
                >
                  {value}
                </Button>
              ),
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

export default InputField;
