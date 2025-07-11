import React from "react";
import { Col, InputGroup, Form } from "react-bootstrap";

const CitySelect = ({ useselectedcity, setuseselectedcity, Cities }) => (
  <Col>
    <InputGroup className="mb-3">
      <Form.Select
        onChange={(e) => setuseselectedcity(e.target.value)}
        aria-label="City Select"
        value={useselectedcity}
      >
        <option value="">City</option>
        {Cities.map((items, key) => (
          <option value={items} key={key}>
            {items}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  </Col>
);

export default CitySelect;
