import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

type Customer = {
  customer_id: number;
  first_name: string;
  initials: string;
  last_name: string;
  dob: string;
  nationality: string;
  residence_country: string;
};

type Props = {
  id: number;
  data: Customer;
  onRemoveCustomerSlot: (id: number) => void;
  onUpdate: (Customer: Customer) => void;
};

const CustomerInput = (props: Props) => {
  const { id, data, onRemoveCustomerSlot, onUpdate } = props;

  // set up variables for fields used in this component
  const [formData, setFormData] = useState({
    customer_id: id,
    first_name: '',
    initials: '',
    last_name: '',
    dob: '',
    nationality: '',
    residence_country: '',
  });

  // Allow user to edit form.
  const handleChange = (e: any) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
      onUpdate(updatedFormData);
      return updatedFormData;
    });
  };

  // Remove customer slot
  const handleRemoveCustomerSlot = () => {
    onRemoveCustomerSlot(data.customer_id);
  };

  // Return ------------------
  return (
    <div>
      <Form className="d-flex mb-2">
        {/* Input for first name */}
        <FloatingLabel
          controlId="floatingInput"
          label="First Name"
          className="me-2"
        >
          <Form.Control
            name="first_name"
            type="text"
            placeholder=" "
            onChange={handleChange}
          />
        </FloatingLabel>
        {/* Input for initials */}
        <FloatingLabel
          controlId="floatingInput"
          label="Initials"
          className="me-2"
        >
          <Form.Control
            name="initials"
            type="text"
            placeholder=" "
            onChange={handleChange}
          />
        </FloatingLabel>
        {/* Input for last name */}
        <FloatingLabel
          controlId="floatingInput"
          label="Last Name"
          className="me-2"
        >
          <Form.Control
            name="last_name"
            type="text"
            placeholder=""
            onChange={handleChange}
          />
        </FloatingLabel>
        {/* Input for date of birth */}
        <FloatingLabel
          controlId="floatingInput"
          label="Date of birth"
          className="me-2"
        >
          <Form.Control
            type="date"
            name="dob"
            placeholder="Date of Birth"
            onChange={handleChange}
          />
        </FloatingLabel>
        {/* Input for nationality */}
        <FloatingLabel
          controlId="floatingInput"
          label="Nationality"
          className="me-2"
        >
          <Form.Select
            name="nationality"
            aria-label="Self nationality"
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="British">British</option>
            <option value="French">French</option>
          </Form.Select>
        </FloatingLabel>
        {/* Input for country of residence */}
        <FloatingLabel
          controlId="floatingInput"
          label="Country of residence"
          className="me-2"
        >
          <Form.Select
            name="residence_country"
            aria-label="Select country of residence"
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
          </Form.Select>
        </FloatingLabel>
        {/* Remove person button */}
        <Button variant="danger" onClick={handleRemoveCustomerSlot}>
          Remove
        </Button>
      </Form>
    </div>
  );
};

export default CustomerInput;
