import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const PaymentMethodIcons = ({ takeThroughBank, takeThroughCash, bankImage, cashImage }) => (
  <>
    {takeThroughBank ? (
      <OverlayTrigger
        overlay={
          <Tooltip
            id="tooltip-disabled"
            bsPrefix="custom-tooltip"
            style={{ position: "absolute" }}
          >
            Bank
          </Tooltip>
        }
        placement="top-start"
      >
        <img alt="" style={{ marginLeft: 0 }} className="bankicon" src={bankImage}></img>
      </OverlayTrigger>
    ) : null}

    {takeThroughCash ? (
      <OverlayTrigger
        overlay={
          <Tooltip
            id="tooltip-disabled"
            bsPrefix="custom-tooltip"
            style={{ position: "absolute" }}
          >
            Cash
          </Tooltip>
        }
        placement="top-start"
      >
        <img alt="" className="cashicon" src={cashImage}></img>
      </OverlayTrigger>
    ) : null}

    {!takeThroughCash && !takeThroughBank ? (
      <div style={{ position: "relative" }}>
        <OverlayTrigger
          overlay={
            <Tooltip
              id="tooltip-disabled"
              bsPrefix="custom-tooltip"
              style={{ position: "absolute" }}
            >
              Cash
            </Tooltip>
          }
          placement="top-start"
        >
          <img alt="" style={{ marginLeft: 0 }} src={cashImage} className="cashicon"></img>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={
            <Tooltip
              id="tooltip-disabled"
              bsPrefix="custom-tooltip"
              style={{ position: "absolute" }}
            >
              Bank
            </Tooltip>
          }
          placement="top-start"
        >
          <img alt="" src={bankImage} className="bankicon"></img>
        </OverlayTrigger>
      </div>
    ) : null}
  </>
);

export default PaymentMethodIcons;
