import React from 'react';
import info from "../../asstes/info.svg"
import { Row, Tooltip, OverlayTrigger } from "react-bootstrap";
const OverlayIconGroup = ({ Arrow, AdditionalInfo }) => (
    <div style={{ padding: "0px" }}>
        <Row style={{ textAlign: "center" }}>
            <div style={{}}>
                <img
                    style={{ textAlign: "center" }}
                    src={Arrow}
                    className="arrow icon"
                    alt="logo"
                />
            </div>
        </Row>
        <Row style={{ position: "relative" }}>
            <div
                className={`${AdditionalInfo == "" || AdditionalInfo == null
                        ? "invisible"
                        : "visible"
                    }`}
                style={{
                    cursor: "pointer",
                    textAlign: "center",
                }}
            >
                <OverlayTrigger
                    overlay={
                        <Tooltip
                            id="tooltip-disabled"
                            bsPrefix="custom-tooltip"
                            style={{ position: "absolute" }}
                        >
                            Additional Info:{" "}
                            {AdditionalInfo != ""
                                ? AdditionalInfo
                                : "None"}
                        </Tooltip>
                    }
                    placement="top-start"
                >
                    <span className="d-inline-block">
                        <img
                            style={{ width: "80%" }}
                            src={info}
                            className="info"
                            alt="logo"
                        />
                    </span>
                </OverlayTrigger>
            </div>
        </Row>
    </div>
);

export default OverlayIconGroup;
