import {
  Button,
  Col,
  InputGroup,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import "../../App.css";
import Cencle from "../../asstes/CancelBlue.svg";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ShimmerBadge } from "react-shimmer-effects";
import "reactjs-popup/dist/index.css";
import APIURLS from "../../apiurls";
import close from "../../asstes/close.svg";
import info from "../../asstes/Iinfo.svg";
import { Currencies } from "../../components/Currencies";
import { Cities as cityData } from "../../components/newCountry";
import CountrySelection from "../../components/watchlist/CountrySelection";
import CurrencySelection from "../../components/watchlist/CurrencySelection";
import InformationSection from "../../components/watchlist/InformationSection";
import WatchlistTable from "../../components/watchlist/WatchListTable";
import dataTable from "../../data/WatchList/dataTable";
import { addDoc } from "../../Helper";
import { apiInterceptor } from "../../service/ApiService";

function Watchlist(props) {
  const navigate = useNavigate();
  const [uid, setuid] = useState(sessionStorage.getItem("UserID"));
  const [list, setlist] = useState("");
  const [givecountry, setgivecountry] = useState("");
  const [takecountry, settakecountry] = useState("");
  const [givecurrency, setgivecurrency] = useState("");
  const [Countries, setCountries] = useState([]);
  const [takecurrency, settakecurrency] = useState("");
  const [watchlist, setwatchlist] = useState([]);
  const [table, setTable] = useState(dataTable);
  const [currencyexchange, setcurrencyexchange] = useState([]);
  const [loading, setloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const toggleContent = () => setShowModal(true);

  const hideModal = () => setShowModal(false);

  useEffect(() => {
    setuid(window.location.search.split("=")[1]);
    localStorage.setItem("MyOrders", "False");
  }, []);
  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = () => {
    const countries = [...new Set(cityData.map((d) => d.country))].sort();
    setCountries(countries);
  };

  const getdata = async () => {
    setloading(true);
    apiInterceptor
      .get(APIURLS.WATCHLIST.GETDATA(uid))
      .then((response) => {
        setlist({ ...response.data });
        setloading(false);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (uid) {
      getdata();
    }
  }, [uid]);

  const Setdata = async () => {
    addDoc("addWatchList", {
      GiveCountry: givecountry,
      TakeCountry: takecountry,
      GiveCurrency: givecurrency,
      TakeCurrency: takecurrency,
      UserId: uid.substring(0, uid.length - 2),
    }).then((res) => {
      console.log(res.data);
      window.location.reload();
    });
  };

  useEffect(() => {}, [takecountry, table]);
  const Getwatchlist = async () => {
    apiInterceptor
      .get(APIURLS.WATCHLIST.GETWATCHLIST(uid))
      .then((response) => {
        const tasklist = [];
        response.data.map((doc) => {
          tasklist.push({ ...doc });
        });
        setwatchlist(tasklist);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    Getwatchlist();
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [uid]);
  
  const CurrencyConverter = async () => {
    const curencies = [];
    let newRows = [];  
  
    for (let d of watchlist) {
      try {
        const dd = await apiInterceptor.get(APIURLS.RATES.GETRATES);
        let giveCurrency = d.giveCurrencyInfo.split(" ")[0];
        let takeCurrency = d.takeCurrencyInfo.split(" ")[0];
  
        let g = dd.data.rates.filter((x) => x.name === giveCurrency)[0];
        let t = dd.data.rates.filter((x) => x.name === takeCurrency)[0];
  
        if (g && t) {
          let takecuramm = t["rates"] / g["rates"];
          let takeout = takecuramm * 1;
          takeout = takeout.toFixed(4);
          takecuramm = takecuramm.toFixed(4);
  
          const row = {
            " ": (
              <div style={{ textAlign: "center", position: "relative" }}>
                <OverlayTrigger
                  overlay={
                    <Tooltip
                      id="tooltip-disabled"
                      bsPrefix="custom-tooltip"
                      style={{ position: "absolute" }}
                    >
                      Create Order
                    </Tooltip>
                  }
                  placement="top-start"
                >
                  <AddCircleOutlineIcon
                    onClick={() => {
                      navigate(
                        `/CreateOrder?ID=${uid}&docid=${d.id}&t=${Date.now()}`,
                        { state: { name: "true" } }
                      );
                    }}
                    style={{
                      width: "25px",
                      height: "25px",
                      color: "#2995BE",
                      cursor: "pointer",
                    }}
                  />
                </OverlayTrigger>
              </div>
            ),
            "You Give": giveCurrency,
            "Give Country": d.giveCountry,
            "You Take": takeCurrency,
            "Take Country": d.takeCountry,
            "Google Rates *": takecuramm + takeCurrency + "/" + giveCurrency,
            "Mobala FX **": takeout + takeCurrency + "/" + giveCurrency,
            "": (
              <div id={d.id} style={{ textAlign: "center" }}>
                <OverlayTrigger
                  overlay={
                    <Tooltip
                      id="tooltip-disabled"
                      bsPrefix="custom-tooltip"
                      style={{ position: "absolute" }}
                    >
                      Delete Row
                    </Tooltip>
                  }
                  placement="top-start"
                >
                  <img
                    alt="pointer"
                    id={d.id}
                    style={{
                      width: "25px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      let id = parseInt(e.target.parentElement.id);
                      addDoc("removeWatchList", { id: id }).then(() => {
                        setloading(true);
                        setTimeout(() => {
                          window.location.href = `/watchlist?ID=${uid}`;
                        }, 1000);
                      });
                    }}
                    src={Cencle}
                  />
                </OverlayTrigger>
              </div>
            ),
          };
  
          newRows.push(row);
        }
      } catch (error) {
        console.error('Error fetching exchange rates', error);
      }
    }
  
    table.rows = newRows;
    setcurrencyexchange(curencies);
    setIsLoading(false);
    setloading(false);
  };
  

  useEffect(() => {
    if (watchlist) {
      CurrencyConverter();
    }
  }, [watchlist]);

  return (
    <div className="d-flex flex-column maxh" style={{ marginTop: 90 }}>
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
      <div className="watchListPage">
        <Row className="centeritem ">
          <Col
            md={1}
            style={{
              marginTop: "-160px",
              textAlign: "start",
              marginLeft: "-160px",
            }}
          >
            <a
              className="btn-option"
              style={{ textAlign: "center" }}
              onClick={toggleContent}
            >
              <img
                src={info}
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
          <Col md={7} className="bdrforwatchlist pb-3">
            <Row className="mt-4">
              <div className="mobilewatchlist mt-2">
                <Row style={{ padding: 0 }}>
                  <Col style={{ marginLeft: "10px" }}>
                    <InputGroup className="mb-1">
                      <p style={{ fontWeight: "bold" }}>
                        Choose Currency Pairs and Countries
                      </p>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
              <div className="mobilewatchlist mt-2">
                <Row style={{ padding: 0 }}>
                  <Col style={{ marginLeft: "10px" }}>
                    <CurrencySelection
                      label="Give Currency"
                      value={givecurrency}
                      onChange={(e) => setgivecurrency(e.target.value)}
                      currencies={Currencies}
                    />
                  </Col>
                  <Col>
                    <CountrySelection
                      label="Give Country"
                      value={givecountry}
                      onChange={(e) => setgivecountry(e.target.value)}
                      countries={Countries}
                    />
                  </Col>
                </Row>

                <Row className="mt-1" style={{ padding: 0 }}>
                  <Col style={{ marginLeft: "10px" }}>
                    <CurrencySelection
                      label="Take Currency"
                      value={takecurrency}
                      onChange={(e) => settakecurrency(e.target.value)}
                      currencies={Currencies}
                    />
                  </Col>

                  <Col>
                    <CountrySelection
                      label="Take Country"
                      value={takecountry}
                      onChange={(e) => settakecountry(e.target.value)}
                      countries={Countries}
                    />
                  </Col>
                </Row>

                <Row style={{ display: "flex", justifyContent: "end" }}>
                  <Col style={{ textAlign: "right" }} md={3}>
                    <Button id="addbtn" onClick={Setdata}>
                      Add
                    </Button>
                  </Col>
                </Row>
              </div>

              <h5
                id="limit"
                style={{ display: "none", color: "red", textAlign: "center" }}
              >
                Your Limit of Watchlist has been Exceeded.
              </h5>
            </Row>
          </Col>

          <Col md={7}>
            {loading === true ? (
              <div className="container mt-2">
                <ShimmerBadge width={500} />
                <ShimmerBadge width={500} />
                <ShimmerBadge width={500} />
                <ShimmerBadge width={500} />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                <div className="px-2 md-7">
                  <Row className="mt-2 mobtable">
                    <WatchlistTable table={table} />
                  </Row>

                  <Row className="mt-2 webtable px-0">
                    <WatchlistTable table={table} />
                  </Row>
                </div>
                <InformationSection />
              </div>
            )}
          </Col>
        </Row>
      </div>
      <footer className="mt-auto"></footer>
    </div>
  );
}

export default Watchlist;
