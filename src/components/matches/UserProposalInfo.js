import React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import Offline from "../../asstes/offline.svg";
import Online from "../../asstes/online.svg";
import Stars from "../../asstes/rattingstar.svg";
const UserProposalInfo = ({ d, isOnline }) => {
  return (
    <div
    className='col'
      style={{
        paddingTop: "5px",
        display: "contents",
        marginRight: 10,
      }}
    >
      <div
        className={
          d.invited && !d.orderinFinalize ? "nameoutlin1" : "nameoutlin"
        }
        style={{
          width: "max-content",
          fontSize: "12px",
          fontStyle: "italic",
          color: "grey",
          textAlign: "left",
        }}
      >
        <img
          alt=""
          style={{
            width: "7px",
            position: "absolute",
            marginTop: "5px",
            marginLeft: "-8px",
          }}
          src={isOnline ? Online : Offline}
        />
        Proposal from <br />
        <OverlayTrigger
          overlay={
            <Tooltip
              className="notranslate"
              id="tooltip-disabled"
              bsPrefix="custom-tooltip"
              style={{ position: "absolute" }}
            >
              {d.userName}
            </Tooltip>
          }
          placement="top-start"
        >
          <strong className="notranslate">
            {d.userName.length > 10
              ? d.userName.substring(0, 9) + "..."
              : d.userName}
          </strong>
        </OverlayTrigger>
        <Row style={{ position: "relative" }}>
          <OverlayTrigger
            overlay={
              <Tooltip
                id="tooltip-disabled"
                bsPrefix="custom-tooltip"
                style={{
                  position: "absolute",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {d.reviewScore} reviews
              </Tooltip>
            }
            placement="top-start"
          >
            <Col
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <img
                  key={starIndex}
                  className={
                    d.reviewScore >= starIndex ? "rating-fill" : "rating-unfill"
                  }
                  src={Stars}
                  alt="Stars"
                />
              ))}
            </Col>
          </OverlayTrigger>
        </Row>
      </div>
    </div>
  );
};

export default UserProposalInfo;
