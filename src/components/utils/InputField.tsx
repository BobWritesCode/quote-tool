import React from 'react';
import Form from 'react-bootstrap/Form';
// Types ------------------------------------------------------------
// Main -------------------------------------------------------------
const InputField = (props: any) => {
  // Props ----------------------------------------------------------
  const { data, dataName, onUpdate, value } = props;
  // Refs -----------------------------------------------------------
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  // Handles --------------------------------------------------------
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <td>
      {(() => {
        switch (data[1]) {
          case 'text':
            return (
              <Form.Control
                name={dataName}
                type="text"
                maxLength={data[2]}
                onChange={onUpdate}
                value={value}
              />
            );
          case 'date':
            return (
              <Form.Control type="date" name={dataName} onChange={onUpdate} />
            );
          case 'select':
            return (
              <Form.Select
                name={dataName}
                aria-label="Select country of residence"
                onChange={onUpdate}
                value={value}
              >
                <option value=""></option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="France">France</option>
              </Form.Select>
            );
          default:
            return null;
        }
      })()}
    </td>
  );
};

export default InputField;
