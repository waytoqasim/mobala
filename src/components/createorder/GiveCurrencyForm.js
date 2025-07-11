import React from 'react';
import { Col, Form, InputGroup, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

const GiveCurrencyForm = ({
  givecurrency,
  setgivecurrency,
  givecurrencyerr,
  giveamount,
  setgiveamount,
  getGiveSuggestions,
  giveamounterr,
  outputGive,
  giveSuggestion,
  formatoutputGive,
  formatoutput,
  handleAmountSuretyGive,
  amountSuretyGive,
  amountSuretyerrGive,
  selectedcountry,
  setselectedcountry,
  useselectedcity,
  setuseselectedcity,
  useselectedstate,
  setuseState,
  Countries,
  giveStates,
  giveCities,
  error,
  Cash,
  setCash,
  Bank,
  setBank,
  giveAssistance,
  setGiveAssistance,
  iseditORder,
  mcOrderId,
  giveLengtherr,
  showGiveSuggestion,
  giveLengtherr1,
  takecurrency,
  setgivecurrencyerror,
  setgiveCountryId,
  setgivestateId,
  setError,
  Currencies,
  setgiveamounterr,
  stateArray
}) => {
  return (
    <div>
      <h6 className="fw8 mb-3 relative">
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: "absolute", marginLeft: "5px" }}>
              Sell
            </Tooltip>
          }
          placement="right"
        >
          <span style={{ cursor: "default" }}>I Want to Give</span>
        </OverlayTrigger>
      </h6>

      <div className="border p-3">
        <Row className="textcenter">
          <Col>
            <InputGroup className="mb-3">
              <Form.Select
                id="giveCurrency"
                style={givecurrencyerr !== "" ? { border: "1px solid red" } : null}
                onChange={(e) => setgivecurrency(e.target.value)}
                onClick={() => setgivecurrencyerror("")}
                value={givecurrency}
                disabled={iseditORder || mcOrderId}
                aria-label="Default select example"
              >
                <option value="">Currency</option>
                {Currencies.map((item, key) => (
                  <option value={item} key={key}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>

          <Col className="mb-3" style={{ textAlign: "end" }}>
            <InputGroup>
              <input
                className="giveamount form-control"
                style={giveamounterr !== "" ? { border: "1px solid red" } : { textAlign: "right" }}
                thousandseparator="true"
                id="giveAmountInput"
                autoComplete="off"
                onFocus={getGiveSuggestions}
                onInput={(e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  const cursorPosition = e.target.selectionStart;

                  if (val === "") {
                    setgiveamount(val);
                    return;
                  }

                  setgiveamount(parseInt(val, 10).toLocaleString("en-US"));
                  e.target.setSelectionRange(cursorPosition, cursorPosition);
                }}
                onClick={() => setgiveamounterr("")}
                onKeyPress={(e) => {
                  if (e.charCode < 48 || e.charCode > 57) e.preventDefault();
                  if (e.target.value.length >= 9) e.preventDefault();
                }}
                maxLength={8}
                value={giveamount}
                aria-label="Amount"
                placeholder={
                  givecurrency != null
                    ? (givecurrency.toLowerCase().includes("gold") ? "Grams" : "Amount")
                    : "Amount"
                }                />
            </InputGroup>
          </Col>
        </Row>

        <Row
          style={{
            visibility: showGiveSuggestion ? "visible" : "hidden",
          }}
        >
          {giveLengtherr == null ? null : (
            <p
              className="text-right"
              id="limiterr1"
              style={{
                fontSize: "15px",
                color: "#ff3f3f",
                fontStyle: "italic",
              }}
            >
              {giveLengtherr ? "Entered amount is low" : "Entered amount is high"}
            </p>
          )}

          <p className="text-right" style={{ margin: 0 }}>
            Go For: <span style={{ color: "red" }}>{outputGive === "NaN" ? null : outputGive} </span>
          </p>
          <p className="text-right" style={{ margin: 0 }}>
            Best Google Amount: <span style={{ color: "red" }}>{giveSuggestion === "NaN" ? null : giveSuggestion} </span>
          </p>

          <p className="text-right" style={{ margin: 0, color: "red", fontStyle: "italic" }}>
            {formatoutputGive === "NaN" ? null : `1 ${takecurrency} =  ${formatoutputGive} ${givecurrency}`}
          </p>

          <p className="text-right" style={{ margin: 0, color: "red", fontStyle: "italic" }}>
            {formatoutput === "NaN" ? null : `1 ${givecurrency} =  ${formatoutput} ${takecurrency}`}
          </p>

          <div
            id="amountsuretygive"
            style={{
              visibility: giveLengtherr == null ? "hidden" : "visible",
            }}
          >
            <input onClick={handleAmountSuretyGive} checked={amountSuretyGive} type="checkbox" />
            Are you sure of this amount
          </div>
          <label style={{ marginBottom: "10px", color: "red" }}>
            {amountSuretyerrGive}
          </label>
        </Row>

        <Row className="textcenter">
          <Col xs={12} sm={4} className="mb-3">
            <InputGroup>
              <Form.Select
                id="givecountry"
                style={error?.giveCountryErr !== "" ? { border: "1px solid red" } : null}
                onChange={(e) => {
                  setselectedcountry(e.target.value);
                  setuseselectedcity("");
                  setuseState("");
                  let tempListOfCountries = [...Countries];
                  for (let index = 0; index < tempListOfCountries.length; index++) {
                    if (e.target.value == tempListOfCountries[index]) {
                      setgiveCountryId(index);
                    }
                  }
                }}
                onClick={() => setError({ ...error, giveCountryErr: "" })}
                value={selectedcountry}
              >
                <option value="">Country</option>
                {Countries.map((item, key) => (
                  <option value={item} key={key}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>

          <Col xs={12} sm={4} className="mb-3">
            <InputGroup>
              <Form.Select
                id="givestate"
                style={error?.giveStateErr !== "" ? { border: "1px solid red" } : null}
                onChange={(e) => {
                  setuseselectedcity("");
                  setuseState(e.target.value);
                  for (let index = 0; index < stateArray.length; index++) {
                    if (e.target.value == stateArray[index]) {
                      setgivestateId(index);
                    }
                  }
                }}
                onClick={() => setError({ ...error, giveStateErr: "" })}
                value={useselectedstate}
              >
                <option value="">State/Province</option>
                {giveStates.map((items, key) => (
                  <option value={items} key={key}>
                    {items}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>

          <Col xs={12} sm={4} className="mb-3">
            <InputGroup>
              <Form.Select
                id="givecity"
                style={error?.giveCityErr !== "" ? { border: "1px solid red" } : null}
                onChange={(e) => setuseselectedcity(e.target.value)}
                onClick={() => setError({ ...error, giveCityErr: "" })}
                value={useselectedcity}
              >
                <option value="">City</option>
                <option style={{ color: "black", backgroundColor: "#a2e99d" }} value="Any City">
                  Any City
                </option>
                {giveCities.map((items, key) => (
                  <option value={items} key={key}>
                    {items}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div className="mt-2">
            <input onClick={() => setCash(!Cash)} checked={Cash} type="checkbox" /> Cash
            <input onClick={() => setBank(!Bank)} checked={Bank} type="checkbox" className="chkbox ml-3" /> Bank
          </div>

          <div className="mt-2">
            <input onClick={() => setGiveAssistance(!giveAssistance)} checked={giveAssistance} type="checkbox" />
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: "absolute" }}>At Give Location</Tooltip>}
              placement="top-start"
            >
              <span style={{ cursor: "default" }}>Money changer assistance is required.</span>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveCurrencyForm;
