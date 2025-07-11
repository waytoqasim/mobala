// PrimeServiceRequest.js
import React from 'react';
import { Button, Row, Spinner } from 'react-bootstrap';

const PrimeServiceRequest = ({ Permissions, showRequestPassCodeBtn, requestIsLoading, noPassCode, requestPassCode, PrimePasscode }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "20px",
      backgroundColor: "#fff",
      padding: "30px 15px",
      borderRadius: 10,
      width: "100%",
      maxWidth: "600px",
      boxSizing: "border-box",
      overflow: "hidden",
    }}
    id="primeservice"
  >
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <div className="pt-5" style={{ flex: "1 1 100%", textAlign: "center" }}>
          <p style={{ fontSize: "16px", margin: 0 }}>
            Money Changers: Would you like to activate Prime Services?
          </p>
          <br /> 
        </div>
        <div style={{ flex: "1 1 100%", padding: 0, marginTop: "-25px" }}>
          <Row>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <div style={{ marginRight: "0.5rem" }} className="mt-3">
                <input
                  type="radio"
                  name="flexRadioDefault3"
                  id="Normalbtn2"
                  checked={Permissions.isMcprime}
                  onClick={noPassCode}
                />
                &nbsp;
                <label
                  htmlFor="flexRadioDefault4"
                  style={{ fontSize: "16px" }}
                >
                  No
                </label>
              </div>
              <div style={{ paddingRight: "1.5rem" }} className="mt-3">
                <input
                  type="radio"
                  name="flexRadioDefault3"
                  id="Normalbtn2"
                  onClick={requestPassCode}
                />
                &nbsp;
                <label
                  htmlFor="flexRadioDefault4"
                  style={{ fontSize: "16px" }}
                >
                  Yes
                </label>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </div>

    {showRequestPassCodeBtn && (
      <div className="text-center" id="requestForPass">
        <Button
          className="requestPassCodeBtn btn-primary"
          onClick={PrimePasscode}
          style={{ width: "max-content" }}
        >
          {requestIsLoading ? (
            <Spinner animation="border" role="status" size="sm"></Spinner>
          ) : (
            <span>Request for Passcode</span>
          )}
        </Button>
      </div>
    )}
  </div>
);

export default PrimeServiceRequest;
