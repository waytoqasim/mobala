import React, { Suspense, lazy, useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import info from "../../asstes/Iinfo.svg";
import close from "../../asstes/close.svg";
import closeIcon from "../../asstes/closeIcon.svg";
import Loading from "../../components/loader/loading";

const Login = lazy(() => import("../login/Login"));
const CreateOrder = lazy(() => import("../createorder/Creatorder"));

function DirectOrder() {
  const navigate = useNavigate();
  const [key, setKey] = useState(1);
  const [customer, setCustomer] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const previousUrl = sessionStorage.getItem("previousPathName");
    if (previousUrl === "/OrderFXHome" || previousUrl === "/OrderCom") {
      navigate(1);
    }
    if (window.location.search.split("=")[1] != undefined) {
      if (window.location.search.split("=")[1] == "orderfx") {
        setKey(0);
        setCustomer(1);
      }
    }
  }, []);

  const toggleCustomer = () => {
    setCustomer(customer === 0 ? 1 : 0);
  };

  const toggleContent = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div id="orderFX">
        <Modal
          show={showModal}
          onHide={hideModal}
          className="no-padding-modal infoModal"
        >
          <Modal.Header style={{ backgroundColor: "#2995be", color: "white" }}>
            <Modal.Title>Select: 1-Order FX or Full FX</Modal.Title>
            <div
              className="close-icon d-flex justify-content-end"
              style={{ height: "17px" }}
            >
              <img src={close} alt="Close" onClick={hideModal} />
            </div>
          </Modal.Header>

          <Modal.Body>
            <div
              className=" p-3"
              style={{ fontSize: "14px", background: "white", color: "grey" }}
            >
              <p className=" mb-3">
                Mobala helps you find people and money changers with whom you
                can mutually exchange foreign currency and save on traditional
                conversion costs.
              </p>
              <p className="mt-3 mb-3">
                If you need to exchange on an occasional basis, we suggest you
                use 1-Order FX.
              </p>
              <p className="mt-3 mb-3">
                If you have frequent conversion requirements, you might have a
                better experience with our full feature Full FX.
              </p>
              <p className="mt-3 mb-3">
                Regardless, we have no fees, after all we just help you discover
                people like yourself.
              </p>
              <p className="mt-3 mb-3">
                Mobala is a free platform. We don't handle any money and have
                no agents acting on our behalf.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <div
          style={{
            marginTop: "none",
            padding: 0,
            background: "white",
          }}
        >
          <div className="tab1">
            <Row className="d-flex tab1">
              <Col
                onClick={() => setKey(0)}
                className={key === 0 ? "fxBorder" : "noFxBorder"}
                style={{
                  marginLeft: "0%",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  borderRadius: 0,
                  marginBottom: "-1px",
                }}
              >
                1-Order FX
              </Col>
              <Col
                onClick={() => setKey(1)}
                className={key === 1 ? "fxBorder" : "noFxBorder"}
                style={{
                  marginLeft: "0px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  borderRadius: 0,
                  marginBottom: "-1px",
                }}
              >
                Full FX
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: 10 }}>
            <a
              className="btn-option"
              style={{ textAlign: "center" }}
              onClick={toggleContent}
            >
              <img
                src={info}
                className="info ml-5"
                alt="logo"
                style={{ width: "30px" }}
              />
            </a>
          </div>
          <Container>
            {showContent && (
              <div className="infoLandingPage">
                <div className="content-header">
                  <div className="close-icon d-flex justify-content-end">
                    <img src={closeIcon} alt="Close" onClick={hideModal} />
                  </div>
                </div>
                <div
                  className=" p-3"
                  style={{ background: "white", color: "grey" }}
                >
                  <p className=" mb-3">
                    Mobala helps you find people and money changers with whom
                    you can mutually exchange foreign currency and save on
                    traditional conversion costs.
                  </p>
                  <p className="mt-3 mb-3">
                    If you need to exchange on an occasional basis, we suggest
                    you use 1-Order FX.
                  </p>
                  <p className="mt-3 mb-3">
                    If you have frequent conversion requirements, you might have
                    a better experience with our full feature Full FX.
                  </p>
                  <p className="mt-3 mb-3">
                    Regardless, we have no fees, after all we just help you
                    discover people like yourself.
                  </p>
                  <p className="mt-3 mb-3">
                    Mobala is a free platform. We don't handle any money and
                    have no agents acting on our behalf.
                  </p>
                </div>
              </div>
            )}
            {key === 0 ? (
              <div className="orderFXBorderBody">
                <div
                  className="d-flex justify-content-between w-100 position-relative NewAndReturningCustomer"
                  style={{ marginTop: "2px" }}
                >
                  <div
                    className="custom-control d-flex custom-switch mt-2"
                    style={{ flex: "1 1 0"}}
                  >
                    <label
                      htmlFor={`customerToggle1`}
                      className="mb-0 mr-5 cursor-pointer new-customer-style"
                     style={{textWrap:"nowrap", marginLeft: "10px"}}
                    >
                      New customer
                    </label>
                    <input
                      type="checkbox"
                      className="custom-control-input cursor-pointer"
                      id={`customerToggle1`}
                      checked={customer === 0}
                      onChange={toggleCustomer}
                      style={{ display: "none" }} // Hide the checkbox
                    />
                    <label
                      className="custom-control-label cursor-pointer"
                      htmlFor={`customerToggle1`}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Returning customer
                    </label>
                  </div>
                </div>
                <div
                  className="d-flex align-items-center"
                  style={{
                    borderRadius: "10px",
                    padding: "2px",
                    marginTop: "10px",
                  }}
                  onClick={toggleCustomer}
                >
                  <div
                    className={`customer-toggle ${
                      customer === 0 ? "active" : ""
                    }`}
                  ></div>
                  <div
                    className={`customer-toggle ${
                      customer === 1 ? "active" : ""
                    }`}
                  ></div>
                </div>

                {customer === 1 ? (
                  <Suspense fallback={<Loading />}>
                    <CreateOrder
                      setCustomer={setCustomer}
                      is1FX={true}
                    ></CreateOrder>
                  </Suspense>
                ) : (
                  <Suspense fallback={<Loading />}>
                    <Login setCustomer={setCustomer} is1FX={true}></Login>
                  </Suspense>
                )}
              </div>
            ) : (
              <div className="orderFXBorderBody">
                <Suspense fallback={<Loading />}>
                  <Login isFullFx={true}></Login>
                </Suspense>
              </div>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default DirectOrder;
