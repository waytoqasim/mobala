
import React from 'react';
import {
    Col,
    Row,
} from "react-bootstrap";

export const LowerDate = (props) => {
    return (<Row>
        <Col style={{ padding: "0" }}>
            <h6 className="date  f-size notranslate">{props.id}</h6>
        </Col>
        <Col style={{ textAlign: "end", padding: "0" }}>
            <h6 className="date  f-size " style={{ display: "flex", justifyContent: "end" }}>
                Exp&nbsp; <div style={{ fontSize: "12px", lineHeight: "17px" }}>
                {" "}
                {props.Date}
              </div>
            </h6>
        </Col>
    </Row>)
}