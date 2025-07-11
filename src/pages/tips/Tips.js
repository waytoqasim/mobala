import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import BackButton from "../../components/tips/BackButton";

function Tips(props) {
  const [checkTips, setCheckTips] = useState(false);
  const navigate = useNavigate();
  const [key, setKey] = useState(0);
  const [signupShow, setSignupShow] = useState(false);
  const handleSignupClose = () => setSignupShow(false);

  useEffect(() => {
    sessionStorage.setItem("previousPathName", window.location.pathname);
    console.log(props);
  }, [props,navigate]);

  const navigateSignup = () => {
    let obj = {
      email: sessionStorage.getItem("email"),
      userId: sessionStorage.getItem("UserID"),
      userName: sessionStorage.getItem("UserName"),
    };
    let jsonString = JSON.stringify(obj);
    let encodedString = encodeURIComponent(jsonString);
    navigate(`/SignUp?data=${encodedString}&t=${Date.now()}`);
    setSignupShow(false);
  };


  return (
    <>
      {sessionStorage.getItem("previousPathName") === "/OrderFXHome" ? (
        <div className="d-flex flex-column maxh" style={{ marginTop: "60px" }}>
          <Modal
            show={signupShow}
            onHide={handleSignupClose}
            size="md"
            className="oneFXSignUpModal"
          >
            <Modal.Header>
              <Modal.Title>Full FX</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: "17px" }}>
                You need to sign up as Full-FX user.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Col>
                <Button
                  variant="Secondary"
                  onClick={handleSignupClose}
                  style={{ backgroundColor: "#9FA6B2", color: "white" }}
                >
                  Cancel
                </Button>
              </Col>
              <Col style={{ textAlign: "end" }}>
                <Button variant="primary" onClick={navigateSignup}>
                  SignUp
                </Button>
              </Col>
            </Modal.Footer>
          </Modal>
          <div className="d-flex tab1">
            <Col
              onClick={(k) => setKey(0)}
              className={key === 0 ? "fxBorder" : "noFxBorder"}
              style={{
                paddingTop: "5px",
                paddingBottom: "5px",
                borderRadius: 0,
                marginBottom: "-1px",
              }}
            >
              1-Order FX
            </Col>
            <Col
              onClick={(k) => {
                if (sessionStorage.getItem("City") === "null") {
                  setSignupShow(true);
                } else {
                  navigate(
                    `/OrderCom?ID=${sessionStorage.getItem(
                      "UserID"
                    )}&t=${Date.now()}`
                  );
                }
              }}
              className={key === 1 ? "fxBorder" : "noFxBorder"}
              style={{
                paddingTop: "5px",
                paddingBottom: "5px",
                borderRadius: 0,
                marginBottom: "-1px",
              }}
            >
              Full FX
            </Col>
          </div>
          <div
            className="container"
            style={{
              backgroundColor: "#ffffff",
              marginTop: 30,
              borderRadius: 10,
            }}
          >
            <Row style={{ padding: "0px 50px", fontSize: "14px" }}>
              <ul className="tipsli">
                <li className="mt-5" style={{ fontSize: "16px" }}>
                  <strong>
                    We endeavour Corporations, Small Businesses, Money Changers,
                    FIs and retail users leverage the platform to put their
                    requirements and we will use technology to find best
                    matches.
                  </strong>
                </li>
                <br />
                <li>
                  <strong>Distance:</strong> Entering into deals with nearby
                  persons may be easier to execute as you can meet in-person.
                  The distance given by us is the arial distance, and it will be
                  less the actual distance you will need to travel.
                </li>
                <br />
                <li>
                  <strong>Cash or Bank:</strong> Bank transfers can be reversed
                  as well in some circumstances. This is not to say that Cash is
                  always better. Be alert for counterfeit bills (look for any
                  irregularities, such as blurred or uneven printing, missing
                  security features, or unusual colors).
                </li>
                <br />
                <li>
                  <strong>Amounts:</strong> Start with small amounts as you may
                  not know the person. Mobala is a marketplace and does not
                  attest to the authenticity of anyone. Unless, of course, you
                  have reason to believe that you are not being scammed. Dealing
                  in small amounts multiple times is lesser risk. Usually there
                  is no bank fee for in-country deposits/transactions, so use
                  this to your benefit.
                </li>
                <br />
                <li>
                  <strong>Deal Finalize:</strong> In “Finalize” upload a copy of
                  the transfer you made. Let us know if the other party fails to
                  fulfill their Tx within 5 days. We can send a reminder, but
                  cannot force anything.
                </li>
                <br />
                <li>
                  <strong>Trust:</strong> Actively put your Trust Ranking so
                  everyone is adequately warned, and do let us know through{" "}
                  <strong>Report</strong> if you feel you did not get a fair
                  deal. Refer to the prior ratings given by other people.
                </li>
                <br />
                <li>
                  <strong>Buyer Beware:</strong> You might like to check and
                  take copies of the identity of the person you are dealing
                  with.
                </li>
                <br />
                <li>
                  <strong>Dealing with Money Changers (MCs):</strong> MCs are
                  not authenticated by Mobala and are classified based on
                  self-declaration. Therefore, take precaution just
                  like you will while dealing with anyone else.
                </li>
                <br />

                <li>
                  <strong>Be alert:</strong> Like any other phone or online
                  system, don't fall into traps of friendliness or threats. When
                  faced with anyone trying to get more details or getting
                  intimidating, just bolt out of the conversation. You can Block
                  people and Report them too through the application.
                  Unfortunately, we really can't do much in such circumstances.
                </li>
                <br />

                <li
                  style={{
                    background: "#2995be",
                    color: "white",
                  }}
                >
                  <strong>Money Changers</strong>
                </li>
                <br />
                <li>
                  <strong>Customer Service:</strong> Look for ways to add value,
                  for example, by providing services to clients at their home.
                  Some money changers form a syndicate with other money changers
                  to fulfill a deal
                </li>
                <br />
                <li>
                  <strong>Transparency:</strong> Share your credentials, and
                  your licenses.
                </li>
                <br />
                <li>
                  <strong>Syndication:</strong> If an order is large or
                  difficult to fulfill, you might want to use the Syndication
                  feature available for large orders. This would necessitate
                  that you view the list of other interested MCs and reach out
                  to them to jointly work on the deal. Mobala does not provide
                  anything more than the contact details.
                </li>
                <br />
                <li>
                  <strong>How to succeed:</strong><br />(1) Use Maps applications like
                  Google Maps, Baidu Maps, Apple Maps in your area to register
                  as a Mobala FX money changer. You will then be able to
                  leverage and be a part of the Mobala FX banner
                  <br />
                  (2) Buy and use Mobala FX merchandise to set yourself apart
                </li>
                {/* Insert 3 empty lines and increase the empty space before the last italicized  lines */}
                <br />
                <br />
                <br />
                <li>
                  <i>
                    Mobala FX has no role in a transaction other than providing
                    a platform for people to meet. If there is any loss of money
                    or anything else, it shall be the sole responsibility of the
                    users of this App and no blame shall come to Mobala FX, its
                    related entities or its personnel.
                  </i>
                </li>
              </ul>
            </Row>
          </div>
          <footer className="mt-auto">{/*<Footer />*/}</footer>
        </div>
      ) : (
        <div className="d-flex flex-column maxh" style={{ marginTop: "32px" }}>
          <div
            className="container"
            style={{
              backgroundColor: "#ffffff",
              marginTop: 30,
              borderRadius: 10,
            }}
          >
            <Row
              className="mt-4"
              style={{ padding: "0px 50px", fontSize: "14px" }}
            >
              <ul className="tipsli">
                <li className="mt-5" style={{ fontSize: "16px" }}>
                  <strong>
                    We endeavour Corporations, Small Businesses, Money Changers,
                    FIs and retail users leverage the platform to put their
                    requirements and we will use technology to find best
                    matches.
                  </strong>
                </li>
                <br />

                <li>
                  <strong>Distance:</strong> Entering into deals with nearby
                  persons may be easier to execute as you can meet in-person.
                </li>
                <br />

                <li>
                  <strong>Cash or Bank:</strong> Bank transfers can be reversed
                  as well in some circumstances. This is not to say that Cash is
                  always better. Be alert for counterfeit bills (look for any
                  irregularities, such as blurred or uneven printing, missing
                  security features, or unusual colors).
                </li>
                <br />

                <li>
                  <strong>Amounts:</strong> Start with small amounts as you may
                  not know the person. Mobala is a marketplace and does not
                  attest to the authenticity of anyone. Unless, of course, you
                  have reason to believe that you are not being scammed. Dealing
                  in small amounts multiple times is lesser risk. Usually there
                  is no bank fee for in-country deposits/transactions, so use
                  this to your benefit.
                </li>
                <br />

                <li>
                  <strong>Deal Finalize:</strong> In “Finalize” upload a copy of
                  the transfer you made. Let us know if the other party fails to
                  fulfill their Tx within 5 days. We can send a reminder, but
                  cannot force anything.
                </li>
                <br />

                <li>
                  <strong>Trust:</strong> Actively put your Trust Ranking so
                  everyone is adequately warned, and do let us know through{" "}
                  <strong>Report</strong> if you feel you did not get a fair
                  deal. Refer to the prior ratings given by other people.
                </li>
                <br />

                <li>
                  <strong>Buyer Beware:</strong> You might like to check and
                  take copies of the identity of the person you are dealing
                  with.
                </li>
                <br />

                <li>
                  <strong>Dealing with Money Changers (MCs):</strong> MCs are
                  not authenticated by Mobala and are classified based on
                  self-declaration. Therefore, take precaution just
                  like you will while dealing with anyone else.
                </li>
                <br />

                <li>
                  <strong>Be alert:</strong> Like any other phone or online
                  system, don't fall into traps of friendliness or threats. When
                  faced with anyone trying to get more details or getting
                  intimidating, just bolt out of the conversation. You can Block
                  people and Report them too through the application.
                  Unfortunately, we really can't do much in such circumstances.
                </li>
                <br />

                <li
                  style={{
                    background: "#2995be",
                    color: "white",
                  }}
                >
                  <strong>Money Changers</strong>
                </li>
                <br />

                <li>
                  <strong>Customer Service:</strong> Look for ways to add value,
                  for example, by providing services to clients at their home.
                  Some money changers form a syndicate with other money changers
                  to fulfill a deal.
                </li>
                <br />

                <li>
                  <strong>Transparency:</strong> Share your credentials, and
                  your licenses.
                </li>
                <br />
                <li>
                  <strong>Syndication:</strong> If an order is large or
                  difficult to fulfill, you might want to use the Syndication
                  feature available for large orders. This would necessitate
                  that you view the list of other interested MCs and reach out
                  to them to jointly work on the deal. Mobala does not provide
                  anything more than the contact details.
                </li>
                <br />
                <li>
                  <strong>How to succeed:</strong><br />(1) Use Maps applications like
                  Google Maps, Baidu Maps, Apple Maps in your area to register
                  as a Mobala FX money changer. You will then be able to
                  leverage and be a part of the Mobala FX banner
                  <br />
                  (2) Buy and use Mobala FX merchandise to set yourself apart
                </li>
                {/* Insert 3 empty lines and increase the empty space before the last italicized  lines */}
                <br />
                <br />
                <br />

                <li>
                  <i>
                    Mobala FX has no role in a transaction other than providing
                    a platform for people to meet. If there is any loss of money
                    or anything else, it shall be the sole responsibility of the
                    users of this App and no blame shall come to Mobala FX, its
                    related entities or its personnel.
                  </i>
                </li>
                <br />
              </ul>
            </Row>
            <BackButton />
          </div>
          <footer className="mt-auto">{/*<Footer />*/}</footer>
        </div>
      )}
    </>
  );
}

export default Tips;
