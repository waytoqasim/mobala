import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const BatchTag = ({ label, tooltip }) => {
  return (
    <div
      style={{
        flex: 1,
        paddingTop: "5px",
        display: "contents",
        marginRight: 10,
      }}
    >
      <div className="newbatch notranslate">
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: "absolute" }}>
              {tooltip}
            </Tooltip>
          }
          placement="top-start"
        >
          <span className="batchtext notranslate">{label}</span>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default BatchTag;
