import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import customerFieldsData from '../../data/customer_fields.json';
// Types ------------------------------------------------------------

type Customer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: string;
  residence_country?: string;
};
type Props = {
  displayName: string;
  displayType: string;
  displayResults: string[];
  elementIdToUse: string;
  onChange: (e: string) => void;
  customer?: Customer;
};

// Main -------------------------------------------------------------
const InputField = (props: Props) => {
  // Props ----------------------------------------------------------
  const {
    displayType,
    displayName,
    customer,
    displayResults,
    onChange,
    elementIdToUse,
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
        switch (displayType) {
          case 'display':
            let hasMatchingKey = null
            if(customer){
              // Get customer field keys.
              const customerKeys = Object.keys(customerFieldsData);
              // Check if displayResults match customerFields data keys.
              hasMatchingKey = Object.values(displayResults).some(value => customerKeys.includes(value));
            }
            // If find matching keys, then use customer dict to get strings, and add spaces between entries.
            if (hasMatchingKey) {
              return (displayResults as (keyof Customer)[])
                .map((value: keyof Customer) => customer?.[value])
                .join(' ');
            } else {
              return Object.values(displayResults).map((value) => value).join('%%%');
            }
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
                <option value=""></option>
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
