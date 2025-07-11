import React from 'react';

const ErrorNotification = ({ bundleError, partyBundleError }) => {
  return (
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
  );
};

export default ErrorNotification;
