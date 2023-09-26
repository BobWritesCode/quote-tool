import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

// Types ------------------------------------------------------------
type TProps = {
  variant: string;
};
// Main -------------------------------------------------------------
const MySpinner = (props: TProps) => {
  // Props ----------------------------------------------------------
  const { variant = 'light' } = props;
  // Refs -----------------------------------------------------------
  // Contexts -------------------------------------------------------
  // Variables ------------------------------------------------------
  // Data -----------------------------------------------------------
  // Handles --------------------------------------------------------
  // Effects --------------------------------------------------------
  // Return ---------------------------------------------------------
  return (
    <div className="d-flex justify-content-center">
      <Spinner animation="border" role="status" variant={variant}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

// Props validation
MySpinner.propTypes = {
  variant: PropTypes.string,
};

export default MySpinner;
