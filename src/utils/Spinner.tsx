import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

type Props = {
  variant: string;
}

const MySpinner = (props: Props) => {
  const { variant = 'light' } = props;

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
