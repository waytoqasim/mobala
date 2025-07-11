import React from "react";
import { Col, InputGroup, Form } from "react-bootstrap";

const StateSelect = ({ useselectedstate, setuseState, setuseselectedcity, States }) => (
  <Col>
    <InputGroup className="mb-3">
      <Form.Select
        onChange={(e) => {
          setuseState(e.target.value);
          setuseselectedcity("");
        }}
        aria-label="State/Province Select"
        value={useselectedstate}
      >
        <option value="">State/Province</option>
        {States.map((items, key) => (
          <option value={items} key={key}>
            {items}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  </Col>
);

export default StateSelect;
