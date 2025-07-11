import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";

const MoneyChangerTable = ({
  d,
  i,
  uid,
  Stars,
  addedtofav,
  addtofav,
  favs,
  clickFav,
  download,
  Getdocument,
  truncateText
}) => {
  debugger
  return (
    <tr className={`${uid === d?.id ? "highlighted-row" : ""}`}>
      <td>{i + 1}</td>
      <td style={{ position: "relative" }}>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-name" bsPrefix="custom-tooltip">{d?.userName}</Tooltip>}
          placement="top-start"
        >
          <span>{truncateText(d?.userName, 20)}</span>
        </OverlayTrigger>
        <Row style={{ position: "relative" }}>
          <OverlayTrigger
            overlay={<Tooltip id="tooltip-reviews" bsPrefix="custom-tooltip">{d.reviewScore} reviews</Tooltip>}
            placement="top-start"
          >
            <Col style={{ display: "flex", padding: "5px 5px 0px 11px" }}>
              {[...Array(5)].map((_, starIdx) => (
                <img
                  key={starIdx}
                  className={d.reviewScore >= starIdx + 1 ? "rating-fill" : "rating-unfill"}
                  src={Stars}
                  alt="Stars"
                />
              ))}
            </Col>
          </OverlayTrigger>
        </Row>
      </td>

      {/* Location Details */}
      <td style={{ position: "relative" }}>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-location" bsPrefix="custom-tooltip">{d?.location || `${d?.country}, ${d?.province}, ${d?.city}`}</Tooltip>}
          placement="top-start"
        >
          <span>{truncateText(d?.location || `${d?.country}, ${d?.province}, ${d?.city}`, 20)}</span>
        </OverlayTrigger>
      </td>

      <td>{d?.country}</td>
      <td>{d?.province}</td>
      <td>{d?.city}</td>

      {/* Phone Number */}
      <td style={{ whiteSpace: "nowrap" }}>
        {`${d?.mobileCode} ${d?.mobilenumber}`.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
      </td>

      {/* Private Order */}
      <td> %</td>
      <td>Direct call</td>

      {/* Serviced Countries */}
      <td style={{ position: "relative" }}>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-serviced-countries" bsPrefix="custom-tooltip">{d?.mcCountries === null ? d?.country : `${d?.country}, ${d?.mcCountries.split(",").map((country) => country.trim()).join(", ")}`}</Tooltip>}
          placement="top-start"
        >
          <span>{truncateText(d?.mcCountries == null ? d?.country : `${d?.country}, ${d?.mcCountries.split(",").map((country) => country.trim()).join(", ")}`, 20)}</span>
        </OverlayTrigger>
      </td>

      {/* Licenses */}
      <td style={{ whiteSpace: "wrap", position: "relative" }}>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-license" bsPrefix="custom-tooltip">{d?.mcLicense || "-"}</Tooltip>}
          placement="top-start"
        >
          <span>{truncateText(d?.mcLicense || "-", 10)}</span>
        </OverlayTrigger>
      </td>

      {/* Website */}
      <td>
        {d?.website ? (
          <ul style={{ paddingLeft: "0px" }}>
            <li>
              <a
                href={`${
                  d.website.startsWith("http") ? d.website : `https://${d.website}`
                }`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "black" }}
              >
                {d.website}
              </a>
            </li>
          </ul>
        ) : (
          "-"
        )}
      </td>

      {/* Settlement Services */}
      <td style={{ position: "relative" }}>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-settlement" bsPrefix="custom-tooltip">{d?.settlement ? (d?.fees === 0 ? "free" : d?.fees.replace(",", " ")) : "Not Available"}</Tooltip>}
          placement="top-start"
        >
          <span>{truncateText(d?.settlement ? (d?.fees === 0 ? "free" : d?.fees.replace(",", " ")) : "Not Available", 20)}</span>
        </OverlayTrigger>
      </td>

      {/* Favorite Toggle */}
      <td>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={favs[d.id] !== undefined ? addedtofav : addtofav}
            className="favicon"
            style={{ cursor: "pointer" }}
            id={"Tab-" + d.id}
            alt="favorite"
            onClick={() => clickFav(favs[d.id] !== undefined, d.id)}
          />
        </div>
      </td>

      {/* Document Download */}
      <td>
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
          {d.documentAvailable && (
            <OverlayTrigger
              placement="top-end"
              overlay={<Tooltip id="tooltip-docs" style={{ position: "absolute" }} bsPrefix="custom-tooltip">Download documents</Tooltip>}
            >
              <img
                src={download}
                className="favicon"
                style={{ cursor: "pointer" }}
                alt="download"
                onClick={() => Getdocument(d)}
              />
            </OverlayTrigger>
          )}
        </div> 
      </td>
      <td>{d?.notes != null || d?.notes!= undefined? d.notes:'No notes available'}</td>
    </tr>
  );
};

export default MoneyChangerTable;
