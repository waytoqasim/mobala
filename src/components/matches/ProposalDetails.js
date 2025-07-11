import React from 'react';
import { OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import Online from "../../asstes/online.svg";
import Offline from "../../asstes/offline.svg";
import Stars from "../../asstes/rattingstar.svg";

const ProposalDetails = ({ d, props }) => {
  return (
    <div
      style={{
        flex: 1,
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
          marginRight: props.basicInterface ? 0 : "auto",
        }}
      >
        {props.OnlineUsers[d.userid] ? (
          <img
            alt=""
            style={{
              width: "7px",
              position: "absolute",
              marginTop: "5px",
              marginLeft: "-8px",
            }}
            src={Online}
          />
        ) : (
          <img
            alt=""
            style={{
              width: "7px",
              position: "absolute",
              marginTop: "5px",
              marginLeft: "-8px",
            }}
            src={Offline}
          />
        )}
        Proposal from <br />
        <OverlayTrigger
          overlay={
            <Tooltip
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

export default ProposalDetails;
