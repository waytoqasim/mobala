import React from "react";
import { Button, Col, Form, OverlayTrigger, Row, Tooltip, } from "react-bootstrap";
import Model from "./Model";

const OrderForm =({props,setisQuickOrder,hideModal,confirmModal,showModal,givecurrencyerr})=>{
    return(
      <Row className="centeritem">
      <Col md={props.is1FX || props.isHomeFX ? 10 : 6} className="formbg">
        <Form className="forminput radius createOrder">
          <h1
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              marginBottom: "16px",
              textAlign: "center",
              marginTop:"-15px"
            }}
          >
            Create your order to get Matching offers on Mobala and
            Finalize them after negotiation
          </h1>
          {!props.is1FX ? (
            <Row
              className="mb-2"
              style={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <OverlayTrigger
                overlay={
                  <Tooltip
                    id="tooltip-disabled"
                    bsPrefix="custom-tooltip"
                    style={{ position: "absolute" }}
                  >
                    At your registered location
                  </Tooltip>
                }
                placement="top-start" // Set the placement to top-start
              >
                <h6 className="quickHeading fw8">Quick Order: </h6>
              </OverlayTrigger>
              <input
                onClick={() => setisQuickOrder(!isQuickOrder)}
                checked={isQuickOrder}
                type={"checkbox"}
                className="chkbox "
              />
            </Row>
          ) : null}
          <Model
            hideModal={hideModal}
            confirmModal={confirmModal}
            showModal={showModal}                
          />

          {/* <--------------------------------I Want to Give :--------------------> */}

          <h6 className="fw8 mb-3 relative">
            <OverlayTrigger
              overlay={
                <Tooltip
                  id="tooltip-disabled"
                  bsPrefix="custom-tooltip"
                  style={{ position: "absolute", marginLeft: "5px" }}
                >
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
                    style={givecurrencyerr != "" ? styles.err : null}
                    onChange={(e) => {
                      setgivecurrency(e.target.value);
                    }}
                    onClick={(e) => {
                      setgivecurrencyerror("");
                    }}
                    value={givecurrency}
                    disabled={iseditORder || mcOrderId}
                    aria-label="Default select example"
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

              <Col className="mb-3" style={{ textAlign: "end" }}>
               
                <InputGroup className="">
                  <input
                    className="giveamount form-control"
                    style={
                      giveamounterr !== ""
                        ? styles.err
                        : { textAlign: "right" }
                    }
                    thousandseparator="true"
                    id="giveAmountInput"
                    autoComplete="off"
                    onFocus={getGiveSuggestions}
                    onInput={(e) => {
                      let val = e.target.value;

                      // Remove non-digit characters using regex and allow only digits
                      val = val.replace(/\D/g, "");

                      const cursorPosition = e.target.selectionStart; // Store cursor position

                      // If the value is empty, set giveamount to empty
                      if (val === "") {
                        setgiveamount(val);
                        return;
                      }

                      // Format the number with thousand separators
                      setgiveamount(
                        parseInt(val, 10).toLocaleString("en-US")
                      );

                      // Maintain the cursor position after formatting
                      e.target.setSelectionRange(
                        cursorPosition,
                        cursorPosition
                      );
                    }}
                    onClick={() => {
                      setgiveamounterr("");
                    }}
                    onKeyPress={(e) => {
                      let code = e.charCode;

                      // Prevent any non-digit input
                      if (code < 48 || code > 57) {
                        e.preventDefault();
                      }

                      // Prevent more than 9 digits from being entered
                      if (e.target.value.length >= 9) {
                        e.preventDefault();
                      }
                    }}
                    maxLength={8}
                    value={giveamount}
                    aria-label="Amount"
                    placeholder="Amount"
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row
              style={
                showGiveSuggestion
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
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
                  {giveLengtherr
                    ? "Entered amount is low"
                    : "Entered amount is high"}
                </p>
              )}
              <p
                className="text-right"
                style={{
                  margin: 0,
                }}
              >
                Go For:{" "}
                <span style={{ color: "red" }}>
                  {outputGive == "NaN" ? null : outputGive}{" "}
                </span>
              </p>
              <p
                className="text-right"
                style={{
                  margin: 0,
                }}
              >
                {" "}
                Best Google Amount:{" "}
                <span style={{ color: "red" }}>
                  {giveSuggestion === "NaN" ? null : giveSuggestion}{" "}
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
                {formatoutputGive === "NaN"
                  ? null
                  : `1 ${takecurrency} =  ${formatoutputGive} ${givecurrency}`}
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
              <div
                id="amountsuretygive"
                style={
                  giveLengtherr == null
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
              >
                <input
                  onClick={handleAmountSuretyGive}
                  checked={amountSuretyGive}
                  type={"checkbox"}
                  className=""
                />{" "}
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
                    style={
                      error?.giveCountryErr != "" ? styles.err : null
                    }
                    onChange={(e) => {
                      setselectedcountry(e.target.value);
                      setuseselectedcity("");
                      setuseState("");
                      let tempListOfCountries = [...Countries];
                      //console.log(tempListOfCountries);
                      for (
                        let index = 0;
                        index < tempListOfCountries.length;
                        index
                      ) {
                        if (
                          e.target.value == tempListOfCountries[index]
                        ) {
                          setgiveCountryId(index);
                        }
                      }
                    }}
                    onClick={(e) => {
                      setError({ ...error, giveCountryErr: "" });
                    }}
                    aria-label="Default select example"
                    value={selectedcountry}
                  >
                    <option value="">Country</option>
                    {Countries.map((item, key) => (
                      <option value={item} key={key}>
                        {item}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                {/* <p className="text-danger mb-3">
                  {error?.giveCountryErr}
                </p> */}
              </Col>
              <Col xs={12} sm={4} className="mb-3">
                <InputGroup>
                  <Form.Select
                    id="givestate"
                    style={error?.giveStateErr != "" ? styles.err : null}
                    onChange={(e) => {
                      setuseselectedcity("");
                      setuseState(
                        useselectedstate === useselectedstate
                          ? e.target.value
                          : useselectedstate
                      );
                      for (
                        let index = 0;
                        index < stateArray.length;
                        index
                      ) {
                        if (e.target.value == stateArray[index]) {
                          setgivestateId(index);
                        }
                      }
                    }}
                    onClick={(e) => {
                      setError({ ...error, giveStateErr: "" });
                    }}
                    aria-label="Default select example"
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
                {/* <p className="text-danger mb-3">{error?.giveStateErr}</p> */}
              </Col>
              <Col xs={12} sm={4} className="mb-3">
                <InputGroup>
                  <Form.Select
                    id="givecity"
                    style={error?.giveCityErr != "" ? styles.err : null}
                    onChange={(e) =>
                      setuseselectedcity(
                        useselectedcity === useselectedcity
                          ? e.target.value
                          : useselectedcity
                      )
                    }
                    onClick={(e) => {
                      setError({ ...error, giveCityErr: "" });
                    }}
                    aria-label="Default select example"
                    value={useselectedcity}
                  >
                    <option value="">City</option>
                    <option
                      style={{
                        color: "black",
                        backgroundColor: "#a2e99d",
                      }}
                      value="Any City"
                    >
                      Any City
                    </option>
                    {giveCities.map((items, key) => (
                      <option value={items} key={key}>
                        {items}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                {/* <p className="text-danger mb-3">{error?.giveCityErr}</p> */}
              </Col>
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap:"wrap"
              }}
            >
              <div className="mt-2">
                <input
                  onClick={handleCashSource}
                  checked={Cash}
                  type={"checkbox"}
                  className=""
                />{" "}
                Cash
                <input
                  onClick={handleBankSource}
                  checked={Bank}
                  type={"checkbox"}
                  className="chkbox ml-3"
                />{" "}
                Bank
              </div>
              <div className="mt-2">
                <input
                  onClick={handlegiveAssistance}
                  checked={giveAssistance}
                  type={"checkbox"}
                  className=""
                />{" "}
                <OverlayTrigger
                  overlay={
                    <Tooltip
                      id="tooltip-disabled"
                      bsPrefix="custom-tooltip"
                      style={{ position: "absolute" }}
                    >
                      At Give Location
                    </Tooltip>
                  }
                  placement="top-start"
                >
                  <span style={{ cursor: "default" }}>
                    Money changer assistance is required.
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          {/* <--------------------------------I Want to Take :--------------------> */}
          <h6 className="fw8 mt-3 mb-3 relative">
            <OverlayTrigger
              overlay={
                <Tooltip
                  id="tooltip-disabled"
                  bsPrefix="custom-tooltip"
                  style={{ position: "absolute", marginLeft: "5px" }}
                >
                  Buy/Send
                </Tooltip>
              }
              placement="right"
            >
              <span style={{ cursor: "default" }}>I Want to Take</span>
            </OverlayTrigger>
          </h6>

          <div className="border p-3 mt-3">
            <Row>
              <Col></Col>
            </Row>

            <Row className="textcenter">
              <Col>
                <InputGroup className="mb-3">
                  <Form.Select
                    style={takecurrencyerr != "" ? styles.err : null}
                    onChange={(e) => {
                      settakecurrency(e.target.value);
                      ////console.log(`Give Currency is ${e.target.value}`);
                    }}
                    value={takecurrency}
                    aria-label="Default select example"
                    disabled={iseditORder || mcOrderId}
                    onClick={(e) => {
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
                    style={
                      takeamounterr !== ""
                        ? styles.err
                        : { textAlign: "right" }
                    }
                    autoComplete="off"
                    onFocus={getTakeSuggestions}
                    thousandseparator="true"
                    onInput={(e) => {
                      let val = e.target.value;

                      // Remove non-digit characters using regex and allow only digits
                      val = val.replace(/\D/g, "");

                      const cursorPosition = e.target.selectionStart; // Store cursor position

                      if (val === "") {
                        settakeamount(val);
                        return;
                      }

                      // Format the number with thousand separators
                      settakeamount(
                        parseInt(val, 10).toLocaleString("en-US")
                      );

                      // Maintain the cursor position after formatting
                      e.target.setSelectionRange(
                        cursorPosition,
                        cursorPosition
                      );
                    }}
                    onClick={() => {
                      settakeamounterr("");
                    }}
                    onKeyPress={(e) => {
                      let code = e.charCode;

                      // Prevent any non-digit input
                      if (code < 48 || code > 57) {
                        e.preventDefault();
                      }

                      // Prevent more than 9 digits from being entered
                      if (e.target.value.length >= 9) {
                        e.preventDefault();
                      }
                    }}
                    maxLength={8}
                    value={takeamount}
                    aria-label="Amount"
                    placeholder="Amount"
                  />
                </InputGroup>

                <span
                  id="takelengtherr"
                  style={{
                    display: "none",
                    fontSize: "15px",
                    color: "#ff3f3f",
                    fontStyle: "italic",
                  }}
                >
                  max 9,999,999
                </span>
                {/* <label style={{ marginBottom: "10px", color: "red" }}>
                  {takeamounterr}
                </label> */}
              </Col>
            </Row>
            <Row
              id="takecheck"
              style={
                showTakeSuggestion
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              {takelengtherr == null ? null : (
                <p
                  className="text-right"
                  id="limiterr"
                  style={{
                    fontSize: "15px",
                    color: "#ff3f3f",
                    fontStyle: "italic",
                  }}
                >
                  {takelengtherr
                    ? "Entered amount is low"
                    : "Entered amount is high"}
                </p>
              )}
              <p
                style={{
                  margin: 0,
                }}
                className="text-right"
              >
                Go For:{" "}
                <span style={{ color: "red" }}>
                  {output === "NaN" ? null : output}{" "}
                </span>
              </p>
              <p
                style={{
                  margin: 0,
                }}
                className="text-right"
              >
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
                style={
                  takelengtherr == null
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
              >
                <input
                  onClick={handleAmountSurety}
                  checked={amountSurety}
                  type={"checkbox"}
                  className=""
                />{" "}
                Are you sure of this amount
              </div>
              <label style={{ marginBottom: "10px", color: "red" }}>
                {amountSuretyerr}
              </label>
            </Row>

            <Row className="textcenter">
              <Col xs={12} sm={4} className="mb-3">
                <InputGroup>
                  <Form.Select
                    id="takecountry"
                    style={
                      error?.takeCountryErr != "" ? styles.err : null
                    }
                    onChange={(e) => {
                      setgiveselectedcountry(e.target.value);
                      setgiveuseselectedcity("");
                      setgiveuseState("");
                      let tempListOfCountries = [...Countries];
                      for (
                        let index = 0;
                        index < tempListOfCountries.length;
                        index
                      ) {
                        if (
                          e.target.value == tempListOfCountries[index]
                        ) {
                          settakeCountryId(index);
                        }
                      }
                    }}
                    onClick={(e) => {
                      setError({ ...error, takeCountryErr: "" });
                    }}
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
                {/* <p className="text-danger mb-3">
                  {error?.takeCountryErr}
                </p> */}
              </Col>
              <Col xs={12} sm={4} className="mb-3">
                <InputGroup>
                  <Form.Select
                    id="takestate"
                    style={error?.takeStateErr != "" ? styles.err : null}
                    onChange={(e) => {
                      setgiveuseselectedcity("");
                      setgiveuseState(
                        usegiveselectedstate === usegiveselectedstate
                          ? e.target.value
                          : usegiveselectedstate
                      );
                      for (
                        let index = 0;
                        index < stateArray.length;
                        index
                      ) {
                        if (e.target.value == stateArray[index]) {
                          settakestateId(index);
                        }
                      }
                    }}
                    onClick={(e) => {
                      setError({ ...error, takeStateErr: "" });
                    }}
                    value={usegiveselectedstate}
                    aria-label="Default select example"
                  >
                    <option value="">State/Province</option>
                    {/* <option
                      style={{
                        color: "black",
                        backgroundColor: "#a2e99d",
                      }}
                      value="Any Province"
                    >
                      Any Province
                    </option> */}
                    {takeStates.map((items, key) => (
                      <option value={items} key={key}>
                        {items}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                {/* <p className="text-danger mb-3">{error?.takeStateErr}</p> */}
              </Col>
              {/* <h2>{output}</h2> */}
              <Col xs={12} sm={4} className="mb-3">
                <InputGroup>
                  <Form.Select
                    id="takecity"
                    style={error?.takeCityErr != "" ? styles.err : null}
                    onChange={(e) =>
                      setgiveuseselectedcity(
                        usegiveselectedcity === usegiveselectedcity
                          ? e.target.value
                          : usegiveselectedcity
                      )
                    }
                    onClick={(e) => {
                      setError({ ...error, takeCityErr: "" });
                    }}
                    aria-label="Default select example"
                    value={usegiveselectedcity}
                  >
                    <option value="">City</option>{" "}
                    <option
                      style={{
                        color: "black",
                        backgroundColor: "#a2e99d",
                      }}
                      value="Any City"
                    >
                      Any City
                    </option>
                    {takeCities.map((items, key) => (
                      <option value={items} key={key}>
                        {items}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
                {/* <p className="text-danger mb-3">{error?.takeCityErr}</p> */}
              </Col>
            </Row>

            <Row>
              {/* <CurrencyConverter
                from={"USD"}
                to={"CAD"}
                value={29}
                className="form-control"
              /> */}
              <Col>
                <InputGroup
                  style={{ display: "none" }}
                  id="1rsrate"
                  className="mb-3"
                ></InputGroup>
              </Col>
              <Col></Col>
            </Row>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap:"wrap"
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
                  overlay={
                    <Tooltip
                      id="tooltip-disabled"
                      bsPrefix="custom-tooltip"
                      style={{ position: "absolute" }}
                    >
                      At Take Location
                    </Tooltip>
                  }
                  placement="top-start"
                >
                  <span style={{ cursor: "default" }}>
                    Money changer assistance is required.
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          {/* <--------------------------------Add Aditional Info--------------------> */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "2px" }}
          >
            <h6 className="fw8 mt-4">Additional Information </h6>
            <OverlayTrigger
              overlay={
                <Tooltip
                  id="tooltip-disabled"
                  bsPrefix="custom-tooltip"
                  style={{
                    position: "absolute",
                    maxWidth: "300px",
                    whiteSpace: "normal",
                    marginLeft: "5px",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    If you are an individual, avoid disclosing your exact
                    location or house (for security purpose).
                  </p>
                </Tooltip>
              }
              placement="right"
            >
              <img
                src={Iicons}
                style={{
                  width: "25px",
                  height: "25px",
                  marginTop: "12px",
                }}
              />
            </OverlayTrigger>
          </div>
          <div className="border p-3 mt-3">
            <Row>
              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    onChange={(e) => {
                      setAddAmount(e.target.value);
                      ////console.log(startDate);
                    }}
                    style={{}}
                    value={AddAmount}
                    aria-label="Like min. or max. amounts you want to  transact"
                    placeholder="For example: add  purpose, place, min. or max. amounts in million / billion etc."
                  />
                </InputGroup>
              </Col>
            </Row>

            <Row md={7}>
              <Col style={{ textAlign: "right" }}>
                <div
                  className="d-flex"
                    style={{
                      textAlign: "right",
                      justifyContent: "end",
                      marginRight: "0px",
                    }}
                  >
                  <p style={{ marginTop: "revert", marginRight: "2px" }}>
                          Expiry
                        </p>
                        <OverlayTrigger
                          overlay={
                            <Tooltip
                              id="tooltip-disabled"
                              bsPrefix="custom-tooltip"
                              style={{
                                position: "absolute",
                                maxWidth: "300px",
                                whiteSpace: "normal",
                                marginLeft: "5px",
                                zIndex: 9999,
                              }}
                            >
                              <p style={{ margin: 0 }}>
                                Edit & Update your orders every few days to get
                                noticed.
                              </p>
                            </Tooltip>
                          }
                          placement="right"
                        >
                          <img
                            src={Iicons}
                            style={{
                              width: "18px",
                              height: "18px",
                              marginTop: "16px",
                              marginRight: "-6px",
                            }}
                          />
                        </OverlayTrigger>
                  &nbsp;&nbsp;
                  <InputGroup style={{ width: "max-content" }}>
                    <DatePicker
                      disabled={datedisable}
                      className="untilgooddate"
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        let x = date.toLocaleDateString("en-us", {
                          month: "numeric",
                          day: "numeric",
                          year: "numeric",
                        });
                        x = x.replaceAll("/", "-");
                        setexpirytime(x);
                        SetUntilGoodDate(date.toISOString());
                      }}
                      minDate={new Date()}
                      maxDate={maxDate}
                      placeholderText="Select a date"
                      dateFormat="MM/dd/yyyy"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      style={{ width: "200px", fontSize: "14px" }}
                    />

                    <div className="datelabel">
                      <label
                        style={{
                          fontStyle: "italic",
                          fontSize: "12px",
                          color: "#00000080",
                          zIndex: 999,
                        }}
                      >
                        mm/dd/yyyy
                      </label>
                    </div>
                  </InputGroup>
                </div>
                <p
                  style={{
                    textAlign: "Right",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  All orders expire in 30 days unless specified.
                  <br />
                  Orders in Finalize (negotiation) don't expire.
                </p>
              </Col>
            </Row>
          </div>
          {props.is1FX ? (
            <>
              <Row className="mt-3">
                <Col className="mb-2">
                  <h6 className="fw8">Login Information</h6>
                </Col>
              </Row>
              <div className="border p-3">
                <Row>
                  <Row style={{ marginTop: 20 }}>
                    <Col>
                      <label>
                        *Preferred UserName / Display Name (can't be
                        changed later)
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
                              document.getElementById(
                                "takenlenerr"
                              ).style.display = "none";
                            }
                          }}
                          style={usernameerr != "" ? styles.err : null}
                          value={UserName}
                          onBlur={(e) => checkUserName(e.target.value)}
                          type="text"
                          onClick={(e) => {
                            setusernameerr(null);
                          }}
                        />
                      </Form.Group>
                      <h6
                        id="takenerr"
                        style={{ color: "red", display: "none" }}
                      >
                        This Username already taken.
                      </h6>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: "10px" }} className="mt-3">
                    <lable>Country</lable>
                  </Row>
                  <Row className="textcenter mb-3">
                    <Col sm={6}>
                      <select
                        className="form-select"
                        id="country"
                        style={countryerr != "" ? styles.err : null}
                        onChange={(e) => {
                          setSelectedLoginCountry(e.target.value);
                          // for (let index = 0; index < Countries.length; index) {
                          //   if (e.target.value == Countries[index]) {
                          //     setselectedcountryID(index);
                          //   }
                          // }
                        }}
                        onClick={(e) => {
                          setcountryerr("");
                        }}
                        aria-label="Default select example"
                        value={selectedlogincountry}
                      >
                        <option value="" key={0}>
                          Country
                        </option>
                        {Countries.map((value, key) => (
                          <option
                            value={value}
                            key={key}
                            hidden={key == 0}
                          >
                            {value}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col sm={6}></Col>
                  </Row>
                  <Row>
                    <lable>E-mail</lable>
                  </Row>
                  <Col sm={8}>
                    <Form.Group
                      className="mb-3"
                      controlId="E-mail"
                      autocomplete="off"
                    >
                      <Form.Control
                        id="email"
                        className={
                          border === true ? "inputgrennbdr" : null
                        }
                        // style={emailerr != "" ? styles.err : null}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        style={emailerr != "" ? styles.err : null}
                        // onKeyUp={Checkemail}
                        value={email}
                        name="user_email"
                        type="text"
                        autocomplete="off"
                        onClick={(e) => {
                          //let value = e.target.value;
                          setEmailerror("");
                          //document.getElementById("emailcheck").style.display = "none";
                        }}
                      />
                      <div className="tick-icon1">
                        <img
                          id="tick"
                          style={{ display: "none", width: "26px" }}
                          src={Tick}
                        />
                      </div>
                    </Form.Group>
                    <span
                      id="emailcheck"
                      style={{ display: "none", color: "red" }}
                    >
                      {" "}
                      Email is already registered
                    </span>
                    <span
                      id="sendcodemsg"
                      style={{ display: "none", color: "green" }}
                    >
                      {" "}
                      Verification Email sent successfuly
                    </span>
                    <Form.Group className="mb-3" controlId="E-mail">
                      <lable
                        style={
                          showform === true ? styles.show : styles.hide
                        }
                      >
                        Enter Verification Code
                      </lable>
                      <input
                        name="subject"
                        value={"Verification Code"}
                        hidden={true}
                      />
                      <Form.Control
                        id="verificationCode"
                        as={NumberFormat}
                        style={
                          showform === true ? styles.show : styles.hide
                        }
                        onChange={(e) => setcheckcode(e.target.value)}
                        value={checkcode}
                      />
                    </Form.Group>
                    <span
                      id="codeerr"
                      style={{ display: "none", color: "red" }}
                    >
                      {" "}
                      Your Verification Code is Incorrect
                    </span>
                    <span
                      id="codeerr1"
                      style={{ display: "none", color: "green" }}
                    >
                      {" "}
                      Your Verification Code is Correct
                    </span>
                    <h6 style={{ color: "red" }}>{emailerr}</h6>
                  </Col>
                  <Col
                    style={{
                      textAlign: "center",
                      marginBottom: "15px",
                      marginTop: "-5px",
                    }}
                    sm={4}
                  >
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Button
                        style={{ width: "fit-content" }}
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

                <Row className="mb-3">
                  <Col>
                    <Row>
                      <lable>Password</lable>
                    </Row>
                    <Row>
                      <InputGroup
                        id="passw"
                        className=""
                        autocomplete="off"
                      >
                        <Form.Control
                          id="password"
                          style={passworderr != "" ? styles.err : null}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          type={
                            type === "password" ? "password" : "input"
                          }
                          onClick={(e) => {
                            setPassworderror("");
                          }}
                          // onKeyUp={() => hideerr()}
                          // onBlur={() => showerr()}
                          className={
                            type === "input" ? "" : "confirmpass"
                          }
                          placeholder="Password"
                          aria-label="Password"
                          onCopy={(e) => {
                            // e.clipboardData.setData("")
                            e.preventDefault();
                            return false;
                          }}
                          aria-describedby="basic-addon2"
                          value={password}
                          autocomplete="off"
                        />
                        {type === "password" ? (
                          <div className="search-icon">
                            <i
                              onClick={changetype}
                              className="fa fa-eye-slash"
                            ></i>
                          </div>
                        ) : (
                          <div className="search-icon">
                            <i
                              onClick={changetypepass}
                              className="fa fa-eye"
                            ></i>
                          </div>
                        )}
                      </InputGroup>

                      <h6 style={{ color: "red" }}>{passworderr}</h6>
                    </Row>
                  </Col>{" "}
                  <span
                    id="passempty"
                    style={{ color: "red", display: "none" }}
                  >
                    * Password cannot be empty
                  </span>
                  <span
                    id="passlength"
                    style={{ color: "red", display: "none" }}
                  >
                    * Password must be more than 7 characters
                  </span>
                  <span
                    id="passspecial"
                    style={{ color: "red", display: "none" }}
                  >
                    * Atleast 1 special character recommended
                  </span>
                </Row>

                <Row>
                  <Col>
                    <Row>
                      <lable>Confirm Password</lable>
                    </Row>
                    <InputGroup className="mb-3" autocomplete="off">
                      <Form.Control
                        className={type1 === "input" ? "" : "confirmpass"}
                        id="confirmPassword"
                        name="new-password"
                        style={passcheck != "" ? styles.err : null}
                        onChange={(e) => {
                          // document.getElementById(
                          //   "passmatch"
                          // ).style.display = "none";
                          setConfirmPassword(e.target.value);
                        }}
                        type={type1 === "password" ? "password" : "input"}
                        onClick={(e) => {
                          setpasscheck("");
                        }}
                        placeholder="Password"
                        autoComplete="new-passord"
                        aria-label="confirm-password"
                        autoSave="new-password"
                        aria-describedby="basic-addon2"
                        value={confirmpassword}
                        autocomplete="off"
                      />

                      {type1 === "password" ? (
                        <div className="eye-icon">
                          <i
                            onClick={changetype1}
                            className="fa fa-eye-slash"
                          ></i>
                        </div>
                      ) : (
                        <div className="eye-icon">
                          <i
                            onClick={changetypepass1}
                            className="fa fa-eye"
                          ></i>
                        </div>
                      )}
                    </InputGroup>
                    <h6 style={{ color: "red" }}>{passcheck}</h6>
                    <span
                      id="passmatch"
                      style={{ color: "red", display: "none" }}
                    >
                      * Password Mismatch
                    </span>
                  </Col>
                  <div className="invalid-feedback"></div>
                </Row>
              </div>
            </>
          ) : null}

          {/* <--------------------------------Set Alerts--------------------> */}
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
                checked={isChecked} // Checkbox state is controlled
                onChange={() => setIsChecked(!isChecked)} // Toggle state on change
                style={{ cursor: "pointer" }}
              />
              <label htmlFor="setAlerts" style={{ marginBottom: 0 }}>
                Send State/Province level alerts for Matches to this order
              </label>
            </div>
            {isChecked && ( // Show text only if checkbox is checked
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "#555",
                }}
              >
                By sending this Order, you attest that this is a genuine
                requirement. Mobala will remove orders which are
                mischievous or ill-intended.
              </div>
            )}
          </div>

          <Row className="mt-3">
            {props.is1FX || props.isHomeFX ? null : (
              <Col>
                <Button
                  onClick={() => {
                    let temp = sessionStorage.getItem("previousPathName");
                    if (temp == "/OrderCom") {
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
                      textAlign: "center", // Center-align content horizontally
                    }}
                  >
                    <Button
                      onClick={() => {
                        PutonHold();
                      }}
                      variant="warning"
                      className="btnlogin1 "
                      style={{ marginTop: "15px" }}
                    >
                      {isLoadingHold ? (
                        <Spinner
                          animation="border"
                          role="status"
                          size="sm"
                        >
                          <span className="visually-hidden">
                            Loading...
                          </span>
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
                    textAlign: "center", // Center-align content horizontally
                  }}
                >
                  <Button
                    onClick={
                      props.is1FX ? ifFxSignup : () => Activate(uid)
                    }
                    variant="primary"
                    className={
                      props.is1FX || props.isHomeFX ? "" : "btnlogin1"
                    }
                    style={{ marginTop: "15px" }}
                    ref={activateBtn}
                    disabled={false}
                  >
                    {isLoading ? (
                      <Spinner animation="border" role="status" size="sm">
                        <span className="visually-hidden">
                          Loading...
                        </span>
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
                      textAlign: "center", // Center-align content horizontally
                      marginTop: "5px", // Add some spacing between lines
                    }}
                  >
                    {props.is1FX ? (
                      <p>
                        By pressing Submit, I acknowledge having read and
                        agreeing to
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
        </Form>
      </Col>
    </Row>
    )
}

export default OrderForm;