import React from 'react';
import { Col, InputGroup, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ExpiryDateInput = ({
  startDate,
  setStartDate,
  datedisable,
  setexpirytime,
  SetUntilGoodDate,
  maxDate
}) => {
  return (
    <Row md={7}>
      <Col style={{ textAlign: 'right' }}>
        <div className="d-flex" style={{ textAlign: 'right', justifyContent: 'end' }}>
          <p style={{ marginTop: 'revert' }}>Expiry</p>
          &nbsp;&nbsp;
          <InputGroup style={{ width: 'max-content' }}>
            <DatePicker
              disabled={datedisable}
              className="untilgooddate"
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                let x = date.toLocaleDateString('en-us', {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric',
                });
                x = x.replaceAll('/', '-');
                setexpirytime(x);
                SetUntilGoodDate(date.toISOString());
              }}
              minDate={new Date()}
              maxDate={maxDate}
              placeholderText="Select a date"
              dateFormat="MM/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              style={{ width: '200px', fontSize: '14px' }}
            />
            <div className="datelabel">
              <label
                style={{
                  fontStyle: 'italic',
                  fontSize: '12px',
                  color: '#00000080',
                  zIndex: 999,
                }}
              >
                mm/dd/yyyy
              </label>
            </div>
          </InputGroup>
        </div>
        <p
          style={{
            textAlign: 'Right',
            fontSize: '13px',
            fontWeight: '500',
          }}
        >
          All orders expire in 30 days unless specified.
          <br />
          Orders in Finalize (negotiation) don't expire.
        </p>
      </Col>
    </Row>
  );
};

export default ExpiryDateInput;
