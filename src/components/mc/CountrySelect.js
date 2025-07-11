import React from "react";
import { Col, InputGroup, Form } from "react-bootstrap";

const CountrySelect = ({ selectedcountry, setselectedcountry, setuseState, setuseselectedcity, Countries }) => (
  <Col>
    <InputGroup className="mb-3">
      <Form.Select
        onChange={(e) => {
          setselectedcountry(e.target.value);
          setuseState("");
          setuseselectedcity("");
        }}
        aria-label="Country Select"
        value={selectedcountry}
      >
        <option value="">Country</option>
        {Countries.map((item, key) => (
          <option value={item} key={key}>
            {item}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  </Col>
);

export default CountrySelect;
