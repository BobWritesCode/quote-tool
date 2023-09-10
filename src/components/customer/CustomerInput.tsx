import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

type Customer = {
  customer_id: number,
  first_name: string,
  initials: string,
  last_name: string,
  dob: string,
  nationality: string,
  residence_country: string
}

type Props = {
  id: number;
  data: Customer;
  onRemoveCustomerSlot: (id: number) => void,
};

const CustomerInput = (props: Props) => {
  const { id, data, onRemoveCustomerSlot } = props;

  // Remove customer slot
  const handleRemoveCustomerSlot = () => {
    onRemoveCustomerSlot(data.customer_id);
  };

  // Return ------------------
  return (
    <div>
      <Form className="d-flex mb-2">
      {id}.
      {data.customer_id}
        {/* Input for first name */}
        <FloatingLabel
          controlId="floatingInput"
          label="First Name"
          className="me-2"
        >
          <Form.Control type="text" placeholder=" " />
        </FloatingLabel>

        {/* Input for initials */}
        <FloatingLabel
          controlId="floatingInput"
          label="Initials"
          className="me-2"
        >
          <Form.Control type="email" placeholder=" " />
        </FloatingLabel>

        {/* Input for last name */}
        <FloatingLabel
          controlId="floatingInput"
          label="Last Name"
          className="me-2"
        >
          <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>

        {/* Input for date of birth */}
        <FloatingLabel
          controlId="floatingInput"
          label="Date of birth"
          className="me-2"
        >
          <Form.Control type="date" name="dob" placeholder="Date of Birth" />
        </FloatingLabel>

        {/* Input for nationality */}
        <FloatingLabel
          controlId="floatingInput"
          label="Nationality"
          className="me-2"
        >
          <Form.Select aria-label="Self nationality">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </FloatingLabel>

        {/* Input for country of residence */}
        <FloatingLabel
          controlId="floatingInput"
          label="Country of residence"
          className="me-2"
        >
          <Form.Select aria-label="Select country of residence">
            <option value="1">United Kingdom</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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
