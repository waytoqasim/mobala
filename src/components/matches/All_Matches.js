import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Container,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import APIURLS from "../../apiurls";
import "../../App.css";
import close from "../../asstes/close.svg";
import Info from "../../asstes/Iinfo.svg";
import { AppContext } from "../../Context";
import { apiHost } from "../../Helper";
import { apiInterceptor } from "../../service/ApiService";
import MatchedOrder from "../order/MatchedOrder";

const AllMatches = (props) => {
  const context = useContext(AppContext);
  const [activelist, setActivelist] = useState([]);
  const [invitelist, setInvitelist] = useState([]);
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [userName, setUserName] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [filteredInviteList, setFilteredInviteList] = useState([]);
  const [rates, setRates] = useState([]);
  // const [query, setQuery] = useState('');
  // const handleInputChange = (event) => {
  //   setQuery(event.target.value);
  // };
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
      return a.fxRate > b.fxRate;
    });
    setFilteredList(active);
    //console.log(active);
  };

  const sortByDistance = () => {
    let active = [...activelist];
    active.sort(function (a, b) {
      return a.givecitydistance > b.givecitydistance;
    });
    //console.log(active);
    setFilteredList(active);
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
        !(x.isFavorite == false && isFav == true);
      return includeItem;
    });
    setFilteredInviteList(inviteElement);
  }, [isFav, activelist, favFilter, invitelist]);

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

  useEffect(() => {
    setFilteredInviteList(invitelist);
  }, [invitelist]);

  useEffect(() => {
    localStorage.setItem("MyOrders", "False");
    getData();
  }, [props.MatchList]);

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

  // const getData = () => {
  //   // let orderList = [];
  //   // let invitelist = [];
  //   console.log("Coordinates : ", sessionStorage.getItem("UserCoordinates"));
  //   props.MatchList.forEach((orderData) => {
  //     let userCoordinates = sessionStorage.getItem("UserCoordinates");
  //     let date = new Date(orderData.untilGoodDate.split("T")[0]);
  //     date = date.toDateString().split(" ");
  //     date = date[1] + " " + date[2] + ", " + date[3];
  //     orderData["untilGoodDate"] = date;
  //     orderData["givecitydistance"] = getDistance(
  //       JSON.parse(orderData.giveCityLatLon),
  //       JSON.parse(userCoordinates)
  //     );
  //     orderData["takecitydistance"] = getDistance(
  //       JSON.parse(orderData.takeCityLatLon),
  //       JSON.parse(userCoordinates)
  //     );
  //     // if (orderData.invited != 1) {
  //     //   orderList.push({ ...orderData });
  //     // } else {
  //     //   invitelist.push({ ...orderData });
  //     // }
  //   });
  //   // setActivelist(orderList);
  //   // setInvitelist(invitelist);
  //   setActivelist(props.MatchList);
  // };

  const getData = () => {
    let userCoordinates = JSON.parse(sessionStorage.getItem("UserCoordinates"));
    
    // Remove duplicates using Set
    let uniqueOrders = [];
    let seenIds = new Set();

    props.MatchList.forEach((orderData) => {
      let date = new Date(orderData.untilGoodDate.split("T")[0]);
      date = date.toDateString().split(" ");
      date = `${date[1]} ${date[2]}, ${date[3]}`;

      let updatedOrder = {
        ...orderData,
        untilGoodDate: date,
        givecitydistance: getDistance(JSON.parse(orderData.giveCityLatLon), userCoordinates),
        takecitydistance: getDistance(JSON.parse(orderData.takeCityLatLon), userCoordinates)
      };

      if (!seenIds.has(orderData.id)) {
        seenIds.add(orderData.id);
        uniqueOrders.push(updatedOrder);
      }
    });

    setActivelist(uniqueOrders);
};


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

  const onChange = (value) => {
    // //console.log("value=>", value);
    if (value === "right") {
      sortByFxRate();
    } else if (value === "left") {
      sortByDistance();
    }
  };

  return (
    <div className="d-flex flex-column matchmax">
      {/* <div className="centeritem">
        <Container className="position-fixed"            style={{
              position: "fixed",
              top: "133px",
              zIndex: 900,
              background: "white",
              width: "100%",
              padding: "30px 0px",
            }}>

        </Container>
      </div> */}
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
            width: "95%",
            padding: "10px 0px",
          }}
        >
          <Row className=" pt-4">
            <Col
             md={1}
                          //  style={{
                          //    marginTop: "-25px",
                          //    textAlign: "start",
                          //    marginLeft: "-110px",
                          //  }}
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
                         <div className="col-md-11">
                         <Col
              className="searchFilterDiv "
              // md={7}
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
                  className="input-group-append input-group-text btn-primary"
                  id="basic-addon2"
                  onClick={() => {
                    filterByUserName(userName);
                  }}
                >
                  Search
                </button>
              </div>

              <div className="onlyFav d-flex justify-content-between w-100 position-relative ">
                <div className="custom-control custom-switch mt-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitches"
                    checked={isFav}
                    onChange={(e) => {
                      setIsFav(e.target.checked);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitches"
                    style={{ marginLeft: "10px"}}
                  >
                    Only Favorites
                  </label>
                </div>
              </div>
            </Col>
            </div>
          </Row>
          
<Row
                    className="position-sticky centeritem"
                    style={{ top: "144px",marginTop:"15px"}}
                    // style={{ zIndex: "999", background: "white" }}
                  >
                    <Col md={7} id="heading" className="d-flex mt-3">
                      <div className="d-flex" style={{ width: "98%" }}>
                        <Col md={4}>
                          <Col>
                          <h4 className="relative">
                      <OverlayTrigger
                        overlay={<Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip"
                        style={{ position: "absolute" ,zIndex:999}}>Sell</Tooltip>}
                        placement="top-start"
                      >
                        <h4 style={{ cursor: "default",  whiteSpace:"nowrap" }}>You Get</h4>
                      </OverlayTrigger>
                    </h4>
                          </Col>
                        </Col>
                        <Col md={4}></Col>
                        <Col md={4} style={{ paddingLeft: "0px" }}>
                          <div style={{ padding: "0px" }}>
                            <h4 className="relative">
                              <OverlayTrigger
                                overlay={
                                  <Tooltip id="tooltip-disabled"  bsPrefix="custom-tooltip"
                                  style={{ position: "absolute" ,zIndex:999 }}>Buy</Tooltip>
                                }
                                placement="top-start"
                              >
                                <h4 style={{ cursor: "default",whiteSpace:"nowrap"}}>
                                  You Give
                                </h4>
                              </OverlayTrigger>
                            </h4>
                          </div>
                        </Col>
                      </div>
                    </Col>
                  </Row>
        </Container>
      </div>

      {/* JUGAAR */}
      <div className="centeritem" style={{ opacity: 0 }}>
        <Container
          style={{
            top: "140px",
            zIndex: "800",
            background: "white",
            width: "97.6%",
            padding: "10px 0px",
          }}
        >
          <Row className="centeritem pt-4">
            <Col
              className="searchFilterDiv"
              md={7}
              style={{ paddingLeft: "12px", paddingRight: "36px" }}
            >
              <div className="input-group searchMatches">
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
                  className="input-group-append input-group-text btn-primary"
                  id="basic-addon2"
                  onClick={() => {
                    filterByUserName(userName);
                  }}
                >
                  Search
                </button>
              </div>

              <div className="onlyFav d-flex justify-content-between w-100 position-relative ">
                <div className="custom-control custom-switch mt-2">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitches"
                    checked={isFav}
                    onChange={(e) => {
                      setIsFav(e.target.checked);
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitches"
                    style={{ marginLeft: "10px"}}
                  >
                    Only Favorites
                  </label>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* JUGAAR */}


      <Container className="">
        <Row className="centeritem mt-4">
          <Col md={7} className="mt-4">
            {/* -------------------------------Recive Order--------------------- */}
            <div className="ContainerSmooth">
              <div className="mt-4 mt-md-0 mt-lg-0">
                {filteredList.length > 0
                  ? filteredList.map((d, i) => (
                    <MatchedOrder
                      className="TopLevel visible"
                      key={`Order${i}`}
                      order={d}
                      TakeAmount={0}
                      orderIndex={i}
                      basicInterface={true}
                      OnlineUsers={context.applicationStore.OnlineUsers}
                      TakeCity={sessionStorage.getItem("City")}
                      GiveCity={sessionStorage.getItem("City")}
                      SelfDocId={""}
                    />
                  ))
                  : null}
              </div>
            </div>
            {activelist.length == 0 && invitelist.length == 0 ? (
              <HTMLforNoMatches />
            ) : null}
            {/* -------------------------------invite recived--------------------- */}
            {/* {filteredInviteList.map((d, i) =>
              d.giveCurrency !== props.TakeCurrency &&
                d.takeCurrency !== props.GiveCurrency ? null : (
                <MatchedOrder
                  className="TopLevel visible"
                  key={`Order${i}`}
                  order={d}
                  TakeAmount={0}
                  orderIndex={i}
                  basicInterface={true}
                  OnlineUsers={context.applicationStore.OnlineUsers}
                  TakeCity={sessionStorage.getItem("City")}
                  GiveCity={sessionStorage.getItem("City")}
                  SelfDocId={""}
                />
              )
            )} */}
          </Col>
        </Row>
      </Container>

      <footer className="mt-auto">{/*<Footer />*/}</footer>
    </div>
  );
};

export default AllMatches;
