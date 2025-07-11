import React from 'react';
import { Container, Col } from 'react-bootstrap';

const FilterTabs = ({
  activelist,
  matchCount,
  finalizelist,
  holdlist,
  expiredlist,
  completedlist,
  setisIndex
}) => {
  // Common click handler to toggle filters
  const handleFilterClick = (filterName) => {
    setisIndex(false);

    // Reset all the filters' classes
    const filters = ['activebdr', 'matchbdr', 'finalizebdr', 'holdbdr', 'expiredbdr', 'completedbdr', 'allbdr'];
    filters.forEach((filter) => {
      document.getElementById(filter).className = 'bdrfiltr';
    });

    // Set the clicked filter to active
    document.getElementById(`${filterName}bdr`).className = 'bdrfiltrclick';

    // Show or hide the header and rate-date-time based on data
    const shouldShowHeader = 
      (filterName === 'active' && activelist.length > 0) || 
      (filterName === 'match' && matchCount > 0) ||
      (filterName === 'finalize' && finalizelist.length > 0) ||
      (filterName === 'hold' && holdlist.length > 0) ||
      (filterName === 'expired' && expiredlist.length > 0) ||
      (filterName === 'completed' && completedlist.length > 0);
    
    document.getElementById("heading").style.display = shouldShowHeader ? 'flex' : 'none';
    document.getElementById("rate-date-time").style.display = shouldShowHeader ? 'flex' : 'none';

    // Toggle visibility of sections based on selected filter
    const sections = ['active', 'matched', 'holdorder', 'expired', 'completed', 'finalize'];
    sections.forEach((section) => {
      document.getElementById(section).style.display = 'none'; // Hide all sections initially
    });

    if (filterName === 'active') {
      document.getElementById('active').style.display = 'block';
      document.getElementById('matched').style.display = 'block';
      document.getElementById('finalize').style.display = 'block';
    } else if (filterName === 'match') {
      document.getElementById('matched').style.display = 'block';
      document.getElementById('finalize').style.display = 'block';
    } else if (filterName === 'finalize') {
      document.getElementById('finalize').style.display = 'block';
    } else if (filterName === 'hold') {
      document.getElementById('holdorder').style.display = 'flex';
    } else if (filterName === 'expired') {
      document.getElementById('expired').style.display = 'flex';
    } else if (filterName === 'completed') {
      document.getElementById('completed').style.display = 'flex';
    } else if (filterName === 'all') {
      document.getElementById('active').style.display = 'block';
      document.getElementById('matched').style.display = 'block';
      document.getElementById('holdorder').style.display = 'block';
      document.getElementById('expired').style.display = 'block';
      document.getElementById('completed').style.display = 'block';
      document.getElementById('finalize').style.display = 'block';
    }
  };

  return (
    <Container className="position-sticky py-4" style={{ top: "77px", zIndex: "999", background: "white" }}>
      <div className="d-flex">
        <Col className="colsaprater mb-2">
          <div
            id="activebdr"
            className="bdrfiltr"
            onClick={() => handleFilterClick('active')}
          >
            <h6 style={{ fontSize: "13px" }}>
              Active ({activelist.length + finalizelist.length})
            </h6>
          </div>
        </Col>

        <Col className="mb-2">
          <div
            id="matchbdr"
            className="bdrfiltr"
            onClick={() => handleFilterClick('match')}
          >
            <h6 style={{ fontSize: "13px" }}>
              Matched ({matchCount})
            </h6>
          </div>
        </Col>

        <Col className="mb-2">
          <div
            id="finalizebdr"
            className="bdrfiltr"
            onClick={() => handleFilterClick('finalize')}
          >
            <h6 style={{ fontSize: "13px" }}>
              To Finalize ({finalizelist.length})
            </h6>
            <h6 style={{ fontSize: "9px" }}></h6>
          </div>
        </Col>

        <Col className="mb-2">
          <div
            id="holdbdr"
            className="bdrfiltr"
            onClick={() => handleFilterClick('hold')}
          >
            <h6 style={{ fontSize: "13px" }}>
              On-hold ({holdlist.length})
            </h6>
          </div>
        </Col>

        <Col className="mb-2">
          <div
            id="expiredbdr"
            className="bdrfiltr"
            onClick={() => handleFilterClick('expired')}
          >
            <h6 style={{ fontSize: "13px" }}>
              Expired ({expiredlist.length})
            </h6>
          </div>
        </Col>

        <Col className="colsaprater mb-2">
          <div
            id="completedbdr"
            className="bdrfiltr"
            onClick={() => handleFilterClick('completed')}
          >
            <h6 style={{ fontSize: "13px" }}>
              Completed ({completedlist.length})
            </h6>
          </div>
        </Col>

        <Col className="mb-2">
          <div
            id="allbdr"
            className="bdrfiltr"
            onClick={() => handleFilterClick('all')}
          >
            <h6 style={{ fontSize: "13px" }}>
              All (
              {activelist.length + finalizelist.length + holdlist.length + expiredlist.length + completedlist.length}
              )
            </h6>
          </div>
        </Col>
      </div>
    </Container>
  );
};

export default FilterTabs;
