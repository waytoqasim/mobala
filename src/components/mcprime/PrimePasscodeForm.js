// PrimePasscodeForm.js
import React from 'react';
import { Form } from 'react-bootstrap';

const PrimePasscodeForm = ({
  passcode,
  setPasscode,
  errorPasscode,
  setErrorPasscode,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <h6>Prime services are available only to Money Changers.</h6>
    <div className="mb-3">
      <label className="enterpascode">
        Enter MC Prime passcode (check your email)
      </label>
      <input
        className="inputmcpass"
        type="text"
        value={passcode}
        onChange={(e) => {
          if (e.target.value.length <= 10) {
            setPasscode(e.target.value);
          }
        }}
        placeholder="Enter your passcode"
        onClick={() => setErrorPasscode("")}
        maxLength={10}
      />
    </div>

    {/* Error Message */}
    {errorPasscode !== "" && (
      <p style={{ fontWeight: 600 }} className="text-danger text-center">
        {errorPasscode}
      </p>
    )}

    <div>
      <br />
      <label>Prime Services are free for a limited duration.</label>
    </div>
  </Form>
);

export default PrimePasscodeForm;
