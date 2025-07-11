import React from 'react';
import { Col } from 'react-bootstrap';
const OrderSelector = ({ ordersDropdown, currentOrder, setCurrentOrder, id, inFinalize, UntilDate }) => (

    <Col md={7} style={{ display: "flex", paddingLeft: "0px" }}>
        <Col md={6} style={{ padding: "0", marginTop: "5px" }}>
            <div className="d-flex notranslate">
                {ordersDropdown.length > 0 ? (
                    <select
                        onChange={(e) => {
                            //console.log("dsadasdassdas", e.target.value);
                            setCurrentOrder(e.target.value);
                        }}
                        value={currentOrder}
                        className="date "
                        style={{
                            fontSize: "13px",
                            border: "none",
                            background: "inherit",
                        }}
                    >
                        {ordersDropdown.map((d, i) => (
                            <option
                                style={{ fontSize: "13px" }}
                                key={i}
                                value={d.orderId}
                                id={d.id}
                            >
                                {d.orderId}
                            </option>
                        ))}
                    </select>
                ) : (
                    <h6 className="date notranslate" style={{ fontSize: "13px" }}>
                        {id}
                    </h6>
                )}
            </div>
        </Col>
        <Col
            md={6}
            style={{ textAlign: "end", padding: "0", marginTop: "5px" }}
        >
            {inFinalize === false ? (
                <h6
                    className="date  f-weight"
                    style={{
                        display: "flex",
                        justifyContent: "end",
                        fontSize: "13px",
                    }}
                >
                    Exp&nbsp;{UntilDate}
                </h6>
            ) : null}
        </Col>
    </Col>
);

export default OrderSelector;
