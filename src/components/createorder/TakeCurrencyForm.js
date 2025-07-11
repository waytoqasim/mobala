import React from "react";
import { Col, Form, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

const TakeCurrencyForm = ({
  Currencies,
  Countries,
  takecurrency,
  settakecurrency,
  takecurrencyerr,
  takeamount,
  takelengtherr,
  output,
  takeSuggestion,
  formatoutput,
  formatoutputGive,
  takeCash,
  takeBank,
  takeAssistance,
  amountSurety,
  amountSuretyerr,
  iseditORder,
  mcOrderId,
  error,
  takeStates,
  takeCities,
  usegiveselectedcity,
  usegiveselectedstate,
  settakeamount,
  handletakeCashSource,
  handletakeBankSource,
  handletakeAssistance,
  handleAmountSurety,
  getTakeSuggestions,
  styles,
  setError,
  giveselectedcountry,
  setgiveuseselectedcity,
  givecurrency,
  setgiveuseState,
  settakecurrencyerr,
  setgiveselectedcountry
}) => {
  return (
    <div className="border p-3 mt-3">
      <Row>
        <Col></Col>
      </Row>

      <Row className="textcenter">
        <Col>
          <InputGroup className="mb-3">
            <Form.Select
              style={takecurrencyerr !== "" ? styles.err : null}
              onChange={(e) => {
                settakecurrency(e.target.value);
              }}
              value={takecurrency}
              aria-label="Default select example"
              disabled={iseditORder || mcOrderId}
              onClick={() => {
                settakecurrencyerr("");
              }}
            >
              <option value="">Currency</option>
              {Currencies.map((item, key) => (
                <option value={item} key={key}>
                  {item}{" "}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
        <Col style={{ textAlign: "end" }}>
          <InputGroup>
            <input
              id="takeAmount"
              className="form-control"
              style={takecurrencyerr !== "" ? styles.err : { textAlign: "right" }}
              autoComplete="off"
              onFocus={getTakeSuggestions}
              thousandseparator="true"
              onInput={(e) => {
                let val = e.target.value;
                val = val.replace(/\D/g, ""); // Remove non-digit characters

                const cursorPosition = e.target.selectionStart; // Store cursor position

                if (val === "") {
                  settakeamount(val);
                  return;
                }

                settakeamount(parseInt(val, 10).toLocaleString("en-US"));
                e.target.setSelectionRange(cursorPosition, cursorPosition);
              }}
              onClick={() => {
                settakecurrencyerr("");
              }}
              onKeyPress={(e) => {
                let code = e.charCode;
                if (code < 48 || code > 57) e.preventDefault();
                if (e.target.value.length >= 9) e.preventDefault();
              }}
              maxLength={8}
              value={takeamount}
              aria-label="Amount"
              placeholder={
                takecurrency != null
                  ? (takecurrency.toLowerCase().includes("gold") ? "Grams" : "Amount")
                  : "Amount"
              }              />
          </InputGroup>

          <span
            id="takelengtherr"
            style={{
              display: takelengtherr == null ? "none" : "block",
              fontSize: "15px",
              color: "#ff3f3f",
              fontStyle: "italic",
            }}
          >
            max 9,999,999
          </span>
        </Col>
      </Row>

      <Row id="takecheck" style={{ visibility: takelengtherr ? "visible" : "hidden" }}>
        {takelengtherr != null && (
          <p
            className="text-right"
            id="limiterr"
            style={{
              fontSize: "15px",
              color: "#ff3f3f",
              fontStyle: "italic",
            }}
          >
            {takelengtherr ? "Entered amount is low" : "Entered amount is high"}
          </p>
        )}
        <p className="text-right" style={{ margin: 0 }}>
          Go For:{" "}
          <span style={{ color: "red" }}>
            {output === "NaN" ? null : output}{" "}
          </span>
        </p>
        <p className="text-right" style={{ margin: 0 }}>
          Best Google Amount:{" "}
          <span style={{ color: "red" }}>
            {takeSuggestion === "NaN" ? null : takeSuggestion}{" "}
          </span>
        </p>
        <p
          className="text-right"
          style={{
            margin: 0,
            color: "red",
            fontStyle: "italic",
          }}
        >
          {formatoutput === "NaN"
            ? null
            : `1 ${givecurrency} =  ${formatoutput} ${takecurrency}`}
        </p>
        <p
          className="text-right"
          style={{
            margin: 0,
            color: "red",
            fontStyle: "italic",
          }}
        >
          {formatoutputGive === "NaN"
            ? null
            : `1 ${takecurrency} =  ${formatoutputGive} ${givecurrency}`}
        </p>

        <div
          id="amountsurety"
          style={{
            visibility: takelengtherr == null ? "hidden" : "visible",
          }}
        >
          <input
            onClick={handleAmountSurety}
            checked={amountSurety}
            type={"checkbox"}
            className=""
          />{" "}
          Are you sure of this amount
        </div>
        <label style={{ marginBottom: "10px", color: "red" }}>{amountSuretyerr}</label>
      </Row>

      <Row className="textcenter">
        <Col xs={12} sm={4} className="mb-3">
          <InputGroup>
            <Form.Select
              id="takecountry"
              style={error?.takeCountryErr ? styles.err : null}
              onChange={(e) => {
                setgiveselectedcountry(e.target.value);
                setgiveuseselectedcity("");
                setgiveuseState("");
              }}
              onClick={() => setError({ ...error, takeCountryErr: "" })}
              aria-label="Default select example"
              value={giveselectedcountry}
            >
              <option value="">Country</option>
              {Countries.map((item, key) => (
                <option value={item} key={key}>
                  {item}{" "}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
        <Col xs={12} sm={4} className="mb-3">
          <InputGroup>
            <Form.Select
              id="takestate"
              style={error?.takeStateErr ? styles.err : null}
              onChange={(e) => {
                setgiveuseselectedcity("");
                setgiveuseState(e.target.value);
              }}
              onClick={() => setError({ ...error, takeStateErr: "" })}
              value={usegiveselectedstate}
              aria-label="Default select example"
            >
              <option value="">State/Province</option>
              {takeStates.map((items, key) => (
                <option value={items} key={key}>
                  {items}{" "}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>

        <Col xs={12} sm={4} className="mb-3">
          <InputGroup>
            <Form.Select
              id="takecity"
              style={error?.takeCityErr ? styles.err : null}
              onChange={(e) => setgiveuseselectedcity(e.target.value)}
              onClick={() => setError({ ...error, takeCityErr: "" })}
              aria-label="Default select example"
              value={usegiveselectedcity}
            >
              <option value="">City</option>
              <option value="Any City" style={{ backgroundColor: "#a2e99d" }}>
                Any City
              </option>
              {takeCities.map((items, key) => (
                <option value={items} key={key}>
                  {items}{" "}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="mt-2">
          <input
            onClick={handletakeCashSource}
            checked={takeCash}
            type={"checkbox"}
            className=""
          />{" "}
          Cash
          <input
            onClick={handletakeBankSource}
            checked={takeBank}
            type={"checkbox"}
            className="chkbox ml-3"
          />{" "}
          Bank
        </div>
        <div className="mt-2">
          <input
            onClick={handletakeAssistance}
            checked={takeAssistance}
            type={"checkbox"}
            className=""
          />{" "}
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-disabled">At Take Location</Tooltip>}
            placement="top-start"
          >
            <span style={{ cursor: "default" }}>
              Money changer assistance is required.
            </span>
          </OverlayTrigger>
        </div>
      </div>
    </div>
  );
};

export default TakeCurrencyForm;
