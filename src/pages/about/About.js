import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

function About() {
  const [radiobtn, setradiobtn] = useState(true);

  return (
    <div className="mainbg " style={{marginTop:100}}>
      <Row className="centeritem h100vh">
        <Col md={5} className="formbg contentcenter">
          <Form className="forminput  contentcenter radius p-5">
            <Row>
              <h3 className="text-center mb-3">About Mobala Fx!</h3>

              <h6 className="mb-3">
                Banks make anywhere between 2.5% to 5% off your money and it is
                a waste.
              </h6>

              <h6>
                We bring together people as a community to discuss and exchange
                money amongst themselves.
              </h6>

              <h6 className="bolheading mt-3">
                How things are done in Mobala Fx.
              </h6>
              <Row className="" style={{paddingLeft:30}}>
                <ul className="abuteli">
                  <li>Create an Order and push it to the marketplace</li>
                  <li>
                    Connect with other people who want to do the opposite, meet
                    them, establish confidence
                  </li>
                  <li>Do a series of “SMALL TRANSFERS”</li>
                  <li>
                    SMALL TRANSFERS minimize loss in case the other person is
                    unethical
                  </li>
                </ul>
              </Row>
            </Row>
            <Row className="text-center">
              <Col md={6} className="mt-3">
                <Button variant="danger" className=" btn " type="submit">
                  Exit
                </Button>
              </Col>
              <Col md={6} className="mt-3">
                <Button variant="success" className="btn" type="submit">
                  Continue
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default About;
