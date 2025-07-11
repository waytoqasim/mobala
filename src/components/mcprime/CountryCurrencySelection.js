import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import cancel from "../../asstes/cancel.png";

const CountryCurrencySelection = ({
  mcCountries,
  setMcCountries,
  mcCurrencies,
  setMcCurrencies,
  selectedcountry,
  setSelectedcountry,
  currency,
  setcurrency,
  Countries,
  Currencies,
  error,
  setError,
  setOrdersLoading,
  getCurrencyCode,
  getMcOrders,
  AddMCCurrencies,
  AddMCCountry
}) => {
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    if (!mcCountries.some((country) => country.countries === selectedCountry)) {
      const updatedCountries = [...mcCountries, { countries: selectedCountry }];
      setMcCountries(updatedCountries);
      setOrdersLoading(true);
      AddMCCountry(updatedCountries)
        .then(() => {
          getMcOrders();
          setOrdersLoading(false);
        })
        .catch((error) => {
          console.error('Error: Data fetch failed', error);
        });
    }
    setSelectedcountry(selectedCountry);
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    if (!mcCurrencies.some((item) => item.currency === selectedCurrency)) {
      const updatedCurrencies = [...mcCurrencies, { currency: selectedCurrency }];
      setMcCurrencies(updatedCurrencies);
      setOrdersLoading(true);
      AddMCCurrencies(updatedCurrencies)
        .then(() => {
          getMcOrders();
          setOrdersLoading(false);
        })
        .catch((error) => {
          console.error('Error: Data fetch failed', error);
        });
    }
    setcurrency(selectedCurrency);
  };

  return (
    <Row className="centeritem">
      <Col md={9} className="accordianStyle">
        <Accordion defaultActiveKey="">
          {/* Country Selection Accordion */}
          <Accordion.Item eventKey="0" className="flex-1">
            <Accordion.Header>Show Country Selection</Accordion.Header>
            <Accordion.Body>
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <label className="mb-0">Select Country</label>
                    <select
                      id="country"
                      onChange={handleCountryChange}
                      className="ml-3 form-select"
                      style={{ width: '50%' }}
                      value={selectedcountry}
                    >
                      <option value="" key={0}>
                        Country
                      </option>
                      {Countries.map((value, key) => (
                        <option value={value} key={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {mcCountries.length > 0 && (
                  <ul className="d-flex mb-0 pl-1" style={{ flexWrap: 'wrap', marginLeft: '-5px' }}>
                    {mcCountries.map((country, index) => (
                      <li
                        key={country.id}
                        className={`${
                          sessionStorage.countrywhereGovernmentIdissued === country.countries && 'colour-green'
                        } d-flex align-items-center Selectmccou`}
                      >
                        {mcCountries.length > 1 &&
                          sessionStorage.countrywhereGovernmentIdissued !== country.countries && (
                            <img
                              src={cancel}
                              id={country.countries}
                              width="10px"
                              className="mr-2"
                              onClick={(e) => {
                                let arr = mcCountries.filter((x) => x.countries !== e.target.id);
                                setMcCountries(arr);
                                setOrdersLoading(true);
                                AddMCCountry(arr)
                                  .then(() => {
                                    getMcOrders();
                                    setOrdersLoading(false);
                                  })
                                  .catch((error) => {
                                    console.error('Error: Data fetch failed', error);
                                  });
                              }}
                            />
                          )}
                        {country.countries}
                      </li>
                    ))}
                  </ul>
                )}
                {error && <div className="text-danger">{error}</div>}
              </div>
            </Accordion.Body>
          </Accordion.Item>

          {/* Currency Selection Accordion */}
          <Accordion.Item eventKey="1" className="mb-2 flex-1">
            <Accordion.Header>Show Currency Selection</Accordion.Header>
            <Accordion.Body>
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <label className="mb-0">Select Currency</label>
                    <select
                      onChange={handleCurrencyChange}
                      className="ml-3 form-select"
                      style={{ width: '50%' }}
                      value={currency}
                    >
                      <option value="">Currency</option>
                      {Currencies.map((item, key) => (
                        <option value={item} key={key}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {mcCurrencies.length > 0 && (
                  <ul className="d-flex mb-0 pl-1" style={{ flexWrap: 'wrap', marginLeft: '-5px' }}>
                    {mcCurrencies.map((Currencies, index) => (
                      <li
                        key={Currencies.id}
                        className={`${
                          getCurrencyCode(sessionStorage.countrywhereGovernmentIdissued) === Currencies.currency.split(' ')[0] &&
                          'colour-green'
                        } d-flex align-items-center Selectmccou`}
                      >
                        {mcCurrencies.length > 1 &&
                          getCurrencyCode(sessionStorage.countrywhereGovernmentIdissued) !==
                            Currencies.currency.split(' ')[0] && (
                            <img
                              src={cancel}
                              width="10px"
                              className="mr-2"
                              id={Currencies.currency}
                              onClick={(e) => {
                                let arr = mcCurrencies.filter((x) => x.currency !== e.target.id);
                                setMcCurrencies(arr);
                                setOrdersLoading(true);
                                AddMCCurrencies(arr)
                                  .then(() => {
                                    getMcOrders();
                                    setOrdersLoading(false);
                                  })
                                  .catch((error) => {
                                    console.error('Error: Data fetch failed', error);
                                  });
                              }}
                            />
                          )}
                        {Currencies.currency}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
};

export default CountryCurrencySelection;
