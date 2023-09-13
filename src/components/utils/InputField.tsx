import React from 'react';
import Form from 'react-bootstrap/Form';
// Types ------------------------------------------------------------
// Main -------------------------------------------------------------
const InputField = (props: any) => {
  // Props ----------------------------------------------------------
  const { data, dataName, onUpdate, customer } = props;
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
          case 'display':
            return data[2].map((key: string) => customer[key]).join(' ');
          case 'text':
            return (
              <Form.Control
                name={dataName}
                type="text"
                maxLength={data[2]}
                onChange={onUpdate}
              />
            );
          case 'date':
            return (
              <Form.Control type="date" name={dataName} onChange={onUpdate} />
            );
          case 'select':
            return (
              <Form.Select name={dataName} onChange={onUpdate}>
                <option value=""></option>
                {Object.values(data[2]).map((key: any, index: number) => (
                  <option key={index} value={key}>
                    {key}
                  </option>
                ))}
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
