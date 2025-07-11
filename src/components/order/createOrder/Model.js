import React from "react";
import { Button, Modal } from "react-bootstrap";

const Model =({showModal,hideModal,confirmModal})=>{
    return(
        <Modal show={showModal} onHide={hideModal} size="md">
                  <Modal.Header>
                    <Modal.Title>
                      Duplicate Orders are not permitted
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p style={{ fontSize: "17px" }}>
                      There is an Order present with same Currencies and
                      Locations. Do you want to edit that order?
                    </p>
                  </Modal.Body>
                  <Modal.Footer
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="default"
                      style={{ width: "20%" }}
                      onClick={confirmModal}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="primary"
                      style={{ width: "20%" }}
                      onClick={hideModal}
                    >
                      No
                    </Button>
                  </Modal.Footer>
                </Modal>
    )
}

export default Model;