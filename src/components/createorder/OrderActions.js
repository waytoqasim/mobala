import React from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrderActions = ({
  isChecked,
  setIsChecked,
  docid,
  isLoading,
  isLoadingHold,
  PutonHold,
  Updatedoc,
  uid,
  activateBtn,
  props,
  ifFxSignup,
  Activate
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <input
          type="checkbox"
          id="setAlerts"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          style={{ cursor: "pointer" }}
        />
        <label htmlFor="setAlerts" style={{ marginBottom: 0 }}>
          Send State/Province level alerts for Matches to this order
        </label>
      </div>
      {isChecked && (
        <div
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          By sending this Order, you agree that this is a genuine requirement.
          Mobala will remove orders which are mischievous or ill-intended.
        </div>
      )}

      <Row className="mt-3">
        {props.is1FX || props.isHomeFX ? null : (
          <Col>
            <Button
              onClick={() => {
                let temp = sessionStorage.getItem("previousPathName");
                if (temp === "/OrderCom") {
                  navigate(`/OrderCom?ID=${uid}&t=${Date.now()}`);
                } else {
                  navigate(`/OrderFXHome?ID=${uid}&t=${Date.now()}`);
                }
              }}
              variant="danger"
              className="btnlogin1"
              style={{ marginTop: "15px" }}
            >
              <h6 style={{ margin: 0, textTransform: "capitalize" }}>
                Cancel
              </h6>
            </Button>
          </Col>
        )}

        {docid.length > 0 ? (
          <Col style={{ textAlign: "center" }}>
            <Button
              onClick={Updatedoc}
              variant="success"
              className="btnlogin1 mt-3"
            >
              {isLoading ? (
                <Spinner animation="border" role="status" size="sm">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Update"
              )}
            </Button>
          </Col>
        ) : (
          <>
            {props.is1FX || props.isHomeFX ? null : (
              <Col
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Button
                  onClick={() => {
                    PutonHold();
                  }}
                  variant="warning"
                  className="btnlogin1"
                  style={{ marginTop: "15px" }}
                >
                  {isLoadingHold ? (
                    <Spinner animation="border" role="status" size="sm">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <h6
                      style={{
                        margin: 0,
                        textTransform: "capitalize",
                        textWrap: "nowrap",
                      }}
                    >
                      Put on Hold
                    </h6>
                  )}
                </Button>
              </Col>
            )}

            <Col
              style={{
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Button
                onClick={props.is1FX ? ifFxSignup : () => Activate(uid)}
                variant="primary"
                className={props.is1FX || props.isHomeFX ? "" : "btnlogin1"}
                style={{ marginTop: "15px" }}
                ref={activateBtn}
                disabled={false}
              >
                {isLoading ? (
                  <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <h6
                    style={{
                      margin: 0,
                      textTransform: "capitalize",
                      textWrap: "nowrap",
                    }}
                  >
                    {props.is1FX ? "Submit" : "Activate Order"}
                  </h6>
                )}
              </Button>
              <p
                style={{
                  fontStyle: "italic",
                  color: "grey",
                  textAlign: "center",
                  marginTop: "5px",
                }}
              >
                {props.is1FX ? (
                  <p>
                    By pressing Submit, I acknowledge having read and agreeing to
                    <br />
                    the{" "}
                    <a href="/Terms" target="_blank">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/PrivacyPolicy" target="_blank">
                      Privacy Policy
                    </a>
                    .
                  </p>
                ) : (
                  ""
                )}
              </p>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default OrderActions;
