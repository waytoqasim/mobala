import React from 'react';
import { Modal } from 'react-bootstrap';

// Single Modal Component
const InfoModal = ({ showModal, hideModal, close }) => (
  <Modal
    show={showModal}
    onHide={hideModal}
    className="no-padding-modal infoModal custom-modal-position"
  >
    {/* Modal Header */}
    <Modal.Header style={{ backgroundColor: "#2995be", color: "white" }}>
      <Modal.Title style={{ lineHeight: "0" }}>Countries, Currencies & Bundles</Modal.Title>
      <div
        className="close-icon d-flex justify-content-end"
        style={{ height: "17px", cursor: "pointer" }}
      >
        <img src={close} alt="Close" onClick={hideModal} />
      </div>
    </Modal.Header>

    {/* Modal Body */}
    <Modal.Body>
      <div style={{ fontSize: "13px", background: "white", color: "grey" }}>
        <p className="mb-1">
          1) Countries selection has to be exact on Give & Take to show up the deals.
        </p>
        <p className="mt-1 mb-1">
          2) Bundles are made with exact Countries and
          one-matching-Currency. Try to square-off deals.
        </p>
        <p className="mt-1 mb-1">
          3) Create an offer if you don't have one already in that CITY.
        </p>
      </div>
    </Modal.Body>
  </Modal>
);

export default InfoModal;
