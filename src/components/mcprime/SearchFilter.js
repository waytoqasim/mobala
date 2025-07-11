import React from 'react';
import { Col, Row } from "react-bootstrap";

const SearchFilter = ({ userName, setUserName, filterByUserName, handleOptionChange, selectedOption, isCountrySwitchOn, setIsCountrySwitchOn
  , isProfitSort, setIsProfitSort, isSwitchOn
 }) => (
  <Row className="centeritem mt-4">
    <Col md={7} className="searchFilterDiv">
      <div className="input-group">
        <input
          type="search"
          className="form-control"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (e.target.value === "") {
              filterByUserName("");
            }
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              filterByUserName(userName);
              e.preventDefault();
            }
          }}
          placeholder="Find a person"
          aria-label="Find a person"
          aria-describedby="basic-addon2"
        />
        <button
          className="input-group-append input-group-text btn-primary"
          id="basic-addon2"
          onClick={() => filterByUserName(userName)}
        >
          Search
        </button>
      </div>
    </Col>
    <Col md={7} className="d-flex searchFilterDiv">
      <div className="custom-control custom-radio mt-2 mr-3">
        <input
          type="radio"
          className="custom-control-input"
          id="radioAll"
          name="radioOptions"
          value="All"
          checked={selectedOption === "All"}
          onChange={handleOptionChange}
        />
        <label className="custom-control-label" htmlFor="radioAll">
          All
        </label>
      </div>

      <div className="custom-control custom-radio mt-2 mr-3">
        <input
          type="radio"
          className="custom-control-input"
          id="radioExcludeMCs"
          name="radioOptions"
          value="Exclude MCs"
          checked={selectedOption === "Exclude MCs"}
          onChange={handleOptionChange}
        />
        <label className="custom-control-label" htmlFor="radioExcludeMCs">
          Exclude MCs
        </label>
      </div>

      <div className="custom-control custom-radio mt-2">
        <input
          type="radio"
          className="custom-control-input"
          id="radioOnlyMCs"
          name="radioOptions"
          value="Only MCs"
          checked={selectedOption === "Only MCs"}
          onChange={handleOptionChange}
        />
        <label className="custom-control-label" htmlFor="radioOnlyMCs">
          Only MCs
        </label>
        <div className="d-flex flex-wrap justify-content-between align-items-start" style={{ rowGap: "20px", columnGap: "30px" }}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">1-Country</span>
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        style={{
                          backgroundImage: "url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'-4 -4 8 8\'%3e%3ccircle r=\'3\' fill=\'rgba(255, 255, 255, 1)\'/%3e%3c/svg%3e') !important",  // White circle
                          backgroundColor: isProfitSort ? "#0d6efd" : "#0d6efd",  
                          border: `2px solid ${isProfitSort ? '#0d6efd' : '#0d6efd'}`,  
                          transition: 'background-color 0.3s ease, border 0.3s ease',  
                        }}
                        id="countrySwitch"
                        checked={isCountrySwitchOn}
                        onChange={(e) => {
                          setIsCountrySwitchOn(e.target.checked);
                        }}
                      />
                      <label className="form-check-label" htmlFor="countrySwitch"></label>
                    </div>
                    <span className="ms-1">X-Countries</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="me-2">Distance</span>
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        style={{
                          backgroundImage: "url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'-4 -4 8 8\'%3e%3ccircle r=\'3\' fill=\'rgb(238, 20, 20)\'/%3e%3c/svg%3e')",
                          backgroundColor: isProfitSort ? "#0d6efd" : "#0d6efd",  
                          border: `2px solid ${isProfitSort ? '#0d6efd' : '#0d6efd'}`,  
                          transition: 'background-color 0.3s ease, border 0.3s ease',  
                        }}
                        id="distanceSwitch"
                        checked={isProfitSort}
                        onChange={(e) => {
                          setIsProfitSort(e.target.checked);
                        }}
                        disabled={isSwitchOn}
                      />
                      <label className="form-check-label" htmlFor="distanceSwitch"></label>
                    </div>
                    <span className="ms-1">Profit</span>
                  </div>
        </div>
      </div>
    </Col>
  </Row>
);

export default SearchFilter;
