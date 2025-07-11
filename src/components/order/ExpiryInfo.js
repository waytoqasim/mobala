import React from 'react';
import { Row, Col} from "react-bootstrap";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'; // Example icon

const ExpiryInfo = ({ inFinalize, UntilDate, showFireIcon, id }) => (
    <div >
    <Col md={6} style={{ padding: "0" }}>
      <h6 className="date  f-size notranslate">{id}</h6>
    </Col>
    <Col md={5} style={{ textAlign: "end", padding: "0" }}>
      {inFinalize === false ? (
        <h6
          className="date f-size f-weight"
          style={{ display: "flex", justifyContent: "end" }}
        >
          {showFireIcon ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <LocalFireDepartmentIcon
                style={{ color: "gray", marginRight: "5px" }}
              />
              Exp&nbsp;{UntilDate}
            </div>
          ) : (
            <>Exp&nbsp;{UntilDate}</>
          )}
        </h6>
      ) : null}
    </Col>
  </div>
);

export default ExpiryInfo;
