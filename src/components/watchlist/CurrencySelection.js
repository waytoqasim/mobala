import React from 'react';
import { InputGroup, Form } from 'react-bootstrap';

const CurrencySelection = ({ 
  label, value, onChange, currencies 
}) => (
  <InputGroup className="mb-3">
    <Form.Select
      value={value}
      onChange={onChange}
      aria-label={label}
    >
      <option value="">{label}</option>
      {currencies.map((item, key) => (
        <option value={item} key={key}>
          {item}
        </option>
      ))}
    </Form.Select>
  </InputGroup>
);

export default CurrencySelection;
