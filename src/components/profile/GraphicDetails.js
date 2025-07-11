import React from 'react';
import { Col, Form, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Location from '../../asstes/locattionbtn2.svg';

const GeographicDetails = ({
  geoaddress,
  setgeoaddress,
  locationerr,
  setLocationerr,
  selectedcountry,
  setselectedcountry,
  useselectedstate,
  setuseState,
  useselectedcity,
  setuseselectedcity,
  Countries,
  States,
  Cities,
  getlocation,
  styles,
  countryerr,
  stateerr,
  cityerr,
  setcityerr,
  setstateerr,
  setcountryerr,
}) => {

  return (
    <div className="card">
      <div className="custom-card-header">
        <OverlayTrigger
          overlay={
            <Tooltip
              id="tooltip-disabled"
              bsPrefix="custom-tooltip"
              style={{ position: "absolute", marginRight: "5px" }}
            >
              Place where you normally work from
            </Tooltip>
          }
          placement="right"
        >
          <div>
            <i className="fas fa-map-marker-alt mr-2 ml-2"></i> *Operating Location
          </div>
        </OverlayTrigger>
      </div>
      <div className="card-body">
        <Row>
          <Col md={4}>
            <h6>Geographic Details</h6>
          </Col>
          <Col>
            <InputGroup>
              <Form.Control
                id="location"
                value={geoaddress}
                onChange={(e) => setgeoaddress(e.target.value)} // Handle changes
                aria-label="Current Location"
              />
              <InputGroup.Text>
                <a>
                  <img
                    onClick={() => {
                      setLocationerr("");
                      getlocation().then((d) => {
                        setselectedcountry(d.results[0].country);
                        setLocationerr("");
                      });
                    }}
                    className="attachbtn1"
                    src={Location}
                    alt="Location"
                  />
                </a>
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <h6 style={{ color: "red", textAlign: "center" }}>
          {locationerr}
        </h6>
        <Row className="textcenter mb-3">
          <Col style={{ marginTop: "10px" }} sm={6}>
            <select
              className="form-select"
              id="country"
              style={countryerr !== "" ? styles.err : null}
              onChange={(e) => {
                setselectedcountry(e.target.value);
                setuseState("");
                setuseselectedcity("");
              }}
              onClick={() => setcountryerr("")}
              aria-label="Default select example"
              value={selectedcountry}
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
          <Col style={{ marginTop: "10px" }} sm={6}>
            <Form.Select
              style={stateerr !== "" ? styles.err : null}
              id="state"
              onChange={(e) => {
                setstateerr("");
                setuseState(
                  useselectedstate === useselectedstate
                    ? e.target.value
                    : useselectedstate
                );
              }}
              aria-label="Default select example"
              value={useselectedstate}
            >
              <option value="">State/Province</option>
              {States.map((items, key) => (
                <option value={items} key={key}>
                  {items}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Select
              style={cityerr !== "" ? styles.err : null}
              id="city"
              onChange={(e) => {
                setcityerr("");
                setuseselectedcity(
                  useselectedcity === useselectedcity ? e.target.value : useselectedcity
                );
              }}
              onFocus={() => setcityerr("")}
              aria-label="Default select example"
              value={useselectedcity}
            >
              <option value="">City</option>
              {Cities.map((items, key) => (
                <option value={items} key={key}>
                  {items}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default GeographicDetails;
