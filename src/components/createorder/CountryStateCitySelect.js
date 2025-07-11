const CountryStateCitySelect = ({
    Countries,
    takeStates,
    takeCities,
    error,
    setgiveselectedcountry,
    setgiveuseselectedcity,
    setgiveuseState,
    usegiveselectedstate,
    setError,
    settakeCountryId,
    settakestateId,
    settakeCityId,
    setgiveuseselectedcity,
  }) => (
    <>
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
                const tempListOfCountries = [...Countries];
                tempListOfCountries.forEach((item, index) => {
                  if (e.target.value === item) settakeCountryId(index);
                });
              }}
              onClick={() => setError({ ...error, takeCountryErr: "" })}
              value={giveselectedcountry}
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
              id="takestate"
              style={error?.takeStateErr ? styles.err : null}
              onChange={(e) => {
                setgiveuseselectedcity("");
                setgiveuseState(e.target.value);
                takeStates.forEach((state, index) => {
                  if (e.target.value === state) settakestateId(index);
                });
              }}
              onClick={() => setError({ ...error, takeStateErr: "" })}
              value={usegiveselectedstate}
            >
              <option value="">State/Province</option>
              {takeStates.map((state, key) => (
                <option value={state} key={key}>
                  {state}
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
              value={usegiveselectedcity}
            >
              <option value="">City</option>
              <option value="Any City" style={{ color: "black", backgroundColor: "#a2e99d" }}>
                Any City
              </option>
              {takeCities.map((item, key) => (
                <option value={item} key={key}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
  