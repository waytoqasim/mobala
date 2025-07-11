import React from 'react';
import { Button, Col, Form, OverlayTrigger, Row } from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import Tick from '../../asstes/tick.svg';

const LoginInformation = ({
  setUsername,
  UserName,
  usernameerr,
  checkUserName,
  countryerr,
  setSelectedLoginCountry,
  Countries,
  selectedlogincountry,
  setEmail,
  email,
  emailerr,
  border,
  showform,
  checkcode,
  setcheckcode,
  sendEmail,
  password,
  passworderr,
  changetype,
  changetypepass,
  type,
  passcheck,
  setConfirmPassword,
  confirmpassword,
  type1,
  styles,
  setusernameerr,
  setcountryerr,
  setEmailerror,
  renderTooltip
}) => {
  return (
    <>
      <Row className="mt-3">
        <Col className="mb-2">
          <h6 className="fw8">Login Information:</h6>
        </Col>
      </Row>
      <div className="border p-3">
        <Row>
          <Row style={{ marginTop: 20 }}>
            <Col>
              <label>
                *Preferred UserName / Display Name (can't be changed later)
              </label>
              <Form.Group controlId="PreferredUserName">
                <Form.Control
                  id="userName"
                  onChange={(e) => {
                    let value = e.target.value;
                    setUsername(value);
                    if (value > 12) {
                      e.preventDefault();
                    } else {
                      document.getElementById('takenlenerr').style.display = 'none';
                    }
                  }}
                  style={usernameerr !== '' ? styles.err : null}
                  value={UserName}
                  onBlur={(e) => checkUserName(e.target.value)}
                  type="text"
                  onClick={(e) => {
                    setusernameerr(null);
                  }}
                />
              </Form.Group>
              <h6 id="takenerr" style={{ color: 'red', display: 'none' }}>
                This Username already taken.
              </h6>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }} className="mt-3">
            <label>Country</label>
          </Row>
          <Row className="textcenter mb-3">
            <Col sm={6}>
              <select
                className="form-select"
                id="country"
                style={countryerr !== '' ? styles.err : null}
                onChange={(e) => setSelectedLoginCountry(e.target.value)}
                onClick={(e) => setcountryerr('')}
                aria-label="Default select example"
                value={selectedlogincountry}
              >
                <option value="" key={0}>
                  Country
                </option>
                {Countries.map((value, key) => (
                  <option value={value} key={key} hidden={key === 0}>
                    {value}
                  </option>
                ))}
              </select>
            </Col>
            <Col sm={6}></Col>
          </Row>
          <Row>
            <label>E-mail</label>
          </Row>
          <Col sm={8}>
            <Form.Group className="mb-3" controlId="E-mail" autoComplete="off">
              <Form.Control
                id="email"
                className={border === true ? 'inputgrennbdr' : null}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={emailerr !== '' ? styles.err : null}
                value={email}
                name="user_email"
                type="text"
                autoComplete="off"
                onClick={(e) => {
                  setEmailerror('');
                }}
              />
              <div className="tick-icon1">
                <img id="tick" style={{ display: 'none', width: '26px' }} src={Tick} />
              </div>
            </Form.Group>
            <span id="emailcheck" style={{ display: 'none', color: 'red' }}>
              {' '}
              Email is already registered
            </span>
            <span id="sendcodemsg" style={{ display: 'none', color: 'green' }}>
              {' '}
              Verification Email sent successfully
            </span>
            <Form.Group className="mb-3" controlId="E-mail">
              <label style={showform === true ? styles.show : styles.hide}>
                Enter Verification Code
              </label>
              <input name="subject" value={'Verification Code'} hidden={true} />
              <Form.Control
                id="verificationCode"
                as={NumberFormat}
                style={showform === true ? styles.show : styles.hide}
                onChange={(e) => setcheckcode(e.target.value)}
                value={checkcode}
              />
            </Form.Group>
            <span id="codeerr" style={{ display: 'none', color: 'red' }}>
              {' '}
              Your Verification Code is Incorrect
            </span>
            <span id="codeerr1" style={{ display: 'none', color: 'green' }}>
              {' '}
              Your Verification Code is Correct
            </span>
            <h6 style={{ color: 'red' }}>{emailerr}</h6>
          </Col>
          <Col
            style={{
              textAlign: 'center',
              marginBottom: '15px',
              marginTop: '-5px',
            }}
            sm={4}
          >
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button
                style={{ width: 'fit-content' }}
                id="codebutton"
                variant="success"
                onClick={sendEmail}
                className="verifybtn"
              >
                Verify
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginInformation;
