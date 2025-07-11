// PermissionsComponent.js
import React from "react";
import { Col } from "react-bootstrap";
import PrimePasscodeForm from "./PrimePasscodeForm"; // assuming this component exists
import PrimeServiceRequest from "./PrimeServiceRequest"; // assuming this component exists

const Permissions = ({
  permssions,
  Permissions, 
  showRequestPassCodeBtn,
  requestIsLoading,
  noPassCode,
  requestPassCode,
  PrimePasscode
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {permssions.isMc === true && permssions.isMcprime === true ? null : (
        <Col
          id="permissions"
          md={5}
          className="card mt-5"
          style={{
            padding: 30,
            borderRadius: 10,
            cursor: "auto",
            border: "none",
          }}
        >
          {/* Check if isMc is false */}
          {permssions.isMc === false && (
            <div>
              <h4
                style={{
                  color: "#202020",
                  textAlign: "center",
                }}
              >
                Register as Money Changer to avail Prime Deals.
              </h4>
              <br />
            </div>
          )}

          {/* Show Prime Service Activation if isMcprime is false and isMc is true */}
          {permssions.isMcprime === false && permssions.isMc === true && (
            <PrimeServiceRequest
              Permissions={Permissions}
              showRequestPassCodeBtn={showRequestPassCodeBtn}
              requestIsLoading={requestIsLoading}
              noPassCode={noPassCode}
              requestPassCode={requestPassCode}
              PrimePasscode={PrimePasscode}
            />
          )}
        </Col>
      )}

      {permssions.isMcprime === true && permssions.isMcprimeAuthenticated === false && (
        <Col
          md={5}
          className="card mt-5"
          style={{
            cursor: "auto",
            padding: 30,
            borderRadius: 10,
            alignContent: "center",
          }}
          id="primepasscodeId"
        >
          <PrimePasscodeForm />
        </Col>
      )}
    </div>
  );
};

export default Permissions;
