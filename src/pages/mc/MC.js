import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Modal,
  Row
} from "react-bootstrap";
import "reactjs-popup/dist/index.css";
import APIURLS from "../../apiurls";
import "../../App.css";
import addedtofav from "../../asstes/addedtofav.svg";
import addtofav from "../../asstes/addtofav.svg";
import close from "../../asstes/close.svg";
import download from "../../asstes/download1.svg";
import info from "../../asstes/Iinfo.svg";
import Stars from "../../asstes/rattingstar.svg";
import tipsBuld from "../../asstes/tipsBulb.svg";
import AddNotesModal from "../../components/AddNotesModal";
import CitySelect from "../../components/mc/CitySelect";
import CountrySelect from "../../components/mc/CountrySelect";
import FavoritesToggle from "../../components/mc/FavoriteToggle";
import MoneyChangerTable from "../../components/mc/MoneyChangerTable";
import StateSelect from "../../components/mc/StateSelect";
import { Cities as data } from "../../components/newCountry";
import Shimmer from "../../components/shared/shimmer";
import { AppContext } from "../../Context";
import TableROWMC from "../../data/mcTable";
import { addDoc, apiHost } from "../../Helper";
import { apiInterceptor } from "../../service/ApiService";

function MC(props) {
  const [State, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [useselectedstate, setuseState] = useState("");
  const [selectedcountry, setselectedcountry] = useState("");
  const [useselectedcity, setuseselectedcity] = useState("");
  const [uid, setuid] = useState(sessionStorage.getItem("UserID"));
  const [userslist, setuserslist] = useState([]);
  const [mcUserList, setmcUserList] = useState([]);
  const [favs, setFavs] = useState({});
  const [Countries, setCountries] = useState([]);
  const [States, setStates] = useState([]);
  const [Cities, setCities] = useState([]);
  const [loading, setloading] = useState(false);
  const context = useContext(AppContext);
  const [isFav, setIsFav] = useState(false);
  const [favFilter, setFavFilter] = useState("");
  const [filteredInviteList, setFilteredInviteList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
    const [addNotesModalOpen, setAddNotesModalOpen] = useState(false);
    const [notes, setNotes] = useState("");
    const [mcUserId, setMCUserId] = useState("");
    const [isNoteCreated, setIsNoteCreated] = useState(false);

    useEffect(()=> {
      GetMCUserById();
    }, [])

    const GetMCUserById = async () => {
      apiInterceptor.get(APIURLS.USERS.USERBYID(uid)).then(async(response)=>{
        setuseselectedcity(response.data.city);
        setselectedcountry(response.data.country);
        setuseState(response.data.province)
      });
    };

  
    const toggleContent = () => {
      setShowModal(true);
    };
  
    const hideModal = () => {
      setShowModal(false);
    };

  useEffect(() => {
  
    getCountry();
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [data]);

  const getCountry = () => {
    let countries = data.map((d) => d.country);
    countries = [...new Set(countries)];
    countries = countries.sort();
    setCountries(countries);
  };

  // useEffect(() => {
  //   if (Countries.length > 0) {
  //     setselectedcountry(sessionStorage.getItem("Country") || "");
  //   }
  // }, [Countries]);

  useEffect(() => {
    getState();
  }, [selectedcountry]);

  const getState = () => {
    // if (!selectedcountry) {
      // setStates([]); // Clear states if no country is selected
      // return;
    // }
    let states = data
      .filter((x) => x.country === selectedcountry)
      .map((obj) => obj.subCountry);
    states = [...new Set(states)];
    states = states.sort();
    setStates(states);
  };

  // useEffect(() => {
  //   if (States.length > 0) {
  //     setuseState(sessionStorage.getItem("Province") || "");
  //   }
  // }, [States]);

  useEffect(() => {
    getCity();
  }, [useselectedstate]);

  const getCity = () => {
    // if (!useselectedstate) {
      // setCities([]); // Clear cities if no state is selected
      // return;
    // }
    let cities = data
      .filter((x) => x.subCountry === useselectedstate)
      .map((obj) => obj.name);
    cities = [...new Set(cities)];
    cities = cities.sort();
    setCities(cities);
  };



  useEffect(()=>{
    if(!selectedcountry){
      defaultCityState();
    }
  }, [selectedcountry])


  const defaultCityState = () => {
    let cities = data
      .map((obj) => obj.name);
    cities = [...new Set(cities)];
    cities = cities.sort();
    setCities(cities);

    let states = data
      .map((obj) => obj.subCountry);
    states = [...new Set(states)];
    states = states.sort();
    setStates(states);
  };

  // useEffect(() => {
  //   if (Cities.length > 0) {
  //     setuseselectedcity(sessionStorage.getItem("City") || "");
  //   }
  // }, [Cities]);
  const GetMCUserListByCity = async () => {
    let url = `${apiHost}/api/User/McUsers?city=${useselectedcity}&country=${selectedcountry}`;

    apiInterceptor.get(APIURLS.USERS.MCUSERS(useselectedcity, selectedcountry))
      .then(async (response) => {
        let users = response.data;
        let userSelf = users.filter((z) => {
          return z.id == uid;
        });
        let mcuser;
        if (userSelf.length == 0) {
          mcuser = [...users];
        } else {
          mcuser = [userSelf[0], ...users];
        }
        const currentUsers = [...new Set(mcuser)];
        setuserslist(currentUsers);
        console.log(
          "brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
          currentUsers
        );
      });
  };

  const GetMCUserListByCountry = async () => {
    let url = `${apiHost}/api/User/McUsersByCountry?country=${selectedcountry}`;

    apiInterceptor.get(APIURLS.USERS.MCUSERSBYCUNTRY(selectedcountry))
      .then(async (response) => {
        let users = response.data;
        let userSelf = users.filter((z) => {
          return z.id == uid;
        });
        let mcuser;
        if (userSelf.length == 0) {
          mcuser = [...users];
        } else {
          mcuser = [userSelf[0], ...users];
        }
        const currentUsers = [...new Set(mcuser)];
        setuserslist(currentUsers);
        console.log(
          "brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
          currentUsers
        );
      });
  };

 

  const GetMCUserListByCountryAndState = async () => {
    let url = `${apiHost}/api/User/McUsersByCountryAndState?country=${selectedcountry}&state=${useselectedstate}`;

    apiInterceptor.get(APIURLS.USERS.MCUSERSBYCUNTRYANDSTATE(selectedcountry, useselectedstate))
      .then(async (response) => {
        let users = response.data;
        let userSelf = users.filter((z) => {
          return z.id == uid;
        });
        let mcuser;
        if (userSelf.length == 0) {
          mcuser = [...users];
        } else {
          mcuser = [userSelf[0], ...users];
        }
        const currentUsers = [...new Set(mcuser)];
        debugger
        setuserslist(currentUsers);
        console.log(
          "brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
          currentUsers
        );
      });
  };

  const GetFavMcUserList = async () => {
    let url = `${apiHost}/api/User/FavMcUsers?uid=${uid}`;

    apiInterceptor.get(APIURLS.USERS.FAVMCUSERS(uid))
      .then(async (response) => {
        var favs = {};
        response.data.list.forEach((D) => {
          favs[D.mcUserId] = true;
        });
        setFavs(favs);
      });
  };

  useEffect(() => {
    if (selectedcountry != "") {
      GetMCUserListByCountry();
      GetFavMcUserList();
    }
    if (useselectedstate != "") {
      GetMCUserListByCountryAndState();
      GetFavMcUserList();
    }
    if (useselectedcity != "") {
      GetMCUserListByCity();
      GetFavMcUserList();
    }
  }, [selectedcountry, useselectedstate, useselectedcity]);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const clickFav = (fav, id) => {
    if (!fav) {
      addDoc("addFavoriteMC", {
        UserId: uid,
        McUserId: id,
      }).then(() => {
        GetFavMcUserList();
      });
    } else {
      addDoc("removeFavoriteMC", {
        UserId: uid,
        McUserId: id,
      }).then(() => {
        GetFavMcUserList();
      });
    }

  };

  useEffect(() => {
    setFilteredList(favs);
  }, [isFav]);

  const displayedUsersList = isFav
    ? userslist.filter((user) => favs[user.id])
    : userslist;

  const Getdocument = async (d) => {
    try {
      let url = `${apiHost}/api/Orders/GetUserDocuments?UserId=${d.id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include the authorization header
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("response:" , response);
      const blob = await response.blob();
      console.log(blob);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${d.userName}-Documents.zip`;
      link.click();
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };
  const handleOnClick = async (MCUserID) => {
        const userId = sessionStorage.getItem("UserID");
        setMCUserId(MCUserID);
        let url = `${apiHost}/api/User/GetUserNote?UserId=${userId}&MCUserId=${MCUserID}`;
        const result = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          }
        });
        // console.log(result.data);
        if (result.data !== "No Record Found") {
          setNotes(result.data);
          setIsNoteCreated(false);
        } else {
          setNotes("");
          setIsNoteCreated(true);
        }
        setAddNotesModalOpen(true);
      }
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
      <AddNotesModal
        showModal={addNotesModalOpen}
        setShowModal={setAddNotesModalOpen}
        value={notes}
        setValue={setNotes}
        mcuserid={mcUserId}
        isNoteCreated={isNoteCreated}
      />
      <div className="">
        <Row className="centeritem ">
          <Col md={9} className="bdrforwatchlisth tableData">
            <Row className="mt-4">
              <Row className="mt-4 mb-3">
              <Col md={1} style={{ marginTop: 0, textAlign: "start" }}>
                  <a
                    className="btn-option"
                    style={{ textAlign: "center" }}
                    onClick={toggleContent}
                  >
                    <img
                      src={info}
                      className="info"
                      alt="logo"
                      style={{ width: "30px", filter: "invert(33%) sepia(89%) saturate(5319%) hue-rotate(187deg)" }}

                    />
                  </a>
                </Col>
                <Col md={10} style={{ textAlign: "center" }}>
                  <p style={{ fontWeight: "bold" }}>
                    Find a Mobala Money Changer (MC) in an area near you. These are not agents of Mobala and operate independently.
                  </p>
                  <p>
                    <img src={tipsBuld} style={{ marginTop: "-10px", width: "20px" }} />
                    Money Changers in other places might get you a better deal
                  </p>
                </Col>
                <Col md={1} style={{ marginTop: 0 }}>
                  <></>
                </Col>
              </Row>

              <div className="mobilewatchlist mt-2">
                <Row style={{ padding: 0 }}>
                  <CountrySelect
                    selectedcountry={selectedcountry}
                    setselectedcountry={setselectedcountry}
                    setuseState={setuseState}
                    setuseselectedcity={setuseselectedcity}
                    Countries={Countries}
                  />
                  <StateSelect
                    useselectedstate={useselectedstate}
                    setuseState={setuseState}
                    setuseselectedcity={setuseselectedcity}
                    States={States}
                  />
                  <CitySelect
                    useselectedcity={useselectedcity}
                    setuseselectedcity={setuseselectedcity}
                    Cities={Cities}
                  />
                </Row>
              </div>
            </Row>

            <FavoritesToggle isFav={isFav} setIsFav={setIsFav} />

            <Row style={{ overflowX: "auto" }} className="mt-4 mx-auto">
              {loading === true ? (
                <div className="container">
                  <Shimmer height="15px" width="90%" />
                  <Shimmer height="15px" width="90%" />
                  <Shimmer height="15px" width="90%" />
                  <Shimmer height="15px" width="90%" />
                  <Shimmer height="15px" width="90%" />
                  <Shimmer height="15px" width="90%" />
                  <Shimmer height="15px" width="90%" />
                </div>
              ) : (
                <MDBTable bordered borderColor="secondary">
                  <MDBTableHead>
                    <TableROWMC />
                  </MDBTableHead>
                  <MDBTableBody className="tablebody">
                    {displayedUsersList.length > 0
                      ? displayedUsersList
                        .filter(
                          (d) =>
                            (!useselectedstate || d.province === useselectedstate) &&
                            (!useselectedcity || d.city === useselectedcity)
                        )
                        .map((d, i) => (
                          <MoneyChangerTable
                            key={i}
                            d={d}
                            i={i}
                            uid={uid}
                            Stars={Stars}
                            addedtofav={addedtofav}
                            addtofav={addtofav}
                            favs={favs}
                            clickFav={clickFav}
                            download={download}
                            Getdocument={Getdocument}
                            truncateText={truncateText}
                          />
                        ))
                      : null}
                  </MDBTableBody>
                </MDBTable>
              )}

            </Row>
            <div className="row mt-4">
                <ul>
                  <li><p style={{fontSize:"12.5px", fontWeight:"bolder"}}>* Direct Orders are released to the Open Market and your MC is informed about it along with your contact details for private orders. Please call Money Changer.</p></li>
                  <li><p style={{fontSize:"12.5px", fontWeight:"bolder",}}>* Notes are for your personal use and not visible to anyone.</p></li>
                </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default MC;
