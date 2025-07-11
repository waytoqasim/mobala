import React from 'react';
import { Col, Row } from "react-bootstrap";

const BundleSwitch = ({ isSwitchOn, setisSwitchOn, bundleError, partyBundleError }) => (
  <>
    <Row className="centeritem">
      <Col md={7} className="searchFilterDiv" style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="custom-control custom-switch mt-2">
          <input
            type="checkbox"
            className="custom-control-input"
            id="bundleSwitches"
            checked={isSwitchOn}
            onChange={(e) => setisSwitchOn(e.target.checked)}
          />
          <label className="custom-control-label" htmlFor="bundleSwitches" style={{ marginLeft: "10px" }}>
            Show Bundles
          </label>
        </div>

        <div className={isSwitchOn ? "visible" : "invisible"}>
          <input type="radio" id="option1" name="radio-group" value="option1" checked={isSwitchOn} />
          &nbsp;&nbsp;
          <label htmlFor="option1">2-party</label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="radio" id="option2" name="radio-group" value="option2" disabled={!isSwitchOn} />
          &nbsp;&nbsp;
          <label htmlFor="option2">3-party</label>
        </div>
      </Col>
    </Row>

    <Row className="centeritem">
      <Col md={7}>
        <p
          style={{
            backgroundColor: "#ff0000bf",
            borderRadius: 5,
            color: "#fff",
            textAlign: "center",
            fontSize: 12,
          }}
        >
          {bundleError && <span>{bundleError}<br /></span>}
          {partyBundleError}
        </p>
      </Col>
    </Row>
  </>
);

export default BundleSwitch;
