import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const AdditionalInfo = ({ additionalInfo, infoImage }) => {
  if (!additionalInfo) return null; // Don't render anything if there is no additional info

  return (
    <div
      className={`${
        additionalInfo === "" || additionalInfo === null
          ? "invisible"
          : "visible"
      }`}
      style={{
        textAlign: "center",
        marginBottom: "4px",
        position: "relative",
      }}
    >
      <OverlayTrigger
        overlay={
          <Tooltip
            id="tooltip-disabled"
            bsPrefix="custom-tooltip"
            style={{ position: "absolute" }}
          >
            Additional Info: {additionalInfo}
          </Tooltip>
        }
        placement="top-start"
      >
        <a className="btn-option" style={{ textAlign: "center" }}>
          <img style={{}} src={infoImage} className="info" alt="logo" />
        </a>
      </OverlayTrigger>
    </div>
  );
};

export default AdditionalInfo;
