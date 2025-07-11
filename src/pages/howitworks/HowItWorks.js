import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Form,
  Row
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App";
import HowItWorksImg from "../../asstes/HowItWorks.svg";
import BackButton from "../../components/tips/BackButton";
import { AppContext } from "../../Context";

function HowItWorks() {
  const navigate = useNavigate();
  const location = useLocation();
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const context = useContext(AppContext);

  useEffect(
    () => {
      document.getElementById("root").scrollTop = 0;
      sessionStorage.setItem("previousPathName", window.location.pathname);
    },
    [location],
    navigate
  );

  useEffect(() => {}, [navigate]);
  return (
    <div className=" mainbg  mobile-margin">
      <Row className="centeritem h90vh ">
        <Col md={7} className="formbg contentcenter">
          <Form className="forminput radius contentcenter">
            <p>
              <h1 className="text-center mb-3">
                <strong>How it Works</strong>
              </h1>
              <br />
              <div>
                <p>
                  <h3>What is Mobala all about?</h3>
                  <p>
                    Banks make anywhere between 2.5% to 5% off your money when
                    you do a currency conversion or a remittance. This would be
                    embedded in exchange rate and in the fee structure. It is
                    wasteful and comes close to unintended arm-twisting.
                  </p>
                  <p>Mobala is built to make things better.</p>
                  <p>
                    We bring together people as a community to discuss and
                    exchange money based on mutual need, often taking the
                    services of a money changer to tie the deal together.
                  </p>
                  <p>
                    Simply put, a user creates an order in a public (or private)
                    order-book. Other users including money changers and banks
                    will put in their bids.
                  </p>
                  <p>
                    Now it is up to you to pick and choose and Finalize the deal
                    terms.
                  </p>
                  <br />
                  <h3>How do I exchange my money and get another currency?</h3>
                  <p>The key steps are:</p>
                  <br />
                  <img
                    src={HowItWorksImg}
                    style={{ width: "100%" }}
                    className="mb-5"
                  />

                  <h3>Can I get better than the Free market (Google) rate?</h3>
                  <p>Nothing is impossible!</p>
                  <p>
                    Just like airline tickets can get very expensive as you get
                    closer to the flight date and might get too cheap on the day
                    of flight, so also it depends on the needs of other parties
                    in currency exchange.{" "}
                  </p>
                  <p>
                    So do watch out for deals better than the Google rate,
                    especially if a Money Changer is offering it. But exercise
                    tremendous caution, as we classify these as High-Risk deals.
                  </p>
                  <br />

                  <h3>How can I ensure that I get a good deal?</h3>
                  <p>
                    There is a live market rate for FX which you can search on
                    Internet. We make available indicative rates as well.
                  </p>
                  <p>Some things to look out for in a deal are:</p>
                  <p>
                    <strong>1. FX rate:</strong>
                    <br />
                    It is obvious that you should target a rate better than what
                    the Banks offer, but it depends on your situation. In a
                    best-case scenario both parties get the market rate,
                    essentially a no-profit-no-loss situation. You or other
                    party might forgo a bit depending on the unique
                    circumstances. Please exercise caution if the rate is too
                    good to be true, or if someone is too pushy.
                  </p>
                  <p>
                    <strong>2. Quantity:</strong>
                    <br />
                    Mobala will match you to orders by other parties that might
                    have a bigger or smaller quantity on offer. This does not
                    mean that the other party is not willing to accept a lower
                    or higher quantity of currency. Do send / accept invites to
                    people who you are interested in and ask them about your
                    specific need. Things come only when you ask for.
                  </p>
                  <p>
                    <strong>3. Distance from your location:</strong>
                    <br />
                    You may or may not be in the same location as the
                    counter-parties you come across on Mobala. In such
                    circumstances you can do the following:
                    <br />
                    o Travel to the other location.
                    <br />
                    o Ask someone you trust to deal on your behalf.
                    <br />
                    o Ask the counter-party to come to your location, or you
                    meet somewhere in-between.
                    <br />
                    <br />
                    The distance given by us is the aerial distance, and it will
                    be less the actual distance you will need to travel.
                  </p>
                  <p>
                    <strong>4. Counter-party and your rating:</strong>
                    <br />
                    Just like you can see how other people have a rating, so can
                    others see how you are perceived by people. So, be nice,
                    truthful to everyone at Mobala. This will likely land you a
                    better deal as well.
                  </p>
                  <p>
                    <strong>5. Security:</strong>
                    <br />
                    There is nothing like 100% security in the World. When you
                    are meeting someone in-person you met at Mobala, you will
                    have to exercise the same amount of caution that you will
                    ordinarily do when you meet an unknown person on a street.
                    Be wary of any documents that a person shares. They may or
                    may not be genuine.
                  </p>

                  <p>
                    It seems safer to meet in-person at a public place, transact
                    in small amounts. Approaching a money changer in your
                    neighborhood to settle the deal for you might be a
                    worthwhile option, and it might be just a little cost.
                  </p>
                  <br />

                  <h3>What is the difference between 1-FX and Full FX?</h3>
                  <p>
                    1-FX is a simple one-screen solution for an occasional user,
                    like a tourist.
                  </p>
                  <p>
                    Full FX is for frequent users or for money changers who are
                    working through many deals.
                  </p>
                  <br />

                  <h3>What are Settlement Services</h3>
                  <p>
                    Settlement Services are offered by Money Changers whereby
                    the parties to a transaction visit a money changers premises
                    (shop) and exchange the money in his supervision. This is
                    primarily a service to bring a well-known service provider
                    to oversee a transaction and enhance trust.
                  </p>
                  <p>
                    Ideally, all Money Changers should be able to identify fake
                    bills too.
                  </p>
                  <p>
                    Our suggestion is that for large amounts you should work
                    with well-known Money Changers only and be at his premises
                    in-person.
                  </p>
                  <br />

                  <h3>Closing your account</h3>
                  <p>We offer two options in Full FX suite:</p>
                  <p>
                    {" "}
                    <strong> 1. Hibernate your account:</strong> <br />
                    All your current orders are put on-hold. No one can send you
                    invites.
                  </p>
                  <p>
                    {" "}
                    <strong> 2. Delete your account:</strong> <br />
                    This will delete your account details completely and your
                    email will be deleted from our system. If you would like to
                    come back, you will have to register again.
                  </p>
                  <p>
                    {" "}
                    1-order FX users need to contact us to Delete their account.{" "}
                    <br />
                  </p>

                  <p>
                    {" "}
                    <strong>
                      Does Mobala report the transactions to any Government?
                    </strong>{" "}
                    <br />
                    No, we do not, precisely because we do not process any
                    transaction.
                    <br />
                    All transactions are with the party you Finalize the deal
                    with. We have no information and we don't need to. <br />
                  </p>

                  <h3
                    style={{
                      background: "#2995be",
                      color: "white",
                    }}
                  >
                    Money Changers
                  </h3>
                  <p>
                    <strong>What's in it for Money Changers and Banks?</strong>
                    {/* <br />
                      Money changers and banks get leads and make offers.{" "}
                      <strong>MC Prime</strong> gives them an enhanced view of
                      the market. <strong>Syndication:</strong> With Syndication
                      you can work with other market players worldwide on large
                      and complex orders. */}
                  </p>
                  <p>
                    {" "}
                    <strong> 1. </strong>Money changers and banks get leads and
                    make offers.
                    <br /> <strong> 2. </strong>MC Prime gives them an enhanced
                    view of the market.
                    <br /> <strong> 3. </strong>We are looking for dynamic money
                    changers in each country to become country leaders. Send us
                    a message if you want to represent us in your country of
                    operation.
                  </p>
                </p>
              </div>
            </p>
            <BackButton />
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default HowItWorks;
