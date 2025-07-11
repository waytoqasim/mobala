import React from 'react';

const ArrowIcon = ({ rotatedArrow, arrowImage }) => (
  <div style={{ textAlign: "center" }}>
    <img
      style={{
        marginTop: "-4px",
        textAlign: "center",
        rotate: rotatedArrow ? "none" : "180deg", // Rotate conditionally based on `rotatedArrow`
      }}
      src={arrowImage}
      className="arrow icon"
      alt="logo"
    />
  </div>
);

export default ArrowIcon;
