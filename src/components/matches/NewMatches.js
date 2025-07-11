import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import APIURLS from "../../apiurls/index.js";
import "../../App.css";
import close from "../../asstes/close.svg";
import Info from "../../asstes/Iinfo.svg";
import { AppContext } from "../../Context.js";
import { apiHost } from "../../Helper.js";
import { apiInterceptor } from "../../service/ApiService.js";
import MatchedOrder from "../order/MatchedOrder.js";
import Switch from "../Switch.js";

function NewMatches(props) {
  const navigate = useNavigate();
  const [activelist, setActivelist] = useState([]);
  const [invitelist, setInvitelist] = useState([]);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [filteredList, setFilteredList] = useState([]);
  const [filteredInviteList, setFilteredInviteList] = useState([]);
  const [userName, setUserName] = useState(null);
  const [rates, setRates] = useState([]);
  const [value, setValue] = React.useState(false);
  const context = useContext(AppContext);

  const [isFav, setIsFav] = useState(false);
  const [favFilter, setFavFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  const toggleContent = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  const getRates = () => {
    let url = `${apiHost}/api/Rates/FetchRate`;
    apiInterceptor.get(APIURLS.RATES.GETRATES).then((response) => {
      setRates(response.data.rates);
    });
  };

  useEffect(() => {
    let tempList = [];
    tempList = activelist.filter((x) => {
      var includeItem = true;
      includeItem =
        (favFilter === null ||
          favFilter === "" ||
          x.userName.toLowerCase().includes(favFilter.toLowerCase())) &&
        !(x.isFavorite == false && isFav == true);
      return includeItem;
    });
    setFilteredList(tempList);

    let inviteElement = [];
    inviteElement = invitelist.filter((x) => {
      var includeItem = true;
      includeItem =
        (favFilter === null ||
          favFilter === "" ||
          x.userName.toLowerCase().includes(favFilter.toLowerCase())) &&
        !(x.isFavorite == true && isFav == true);
      return includeItem;
    });
    setFilteredInviteList(inviteElement);
  }, [isFav, activelist, favFilter]);

  useEffect(() => {
    
    localStorage.setItem("MyOrders", "False");
    uuidv4();
    getRates();
  }, []);

  const sortByFxRate = () => {
    let active = [...activelist];
    //console.log("active=>", active);
    active.forEach((d) => {
      let g = rates.filter((x) => x.name == d.giveCurrency)[0];
      let t = rates.filter((x) => x.name == d.takeCurrency)[0];
      let giveOrig = g["rates"] / t["rates"];
      let giveRate = d.giveAmount / d.takeAmount;
      d["fxRate"] = giveOrig - giveRate;
    });
    active.sort(function (a, b) {
      return a.fxRate - b.fxRate;
    });
    setFilteredList(active);
    //console.log(active);
  };

  const sortByDistance = () => {
    let active = [...activelist];
    active.sort(function (a, b) {
      return parseInt(a.takecitydistance) - parseInt(b.takecitydistance);
    });
    //console.log(active);
    setFilteredList(active);
  };

  useEffect(() => {
    getData();
  }, [
    props.ordersList,
    context.applicationStore.Invite,
    context.applicationStore.count,
  ]);

  useEffect(() => {
    let payload = context.applicationStore.FavOrder;
    if (payload) {
      let list = filteredList;
      list.map((d, i) => {
        if (d.orderId == payload.orderId) {
          d.isFavorite = payload.isFavorite;
        }
      });
      setFilteredList(list);
    }
  }, [context.applicationStore.FavOrder]);

  const getData = async () => {
    let datalist = props.ordersList;
    //console.log("newmatches=>", props.orderId, "=>", datalist);
    datalist = datalist.filter((i) => {
      return (
        i.selfDocId === props.orderId
        // i.takeCurrency === props.GiveCurrency &&
        // props.TakeCurrency === i.giveCurrency &&
      );
    });
    datalist.forEach((d, i) => {
      if (d["orderinFinalize"] > 0) {
        datalist[i]["isAccepted"] = true;
      }
      let itselftake = props.TakeAmount;
      let itselfgive = props.GiveAmount;
      let ordersgive = d.giveAmount;
      let orderstake = d.takeAmount;
      let difference = Math.abs(itselftake - ordersgive);
      let giveisSmall = itselftake < ordersgive;
      let takeisSmall = itselfgive < orderstake;
      let giveisEqual = itselftake == ordersgive;
      let takeisEqual = itselfgive == orderstake;
      datalist[i]["giveisSmall"] = giveisSmall;
      datalist[i]["takeisSmall"] = takeisSmall;
      datalist[i]["giveisEqual"] = giveisEqual;
      datalist[i]["takeisEqual"] = takeisEqual;
      datalist[i]["difference"] = difference;
      datalist[i]["givecitydistance"] = getDistance(
        JSON.parse(d.giveCityLatLon),
        JSON.parse(props.TakeCityCoordinates)
      );
      datalist[i]["takecitydistance"] = getDistance(
        JSON.parse(d.takeCityLatLon),
        JSON.parse(props.GiveCityCoordinates)
      );
    });
    //console.log("before sorting=>", datalist);
    datalist.sort(function (a, b) {
      return a.difference - b.difference;
    });
    datalist.sort(function (a, b) {
      return parseInt(a.takecitydistance) - parseInt(b.takecitydistance);
    });
    //console.log("after sorting=>", datalist);
    setActivelist(datalist);
  };

  const getDistance = (cityCoordinates, orderCityCoordinates) => {
    let lon1 = cityCoordinates["lon"];
    let lat1 = cityCoordinates["lat"];
    let lon2 = orderCityCoordinates["lon"];
    let lat2 = orderCityCoordinates["lat"];

    let R = 6371; // km

    let x1 = lat2 - lat1;
    let dLat = (x1 * Math.PI) / 180;
    let x2 = lon2 - lon1;
    let dLon = (x2 * Math.PI) / 180;
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let result = R * c;
    result = result.toFixed();
    return result;
  };

  const HTMLforNoMatches = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ fontWeight: 700 }}>...Fetching Matches</p>
      </div>
    );
  };

  useEffect(() => {
    setFilteredList(activelist);
  }, [activelist]);

  function filterByUserName(user) {
    setFavFilter(user);
  }

  const labels = {
    left: {
      title: "Sort By Distance",
      value: "left",
    },
    right: {
      title: "Sort By FX Rate",
      value: "right",
    },
    center: {
      title: "",
      value: "center",
    },
  };

  useEffect(() => {
    if (value) {
      sortByFxRate();
    } else {
      sortByDistance();
    }
  }, [value]);
  return (
    <>
    <div id="orderFX1">
        <Modal
          show={showModal}
          onHide={hideModal}
          className="no-padding-modal infoModal custom-modal-position"
        >
          <Modal.Header style={{ backgroundColor: "#2995be", color: "white" }}>
            <Modal.Title style={{ lineHeight: "0" }}>
              Countries, Currencies & Bundles
            </Modal.Title>
            <div
              className="close-icon d-flex justify-content-end"
              style={{ height: "17px", cursor: "pointer" }}
            >
              <img src={close} alt="Close" onClick={hideModal} />
            </div>
          </Modal.Header>

          <Modal.Body>
            <div
              style={{ fontSize: "13px", background: "white", color: "grey" }}
            >
              <p className="mb-1">
                1) Countries selection has to be exact on Give & Take to show up
                the deals.
              </p>
              <p className="mt-1 mb-1">
                2) Bundles are made with exact Countries and
                one-matching-Currency. Try to square-off deals.
              </p>
              <p className="mt-1 mb-1">
                3) Create an offer if you don't have one already in that CITY.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="centeritem">
        <Container
          className="position-fixed"
          style={{
            top: "115px",
            zIndex: "800",
            background: "white",
            width: "97.6%",
            padding: "10px 0px",
          }}
        >
          <Row
            className="centeritem mt-4"
            // className="position-fixed centeritem"
            // style={{
            //   top: "133px",
            //   zIndex: "900",
            //   background: "white",
            //   width: "100%",
            //   padding: "30px 0px",
            // }}
          >
            <Col
              className="searchFilterDiv"
              md={7}
              style={{ paddingLeft: "20px", paddingRight: "21px" }}
            >
              <div className="input-group searchMatches">
                {/* <Form.Label>Search here</Form.Label> */}
                <input
                  type="search"
                  className="form-control"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (e.target.value == "") {
                      filterByUserName("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                      filterByUserName(userName);
                      e.preventDefault();
                    }
                  }}
                  placeholder="Find a person"
                  aria-label="Find a person"
                  aria-describedby="basic-addon2"
                />
                <button
                  className="input-group-append btn-primary input-group-text"
                  id="basic-addon2"
                  onClick={() => {
                    filterByUserName(userName);
                  }}
                >
                  Search
                </button>
              </div>

              <div className="onlyFav d-flex justify-content-between w-100 position-relative">
                <div className="custom-control  custom-switch mt-2 w-50">
                  <input
                    type="checkbox"
                    className="custom-control-input cursor-pointer"
                    id={`favToggle${props.orderId}`}
                    checked={isFav}
                    onChange={(e) => {
                      //console.log("clicked");
                      setIsFav(e.target.checked);
                    }}
                  />
                  <label
                    className="custom-control-label cursor-pointer"
                    htmlFor={`favToggle${props.orderId}`}
                    style={{ marginLeft: "10px"}}
                  >
                    Only Favorites
                  </label>
                </div>

                <div
                  className="DistanceAndFXrate w-50"
                  style={{
                    display: "flex",
                    marginTop: "1px",
                    flex: "1 1 0",
                  }}
                >
                  <div
                    className="custom-control d-flex custom-switch mt-2 justify-content-center"
                    style={{ flex: "1 1 0" }}
                  >
                    <label
                      htmlFor={`distanceToggle${props.orderId}`}
                      className="mb-0 mr-5 cursor-pointer"
                    >
                      Distance
                    </label>
                    <input
                      type="checkbox"
                      className="custom-control-input cursor-pointer"
                      id={`distanceToggle${props.orderId}`}
                      checked={value}
                      onChange={(e) => {
                        //console.log("clicked");
                        setValue(!value);
                      }}
                    />
                    <label
                      className="custom-control-label cursor-pointer"
                      htmlFor={`distanceToggle${props.orderId}`}
                      style={{ whiteSpace: "nowrap"}}
                    >
                      FX Rate
                    </label>
                  </div>
                  {/* <Switch
                    onColor="#fff"
                    isOn={value}
                    handleToggle={() => setValue(!value)}
                  /> */}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="centeritem container">
            <Col md={7} id="heading" className="d-flex mt-3">
              <div className="d-flex" style={{ width: "100%" }}>
                <Col md={4} style={{ paddingLeft: "8px !important" }}>
                  <h4 className="relative">
                    <OverlayTrigger
                      overlay={<Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip"
                      style={{ position: "absolute" ,zIndex:999}}>You Buy</Tooltip>}
                      placement="top-start"
                    >
                      <span style={{ cursor: "default" }}>You Get</span>
                    </OverlayTrigger>
                  </h4>
                </Col>
                <Col md={4}></Col>
                <Col
                  md={4}
                  style={{
                    paddingLeft: "25px",
                    paddingRight: "0px",
                  }}
                >
                  <div style={{ padding: "0px" }}>
                    <h4 className="relative">
                      <OverlayTrigger
                        overlay={<Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip"
                        style={{ position: "absolute" ,zIndex:999}}>You Sell</Tooltip>}
                        placement="top-start"
                      >
                        <span style={{ cursor: "default",  whiteSpace:"nowrap" }}>You Give</span>
                      </OverlayTrigger>
                    </h4>
                  </div>
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

        {/* -------------------------------SeJUGAR BY FAUZ--------------------- */}
      <div className="centeritem" style={{ opacity: 0 }}>
        <Container
          // className="position-fixed"
          style={{
            top: "140px",
            zIndex: "800",
            background: "white",
            width: "97.6%",
            padding: "10px 0px",
          }}
        >
          <Row
            className="centeritem mt-4"
          >
            <Col
          md={1}
          style={{
            marginTop: "-25px",
            textAlign: "start",
            marginLeft: "-110px",
          }}
        >
          <a
            className="btn-option"
            style={{ textAlign: "center" }}
            onClick={toggleContent}
           >
            <img
              src={Info}
              className="info"
              alt="logo"
              style={{
                width: "30px",
                filter:
                  "invert(33%) sepia(89%) saturate(5319%) hue-rotate(187deg)",
              }}
            />
          </a>
        </Col>
            <Col
              className="searchFilterDiv"
              md={7}
              style={{ paddingLeft: "12px", paddingRight: "36px" }}
            >
              <div className="input-group searchMatches">
                {/* <Form.Label>Search here</Form.Label> */}
                <input
                  type="search"
                  className="form-control"
                  onChange={(e) => {
                    setUserName(e.target.value);
                    if (e.target.value == "") {
                      filterByUserName("");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                      filterByUserName(userName);
                      e.preventDefault();
                    }
                  }}
                  placeholder="Find a person"
                  aria-label="Find a person"
                  aria-describedby="basic-addon2"
                />
                <button
                  className="input-group-append btn-primary input-group-text"
                  id="basic-addon2"
                  onClick={() => {
                    filterByUserName(userName);
                  }}
                >
                  Search
                </button>
              </div>

              <div className="onlyFav d-flex justify-content-between w-100 position-relative">
                <div className="custom-control  custom-switch mt-2">
                  <input
                    type="checkbox"
                    className="custom-control-input cursor-pointer"
                    id={`favToggle${props.orderId}`}
                    checked={isFav}
                    onChange={(e) => {
                      //console.log("clicked");
                      setIsFav(e.target.checked);
                    }}
                  />
                  <label
                    className="custom-control-label cursor-pointer"
                    htmlFor={`favToggle${props.orderId}`}
                    style={{ marginLeft: "10px"}}
                  >
                    Only Favorites
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    marginTop: "4px",
                  }}
                >
                  <Switch
                    onColor="#fff"
                    isOn={value}
                    handleToggle={() => setValue(!value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
        {/* -------------------------------JUGAR BY FAUZ--------------------- */}

      <div className="d-flex flex-column ">
        {/* -------------------------------Search Box--------------------- */}
        <Container>
          <Row className="centeritem mt-4">
            <Col md={7}>
              {/* -------------------------------Recive Order--------------------- */}
              <div style={{}}>
                {filteredList.length > 0
                  ? filteredList.map((d, i) => (
                      <MatchedOrder
                        className="TopLevel visible"
                        key={`Order${i}`}
                        order={d}
                        TakeAmount={props.TakeAmount}
                        orderIndex={i}
                        OnlineUsers={props.OnlineUsers}
                        TakeCity={props.takeCity}
                        GiveCity={props.GiveCity}
                        SelfDocId={props.orderId}
                      />
                    ))
                  : null}
                {activelist.length == 0 && invitelist.length == 0 ? (
                  <HTMLforNoMatches />
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>

        <footer className="mt-auto">{/*<Footer />*/}</footer>
      </div>
    </>
  );
}
export default NewMatches;
