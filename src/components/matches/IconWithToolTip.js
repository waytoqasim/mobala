import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const IconWithToolTip = ({ tooltipText, iconSrc, iconClass, style }) => (
  <OverlayTrigger
    overlay={<Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: "absolute" }}>{tooltipText}</Tooltip>}
    placement="top-start"
  >
    <img alt={tooltipText} className={iconClass} src={iconSrc} style={style} />
  </OverlayTrigger>
);

export default IconWithToolTip;
