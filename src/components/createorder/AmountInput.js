import React from 'react';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';

const AmountInput = ({ AddAmount, setAddAmount }) => {
  return (
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) => setAddAmount(e.target.value)}
              value={AddAmount}
              aria-label="Like min. or max. amounts you want to transact"
              placeholder="For example: add purpose, place, min. or max. amounts in million / billion etc."
            />
          </InputGroup>
        </Col>
      </Row>
  );
};

export default AmountInput;
