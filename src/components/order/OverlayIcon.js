import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const OverlayIcon = ({ condition, tooltipText, iconSrc, iconClass }) => {
  if (!condition) return null;

  return (
    <OverlayTrigger
      overlay={<Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: 'absolute' }}>{tooltipText}</Tooltip>}
      placement="top-start"
    >
      <img className={iconClass} src={iconSrc} alt={tooltipText} />
    </OverlayTrigger>
  );
};

export default OverlayIcon