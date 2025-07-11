import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { apiHost, setDoc } from "../../Helper";
import SignalRService from "../../SignalR";
import APIURLS from "../../apiurls";
import Iicons from "../../asstes/infobox.png";
import { Codes } from "../../components/CountryCodes";
import { Currencies } from "../../components/Currencies";
import AmountInput from "../../components/createorder/AmountInput";
import ExpiryDateInput from "../../components/createorder/ExpiryDateInput";
import GiveCurrencyForm from "../../components/createorder/GiveCurrencyForm";
import LoginInformation from "../../components/createorder/LoginInformation";
import OrderActions from "../../components/createorder/OrderActions";
import TakeCurrencyForm from "../../components/createorder/TakeCurrencyForm";
import { Cities as cityData } from "../../components/newCountry";
import Model from "../../components/order/createOrder/Model";
import { apiInterceptor } from "../../service/ApiService";
export let ordernumber = -1;

function CreateOrder(props) {
  const [showform, setshowform] = useState(false);
  const navigate = useNavigate();
  const activateBtn = useRef();
  const [Countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHold, setIsLoadingHold] = useState(false);
  const [giveStates, setgiveStates] = useState([]);
  const [takeStates, settakeStates] = useState([]);
  const [giveCities, setgiveCities] = useState([]);
  const [takeCities, settakeCities] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [takecurrency, settakecurrency] = useState(null);
  const [iseditORder, setiseditORder] = useState(false);
  const [givecurrency, setgivecurrency] = useState(null);
  const [takeCountryId, settakeCountryId] = useState(null);
  const [takestateId, settakestateId] = useState(null);
  const [giveCountryId, setgiveCountryId] = useState(null);
  const [stateArray, setStateArray] = useState([]);
  const [givestateId, setgivestateId] = useState(null);
  const [userdata, setuserdata] = useState("");
  const [modalID, setModalID] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [watchlistDocList, setwatchlistDocList] = useState({});
  const [datedisable, setdatedisable] = useState(false);
  const [useselectedstate, setuseState] = useState("");
  const [expirytime, setexpirytime] = useState("");
  const [useselectedcity, setuseselectedcity] = useState(null);
  const [selectedcountry, setselectedcountry] = useState("");
  const [usegiveselectedstate, setgiveuseState] = useState("");
  const [usegiveselectedcity, setgiveuseselectedcity] = useState(null);
  const [giveselectedcountry, setgiveselectedcountry] = useState("");
  const [AddAmount, setAddAmount] = useState("");
  const [output, setOutput] = useState("");
  const [outputGive, setOutputGive] = useState("");
  const [watchlistDocid, setWatchlistDocid] = useState("");
  const [suggestion, setsuggestion] = useState("");
  const [giveSuggestion, setGiveSuggestion] = useState("");
  const [takeSuggestion, setTakeSuggestion] = useState("");
  const [giveamount, setgiveamount] = useState("");
  const [takeamount, settakeamount] = useState("");
  const [Cash, setCash] = useState(false);
  const [Bank, setBank] = useState(false);
  const [giveAssistance, setGiveAssistance] = useState(false);
  const [takeCash, settakeCash] = useState(false);
  const [takeBank, settakeBank] = useState(false);
  const [takeAssistance, setTakeAssistance] = useState(false);
  // const [goodcheck, setgoodcheck] = useState(false);
  const [amountSurety, setAmountSurety] = useState(false);
  const [amountSuretyGive, setAmountSuretyGive] = useState(false);
  const [docid, setDocid] = useState("");
  const [orderslist, setorderslist] = useState("");
  const [formatoutput, setformatoutput] = useState("");
  const [formatoutputGive, setformatoutputGive] = useState("");
  const [UntilGoodDate, SetUntilGoodDate] = useState("");
  const [givecurrencyerr, setgivecurrencyerror] = useState("");
  const [giveamounterr, setgiveamounterr] = useState("");
  const [takecurrencyerr, settakecurrencyerr] = useState("");
  const [takeamounterr, settakeamounterr] = useState("");
  const [amountSuretyerr, setAmountSuretyerr] = useState("");
  const [amountSuretyerrGive, setAmountSuretyerrGive] = useState("");
  const [Docidtype, setDocidtype] = useState("");
  const [serial_no, setserial_no] = useState("");
  const [maxDate, setmaxDate] = useState(0);
  const [isQuickOrder, setisQuickOrder] = useState(false);
  const [time, setTime] = useState("");
  const [ddate, setDdate] = useState("");

  //////////////////////////FX//////////////
  const [type, settype] = useState("password");
  const [type1, settype1] = useState("password");
  const [email, setEmail] = useState("");
  const [checkcode, setcheckcode] = useState(" ");
  const [Verifycode, setverifycode] = useState("");
  const [verifiedcode, setverifiedcode] = useState(" ");
  const [emailverify, setemailverify] = useState(false);
  const [border, setborder] = useState(false);
  const [checkemail, setcheckEmail] = useState(" ");
  const [passcheck, setpasscheck] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passworderr, setPassworderror] = useState("");
  const [password, setPassword] = useState("");
  const [emailerr, setEmailerror] = useState("");
  const [usernameerr, setusernameerr] = useState("");
  const [UserName, setUsername] = useState("");
  const [mcOrderId, setMcOrderId] = useState();
  const [showGiveSuggestion, setShowGiveSuggestion] = useState(false);
  const [showTakeSuggestion, setShowTakeSuggestion] = useState(false);
  const [takelengtherr, settakelengtherr] = useState(null);
  const [giveLengtherr, setgiveLengtherr] = useState(null);
  const [rates, setRates] = useState(null);
  const [countryerr, setcountryerr] = useState("");
  const [selectedlogincountry, setSelectedLoginCountry] = useState("");
  //SetAlerts
  const [isChecked, setIsChecked] = useState(true);
  const [error, setError] = useState({
    giveCountryErr: "",
    giveStateErr: "",
    giveCityErr: "",
    takeCountryErr: "",
    takeStateErr: "",
    takeCityErr: "",
  });

  document.addEventListener("DOMContentLoaded", function () {
    if (props.is1FX) {
      document.getElementById("root").scrollTo(0, 0);
    }
  });
  const changetype = async () => {
    settype("input");
  };

  const changetypepass = async () => {
    settype("password");
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click Verify and check your email to verify account
    </Tooltip>
  );

  const changetype1 = async () => {
    settype1("input");
  };
  const changetypepass1 = async () => {
    settype1("password");
  };

  useEffect(() => {
    if (props.is1FX) {
      if (checkcode != Verifycode && checkcode.length > 3) {
        document.getElementById("codeerr").style.display = "block";
      } else {
        document.getElementById("codeerr").style.display = "none";
      }
    }
  }, [checkcode]);

  useEffect(() => {
    if (props.is1FX) {
      if (checkcode == Verifycode && checkemail === email) {
        setverifiedcode(checkcode);
        setborder(true);
        setemailverify(true);
        setshowform(false);
        document.getElementById("tick").style.display = "block";
        document.getElementById("email").disabled = true;
        document.getElementById("codebutton").className = "btnverifygreyed";
        document.getElementById("codebutton").innerHTML = "Verified/Change";
      } else {
        setemailverify(false);
        document.getElementById("codebutton").style.display = "block";
        document.getElementById("tick").style.display = "none";

        setborder(false);
      }
    }
  }, [checkcode, Verifycode, email, verifiedcode]);

  useEffect(() => {
    if (props.is1FX) {
      setisQuickOrder(true);
      document.getElementById("rate-date-time").style.display = "none";
    }
  }, [props.is1FX]);
  /////////////////////////////////////////////////////////////////////

  const getOrder = async () => {
    if (docid !== "" && docid !== 0) {
      let url = `${apiHost}/api/Orders/GetOrderById?OrderId=${docid}`;
      apiInterceptor.get(APIURLS.ORDERS.GETORDERSBYID(docid))
        .then((response) => {
          console.log("BRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR", response.data)
          const orderdata = { ...response.data };
          setorderslist(orderdata);
          setserial_no(response.data.length);
        })
        .catch((error) => {
          ////console.log(error);
        });
    }
  };

  function errorCheck() {
    let errorBorder = false;
    let errCount = 0;
    let errObj = { ...error };
    console.log();
    if (givecurrency === null || givecurrency == "") {
      document.getElementById("root").scrollTo(0, 0);
      setgivecurrencyerror("Missing Field");
      errorBorder = false;
      errCount += 1;
    }
    if (giveamount == "" || giveamount == null) {
      document.getElementById("root").scrollTo(0, 0);
      setgiveamounterr("Missing Field");
      errorBorder = false;
      errCount += 1;
    }
    if (selectedcountry === null || selectedcountry == "") {
      document.getElementById("root").scrollTo(0, 0);
      errObj = { ...errObj, giveCountryErr: "Missing Field." };
      errorBorder = false;
      errCount += 1;
    }
    if (useselectedstate === null || useselectedstate == "") {
      document.getElementById("root").scrollTo(0, 0);
      errObj = { ...errObj, giveStateErr: "Missing Field." };
      errorBorder = false;
      errCount += 1;
    }
    if (useselectedcity === null || useselectedcity == "") {
      document.getElementById("root").scrollTo(0, 0);
      errObj = { ...errObj, giveCityErr: "Missing Field." };
      errorBorder = false;
      errCount += 1;
    }
    if (takecurrency === null || takecurrency == "") {
      document.getElementById("root").scrollTo(0, 200);
      settakecurrencyerr("Missing Field");
      errorBorder = false;
      errCount += 1;
    }
    if (takeamount == "" || takeamount == null) {
      document.getElementById("root").scrollTo(0, 200);
      settakeamounterr("Missing Field");
      errorBorder = false;
      errCount += 1;
    }
    if (giveselectedcountry === null || giveselectedcountry == "") {
      document.getElementById("root").scrollTo(0, 0);
      errObj = { ...errObj, takeCountryErr: "Missing Field." };
      errorBorder = false;
      errCount += 1;
    }
    if (usegiveselectedstate === null || usegiveselectedstate == "") {
      document.getElementById("root").scrollTo(0, 0);
      errObj = { ...errObj, takeStateErr: "Missing Field." };
      errorBorder = false;
      errCount += 1;
    }
    if (usegiveselectedcity === null || usegiveselectedcity == "") {
      document.getElementById("root").scrollTo(0, 0);
      errObj = { ...errObj, takeCityErr: "Missing Field." };
      errorBorder = false;
      errCount += 1;
    }
    if (takelengtherr != null && amountSurety == false) {
      document.getElementById("root").scrollTo(0, 500);
      setAmountSuretyerr("Please check the box");
      errorBorder = false;
      errCount += 1;
    }
    if (giveLengtherr != null && amountSuretyGive == false) {
      document.getElementById("root").scrollTo(0, 500);
      setAmountSuretyerrGive("Please check the box");
      errorBorder = false;
      errCount += 1;
    }
    setError({ ...errObj });
    if (errCount == 0) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let mcOrderId = urlParams.get("mcOrderId");
    setMcOrderId(mcOrderId);
    if (mcOrderId) {
      let url = `${apiHost}/api/Orders/GetOrderById?OrderId=${mcOrderId}`;

      apiInterceptor.get(APIURLS.ORDERS.GETORDERSBYID(mcOrderId))
        .then((response) => {
          ////console.log(response.data)
          const orderdata = { ...response.data };
          if (orderdata.takeCurrencyInfo === undefined) {
            settakecurrency(orderdata.giveCurrency);
            setgivecurrency(orderdata.takeCurrency);
          } else {
            settakecurrency(orderdata.giveCurrencyInfo);
            setgivecurrency(orderdata.takeCurrencyInfo);
          }
          setgiveamount(orderdata.takeAmount.toLocaleString("en-US"));
          //setgiveCountryInfo(orderdata.takeCountryId);
          setselectedcountry(orderdata.takeCountry);
          setuseState(orderdata.takeState);
          setuseselectedcity(orderdata.takeCity);
          setBank(orderdata.takeThroughBank);
          setCash(orderdata.takeThroughCash);
          setTakeAssistance(orderdata?.takeAssistance ?? false);
          //extra ig
          setgiveCountryId(orderdata.takeCountryId);
          setgivestateId(orderdata.takestateId);

          //GIVE
          settakeamount(orderdata.giveAmount.toLocaleString("en-US"));
          setgiveselectedcountry(orderdata.giveCountry);
          setgiveuseState(orderdata.giveState);
          setgiveuseselectedcity(orderdata.giveCity);
          settakeCash(orderdata.giveSourceCash);
          settakeBank(orderdata.giveSourceBank);
          setGiveAssistance(orderdata?.giveAssistance ?? false);
          //setAddAmount(orderdata.additionalInfo);
          //setStartDate(new Date(orderdata.untilGoodDate));
          setIsChecked(orderdata.alerts);
          console.log(`Send Alerts is set to ${isChecked}`);
        })
        .catch((error) => {
          ////console.log(error);
        });
    }
    let date = new Date();
    date.setFullYear(date.getFullYear() + 5);
    setmaxDate(date);
    getRates();
    ////console.log("date//////////////// ", date);
  }, []);

  const hideModal = () => {
    setShowModal(false);
    navigate(`/OrderCom?ID=${uid}&t=${Date.now()}`);
  };
  useEffect( () => {
    getOrder();
  }, [docid]);

  useEffect(() => {
    if (orderslist === undefined || orderslist == "") {
    } else {
      if (orderslist.takeCurrencyInfo === undefined) {
        settakecurrency(orderslist.takeCurrency);
        setgivecurrency(orderslist.giveCurrency);
      } else {
        settakecurrency(orderslist.takeCurrencyInfo);
        setgivecurrency(orderslist.giveCurrencyInfo);
      }
      setiseditORder("true");
      settakeamount(orderslist.takeAmount.toLocaleString("en-US"));
      setgiveamount(orderslist.giveAmount.toLocaleString("en-US"));
      setselectedcountry(orderslist.giveCountry);
      // setgoodcheck(orderslist.untilcheck)
      setuseState(orderslist.giveState);
      setuseselectedcity(orderslist.giveCity);
      setgiveselectedcountry(orderslist.takeCountry);
      setgiveuseState(orderslist.takeState);
      setgiveuseselectedcity(orderslist.takeCity);
      settakeCash(orderslist.takeThroughCash);
      settakeBank(orderslist.takeThroughBank);
      setTakeAssistance(orderslist?.takeAssistance ?? false);
      setBank(orderslist.giveSourceBank);
      setCash(orderslist.giveSourceCash);
      setGiveAssistance(orderslist?.giveAssistance ?? false);
      // setdatedisable(true);
      setAddAmount(orderslist.additionalInfo);
      if (orderslist.status === "expired") {
        const currentDate = new Date();
        const futureDate = new Date(
          currentDate.setDate(currentDate.getDate() + 30)
        );
        setStartDate(futureDate);
      } else {
        // If the order is not expired, set the start date based on the ordersList.untilGoodDate
        setStartDate(new Date(orderslist.untilGoodDate + "Z"));
      }
      if (orderslist.status === "expired") {
        getdate();
      } else {
        SetUntilGoodDate(orderslist.untilGoodDate);
      }
      setIsChecked(orderslist.alerts);
    }
  }, [orderslist]);

  function handleAmountSurety() {
    setAmountSuretyerr("");
    setAmountSurety(!amountSurety);
  }
  function handleAmountSuretyGive() {
    setAmountSuretyerrGive("");
    setAmountSuretyGive(!amountSuretyGive);
  }
  function handleCashSource() {
    setCash(!Cash);
  }
  function handleBankSource() {
    setBank(!Bank);
  }
  function handlegiveAssistance() {
    setGiveAssistance(!giveAssistance);
  }
  function handletakeCashSource() {
    settakeCash(!takeCash);
  }
  function handletakeBankSource() {
    settakeBank(!takeBank);
  }
  function handletakeAssistance() {
    setTakeAssistance(!takeAssistance);
  }
  // function handleGooduntil() {
  //   setgoodcheck(!goodcheck);
  // }
  useEffect(() => {
    //console.log(amountSuretyGive);
  }, [amountSuretyGive]);
  useEffect(() => {
    var stringWithoutCommas = output.replace(/,/g, "");
    var number = Math.floor(stringWithoutCommas);
    var stringWithout = takeamount;
    var take_num = Math.floor(stringWithout);
    var percentToGet = 15;
    var percent = (percentToGet / 100) * number;
    let max_num = number + percent;
    let min_num = number - percent;
  }, [output, takeamount]);

  const getdate = async () => {
    setStartDate(new Date(Date.now() + 864000000 * 3));
    let x = new Date(Date.now() + 864000000 * 3);
    setexpirytime(
      x
        .toLocaleDateString("en-us", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        })
        .replaceAll("/", "-")
    );
    SetUntilGoodDate(x.toISOString());
  };
  const styles = {
    err: {
      borderColor: "red",
      borderWidth: "1px",
    },
    show: {
      display: "block",
    },
    hide: {
      display: "none",
    },
  };
  useEffect(() => {
    if (docid == 0 || docid == "") {
      getdate();
    }
  }, []);

  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  useEffect(() => {
    setUID(window.location.search.split("&")[0].split("=")[1]);
    try {
      if (window.location.search.split("&")[1].split("=")[0] == "Hid") {
        try {
          setDocid(window.location.search.split("&")[1].split("=")[1]);
          setDocidtype(window.location.search.split("&")[1].split("=")[0]);
          setWatchlistDocid(0);
        } catch (e) {
          setDocid(0);
          ////console.log(e);
        }
      } else {
        try {
          setWatchlistDocid(window.location.search.split("&")[1].split("=")[1]);
          setDocid(0);
        } catch (e) {
          setWatchlistDocid(0);
        }
      }
    } catch {
      setDocid(0);
      setWatchlistDocid(0);
    }
  }, []);

  useEffect(() => {
    let url = `${apiHost}/api/Rates/FetchRate`;

    apiInterceptor.get(APIURLS.RATES.GETRATES).then((response) => {
      let dd = new Date(response.data.time.value);
      dd = new Date(
        dd.toLocaleString("en-US", {
          timeZone: sessionStorage.getItem("TimeZone"),
        })
      );
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDate = dd.toLocaleDateString("en-US", options);
      let date =
        formattedDate.split(",")[0] + "," + formattedDate.split(",")[1];
      setDdate(date);
      let time =
        formattedDate.split(",")[2] +
        `  (${sessionStorage.getItem("TimeZone")})`;
      setTime(time);
    });
  }, [uid]);

  const getWatchlistDocData = async () => {
    let url = `${apiHost}/api/User/GetWatchListByID?Id=${watchlistDocid}`;
    apiInterceptor.get(APIURLS.USERS.GETWATCHLISTBYID(watchlistDocid))
      .then((response) => {
        debugger
        setiseditORder("true");
        settakecurrency(response.data.takeCurrencyInfo);
        setgivecurrency(response.data.giveCurrencyInfo);
        setselectedcountry(response.data.giveCountry);
        setgiveselectedcountry(response.data.takeCountry);
        setwatchlistDocList({ ...response.data });
      })
      .catch((error) => {
        debugger
        ////console.log(error);
      });
  };
  useEffect(() => {
    setuserdata(sessionStorage.getItem("UserName"));
  }, [uid]);
  useEffect(() => {
    setuserdata(sessionStorage.getItem("UserName"));
    if (watchlistDocid != 0) {
     getWatchlistDocData();
    }
  }, [watchlistDocid]);
  const PutonHold = async () => {
    let checkError = errorCheck();
    let checkExisting = await checkExistingOrder();
    if (checkError == false) {
      //console.log("m");
    } else if (checkExisting) {
    } else {
      setIsLoadingHold(true);
      let giveCityLatLon = {};
      let takeCityLatLon = {};
      let countryCode = getCountryCode(selectedcountry, giveselectedcountry);

      fetch(
        `${apiHost}/api/Orders/GetCoordinates?city=${useselectedcity}&state=${useselectedstate}&country=${selectedcountry}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((ress) => {
          ////console.log(ress.results[0].annotations.DMS);
          let giveLat = ress.latitude.split(" ").join("");
          let giveLng = ress.longitutde.split(" ").join("");
          giveCityLatLon = { lat: giveLat, lon: giveLng };

          apiInterceptor.get(APIURLS.ORDERS.GETCOORDINATES(usegiveselectedcity, usegiveselectedstate, giveselectedcountry))
            .then((res1) => res1.json())
            .then((ress1) => {
              let takeLat = ress1.latitude.split(" ").join("");
              let takeLng = ress1.longitutde.split(" ").join("");
              takeCityLatLon = { lat: takeLat, lon: takeLng };
              setDoc(`create`, {
                SerialNo: serial_no + 1,
                Userid: uid,
                Username: sessionStorage.getItem("UserName"),
                GiveAmount: giveamount,
                GiveCity: useselectedcity,
                GiveState: useselectedstate,
                GiveCityLatLon: giveCityLatLon,
                GiveCountry: selectedcountry,
                GiveCountryCode:
                  countryCode[0] == "" ? selectedcountry : countryCode[0],
                TakeAmount: takeamount,
                TakeCity: usegiveselectedcity,
                TakeCityLatLon: takeCityLatLon,
                TakeState: usegiveselectedstate,
                TakeCountry: giveselectedcountry,
                TakeCountryCode:
                  countryCode[1] == "" ? giveselectedcountry : countryCode[1],
                TakeCurrency: takecurrency.split(" ")[0],
                TakeCurrencyInfo: takecurrency,
                GiveSourceCash: Cash,
                GiveSourceBank: Bank,
                GiveAssistance: giveAssistance,
                MatchInvite: false,
                MatchAccept: false,
                MatchReject: false,
                GiveCurrency: givecurrency.split(" ")[0],
                GiveCurrencyInfo: givecurrency,
                TakeThroughCash: takeCash,
                TakeThroughBank: takeBank,
                TakeAssistance: takeAssistance,
                AdditionalAmount: AddAmount,
                UntilGoodDate: UntilGoodDate,
                // untilcheck: goodcheck,
                HoldTime: date,
                ExpiredTome: expirytime,
                ExpiredTime: expirytime,
                status: "hold",
                matched: false,
                inFinalize: false,
                favBy: 0,
                timeCreated: Date.now(),
              }).then(() => {
                setIsLoadingHold(false);
                // navigate(`/OrderCom?ID=${uid}&t=${Date.now()}`);
              });
            });
        });
    }
  };
  const Updatedoc = async () => {
    let checkError = errorCheck();
    let checkExisting = await checkExistingOrder();
    if (checkError == false) {
      //console.log("m");
    } else if (checkExisting) {
    } else {
      // window.scroll(0, 0);
      setIsLoading(true);
      let giveCityLatLon = {};
      let takeCityLatLon = {};
      let countryCode = getCountryCode(selectedcountry, giveselectedcountry);
      apiInterceptor.get(APIURLS.ORDERS.GETCOORDINATES(useselectedcity, useselectedstate, selectedcountry))
        .then((res) => res.json())
        .then((ress) => {
          ////console.log(ress.results[0].annotations.DMS);
          let giveLat = ress.latitude.split(" ").join("");
          let giveLng = ress.longitutde.split(" ").join("");

          giveCityLatLon = { lat: giveLat, lon: giveLng };

          apiInterceptor.get(APIURLS.ORDERS.GETCOORDINATES(usegiveselectedcity, usegiveselectedstate, giveselectedcountry))
            .then((res) => res.json())
            .then((ress) => {
              ////console.log(ress.results[0].annotations.DMS);
              let takeLat = ress.latitude.split(" ").join("");
              let takeLng = ress.longitutde.split(" ").join("");
              takeCityLatLon = { lat: takeLat, lon: takeLng };
              setDoc("update", {
                Userid: uid,
                orderId: window.location.href.split("=")[2].replace("&t", ""),
                Username: userdata,
                GiveAmount: giveamount,
                GiveCity: useselectedcity,
                GiveCityLatLon: giveCityLatLon,
                GiveState: useselectedstate,
                GiveCountry: selectedcountry,
                GiveCountryCode:
                  countryCode[0] == "" ? selectedcountry : countryCode[0],
                TakeAmount: takeamount,
                TakeCity: usegiveselectedcity,
                TakeState: usegiveselectedstate,
                TakeCityLatLon: takeCityLatLon,
                TakeCountry: giveselectedcountry,
                TakeCountryCode:
                  countryCode[1] == "" ? giveselectedcountry : countryCode[1],
                GiveSourceCash: Cash,
                GiveSourceBank: Bank,
                GiveAssistance: giveAssistance,
                MatchInvite: false,
                MatchAccept: false,
                MatchReject: false,
                GiveCurrency: givecurrency.split(" ")[0],
                GiveCurrencyInfo: givecurrency,
                TakeThroughCash: takeCash,
                TakeThroughBank: takeBank,
                TakeAssistance: takeAssistance,
                AdditionalAmount: AddAmount,
                ActivateTime: date,
                UntilGoodDate: UntilGoodDate,
                ExpiredTome: UntilGoodDate,
                status: "active",
                sendAlert: isChecked,
                // untilcheck: goodcheck,
              }).then(() => {
                setIsLoading(false);
                let temp = sessionStorage.getItem("path");
                if (temp == "/OrderCom") {
                  navigate(`/OrderCom?ID=${uid}&t=${Date.now()}`);
                } else {
                  navigate(
                    `/OrderFXHome?ID=${uid}?orderId=${window.location.href.split("=")[2]
                    }`
                  );
                }
              });
            });
        });
    }
  };
  const getCountryCode = (give, take) => {
    let result = ["", ""];
    for (let index = 0; index < Codes.length; index++) {
      const element = Codes[index][0];
      if (element == give) {
        result[0] = Codes[index][1];
      }
      if (element == take) {
        result[1] = Codes[index][1];
      }
    }
    return result;
  };

  const Activate = async (userId) => {
    let checkError = errorCheck();
    let checkExisting = false;
    if (!props.is1FX) {
      checkExisting = await checkExistingOrder();
    }
    if (checkError == false) {
      //console.log("m");
    } else if (checkExisting) {
    } else {
      setIsLoading(true);
      debugger
      activateBtn.current.disabled = true;

      let giveCityLatLon = {};
      let takeCityLatLon = {};
      apiInterceptor.get(APIURLS.ORDERS.GETCOORDINATES(useselectedcity, useselectedstate, selectedcountry))
        .then((res) => res.json())
        .then((ress) => {
          console.log(ress);
          ////console.log(ress.results[0].annotations.DMS);
          let giveLat = ress.latitude.split(" ").join("");
          let giveLng = ress.longitutde.split(" ").join("");

          giveCityLatLon = { lat: giveLat, lon: giveLng };

          apiInterceptor.get(APIURLS.ORDERS.GETCOORDINATES(usegiveselectedcity, usegiveselectedstate, giveselectedcountry))
            .then((res) => res.json())
            .then((ress) => {
              ////console.log(ress.results[0].annotations.DMS)
              let takeLat = ress.latitude.split(" ").join("");
              let takeLng = ress.longitutde.split(" ").join("");
              takeCityLatLon = { lat: takeLat, lon: takeLng };
              let countryCode = getCountryCode(
                selectedcountry,
                giveselectedcountry
              );
              let obj = {
                SerialNo: serial_no + 1,
                Userid: userId,
                Username: userdata,
                GiveAmount: giveamount,
                GiveCity: useselectedcity,
                GiveCityLatLon: giveCityLatLon,
                GiveState: useselectedstate,
                GiveCountry: selectedcountry,
                GiveCountryCode:
                  countryCode[0] == "" ? selectedcountry : countryCode[0],
                TakeAmount: takeamount,
                TakeCity: usegiveselectedcity,
                TakeCityLatLon: takeCityLatLon,
                TakeState: usegiveselectedstate,
                TakeCountry: giveselectedcountry,
                TakeCountryCode:
                  countryCode[1] == "" ? giveselectedcountry : countryCode[1],
                TakeCurrency: takecurrency.split(" ")[0],
                TakeCurrencyInfo: takecurrency,
                GiveSourceCash: Cash,
                GiveSourceBank: Bank,
                GiveAssistance: giveAssistance,
                MatchInvite: false,
                MatchAccept: false,
                MatchReject: false,
                GiveCurrency: givecurrency.split(" ")[0],
                GiveCurrencyInfo: givecurrency,
                TakeThroughCash: takeCash,
                TakeThroughBank: takeBank,
                TakeAssistance: takeAssistance,
                AdditionalAmount: AddAmount,
                UntilGoodDate: UntilGoodDate,
                // untilcheck: goodcheck,
                status: "active",
                ActivateTime: date,
                ExpiredTome: expirytime,
                matched: false,
                favBy: 0,
                inFinalize: false,
                timeCreated: Date.now(),
              };
              setDoc(`create`, obj).then((res) => {
                SignalRService.sendMatches(uid, obj);
                localStorage.setItem(
                  "ordersCount",
                  parseInt(localStorage.ordersCount) + 1
                );
                setIsLoading(false);
                if (props.is1FX) {
                  props.setCustomer(1);
                } else if (props.isHomeFX) {
                  window.location.reload();
                } else {
                  navigate(`/OrderCom?ID=${userId}&t=${Date.now()}`);
                }
              });
            });
        });
    }
  };

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;

  ////////////////////////Location and COuntry/////////////////////////

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = () => {
    let countries = cityData.map((d) => d.country);
    countries = [...new Set(countries)];
    countries = countries.sort();
    setCountries(countries);
  };

  useEffect(() => {
    getState();
  }, [selectedcountry]);

  const getState = () => {
    let states = cityData
      .filter((x) => {
        return x.country == selectedcountry;
      })
      .map((obj) => {
        return obj.subCountry;
      });
    states = [...new Set(states)];
    states = states.sort();
    setStateArray(states);
    setgiveStates(states);
  };
  useEffect(() => {
    getCity();
  }, [useselectedstate]);

  const getCity = () => {
    let cities = cityData
      .filter((x) => {
        return x.subCountry == useselectedstate;
      })
      .map((obj) => {
        return obj.name;
      });
    cities = cities.sort();
    setgiveCities(cities);
  };

  ////////take///////

  useEffect(() => {
    gettakeState();
  }, [giveselectedcountry]);

  const gettakeState = () => {
    let states = cityData
      .filter((x) => {
        return x.country == giveselectedcountry;
      })
      .map((obj) => {
        return obj.subCountry;
      });
    states = [...new Set(states)];
    states = states.sort();
    setStateArray(states);
    settakeStates(states);
  };

  useEffect(() => {
    gettakeCity();
  }, [usegiveselectedstate]);

  const gettakeCity = () => {
    let cities = cityData
      .filter((x) => {
        return x.subCountry == usegiveselectedstate;
      })
      .map((obj) => {
        return obj.name;
      });
    cities = cities.sort();
    settakeCities(cities);
  };
  ///////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (
      takecurrency === "null" ||
      giveamount === "null" ||
      givecurrency === "null"
    ) {
      setOutput("");
      setformatoutput("");
      setsuggestion("");
    }
  }, [givecurrency, giveamount, takecurrency]);

  useEffect(() => {
    if (giveamount == undefined) {
      setgiveamount("");
      settakeamount("");
    }
  }, [orderslist, null]);

  function checkExistingOrder() {
    return new Promise((resolve, reject) => {
      if (
        takecurrency != null &&
        givecurrency != null &&
        usegiveselectedcity != null &&
        useselectedcity != null
      ) {
        let url = `${apiHost}/api/Orders/GetDuplicateOrder?GiveCurrency=${givecurrency.split(" ")[0]
          }&TakeCurrency=${takecurrency.split(" ")[0]
          }&userId=${uid}&TakeCity=${usegiveselectedcity}&GiveCity=${useselectedcity}`;
        apiInterceptor.get(APIURLS.ORDERS.GETDUPLICATEORDER(givecurrency, takecurrency, uid, usegiveselectedcity, useselectedcity))
          .then((response) => {
            debugger
            if (
              response.data != "" &&
              window.location.search.substring(1).split("&").length === 2
            ) {
              setModalID(response.data);
              setShowModal(true);
              resolve(true);
            }
            resolve(false);
          })
          .catch((error) => {
            //console.log(error);
          });
      }
    });
  }

  // useEffect(() => {
  //   if (!props.is1FX) {
  //     window.scrollTo(0, 100);
  //     document
  //       .getElementById("startingDiv")
  //       .scrollIntoView({ behavior: "auto", block: "start" });
  //   }
  // }, []);

  useEffect(() => {
    checkExistingOrder();
  }, [takecurrency, givecurrency, usegiveselectedcity, useselectedcity]);

  const confirmModal = () => {
    setShowModal(false);
    sessionStorage.setItem("path", window.location.pathname);
    //navigate(`/Createorder?ID=${uid}&Hid=${props.id}`);
    navigate(`/Createorder?ID=${uid}&Hid=${modalID}&t=${Date.now()}`);
    window.location.reload();
  };

  // const confirmModal = async () => {
  // };

  useEffect(() => {
    if (isQuickOrder) {
      let url = `${apiHost}/api/User/GetUserById?UserId=${uid}`;
      apiInterceptor
        .get(APIURLS.USERS.USERBYID(uid))
        .then((d) => {
          setgiveselectedcountry(d.data.country);
          setselectedcountry(d.data.country);
          setgiveuseState(d.data.province);
          setuseState(d.data.province);
          setuseselectedcity(d.data.city);
          setgiveuseselectedcity(d.data.city);
        });
    }
  }, [isQuickOrder]);
  ////////////////////////////////////////////////OrderFx////////////////////////////
  const Checkemail = async () => {
    return new Promise((resolve, reject) => {
      let Email = email.toLowerCase();
      let url = `${apiHost}/api/User/EmailExist?email=${Email}`;
      apiInterceptor.get(APIURLS.USERS.ISEMAILEXISTS(Email)).then(async (response) => {
        resolve(response.data);
      });
    });
  };

  const sendEmail = async (e) => {
    Checkemail().then((d) => {
      if (!d) {
        document.getElementById("codebutton").style.display = "none";
        document.getElementById("emailcheck").style.display = "none";
        if (checkcode == Verifycode) {
          document.getElementById("email").disabled = false;
          document.getElementById("codebutton").className = "verifybtn";
          document.getElementById("codebutton").innerHTML = "verify";
          document.getElementById("tick").style.display = "none";
          setcheckcode(" ");
          setverifycode("");
        } else {
          var val = Math.floor(1000 + Math.random() * 9000);
          setverifycode(val);
          document.getElementById("tick").style.display = "none";
          setborder(false);
          setcheckcode(" ");
          if (email.length === 0) {
            setEmailerror("Please Enter E-mail before verify");
            document.getElementById("root").scroll(0, 500);
            setTimeout(() => {
              setEmailerror("");
            }, 5000);
          } else {
            let url = `${apiHost}/api/User/GetUserByEmail?Email=${email}`;
            apiInterceptor.get(APIURLS.USERS.GETUSERBYEMAIL(email)).then(async (response) => {
              const data = [];
              response.data.users.map((doc) => {
                data.push({
                  ...doc,
                  id: doc.id,
                  Email: doc.Email,
                });
              });
              if (data.length >= 1) {
                document.getElementById("emailcheck").style.display = "block";
                setTimeout(() => {
                  document.getElementById("emailcheck").style.display = "none";
                }, 6000);
              } else {
                let url = `${apiHost}/api/Email/SendVerificationEmail?toEmail=${email}&code=${val}`;
                apiInterceptor.post(APIURLS.EMAIL.SENDVERIFICATIONEMAIL(email, val))
                  .then(async (response) => {
                    setshowform(true);
                    setcheckEmail(email);

                    document.getElementById("codebutton").style.display =
                      "none";
                    document.getElementById("sendcodemsg").style.display =
                      "block";
                    setTimeout(() => {
                      document.getElementById("sendcodemsg").style.display =
                        "none";
                    }, 6000);
                  })
                  .catch((err) => {
                    //console.log(err);
                  })
                  .catch((err) => {
                    //console.log(err);
                  });
              }
            });
          }
        }
      } else {
        document.getElementById("emailcheck").style.display = "block";
        document.getElementById("codebutton").style.display = "block";
        // setTimeout(() => {
        //   document.getElementById("emailcheck").style.display = "none";
        // }, 3000)
      }
    });
    e.preventDefault();
  };

  const checkUserName = async () => {
    return new Promise((resolve, reject) => {
      let url = `${apiHost}/api/User/UserNameExist?name=${UserName}`;
      apiInterceptor.get(APIURLS.USERS.ISUSERNAMEEXISTS(UserName)).then(async (response) => {
        if (response.data) {
          document.getElementById("takenerr").style.display = "block";
        } else {
          document.getElementById("takenerr").style.display = "none";
        }
        resolve(response.data);
      });
    });
  };

  useEffect(() => {
    if (UserName != "") {
      setusernameerr("");
    }
  }, [UserName]);

  useEffect(() => {
    if (email != 0) {
      setEmailerror("");
    }
  }, [email]);

  // useEffect(()=>{},[password])
  // useEffect(()=>{},[Verifycode])

  const ifFxSignup = () => {
    let errorcheck = errorCheck();
    let errcount = 0;
    if (!errorcheck) {
    }
    if (UserName == "") {
      setusernameerr("Missing Field");
      document.getElementById("userName").focus();
      errcount += 1;
    }
    if (UserName.toLowerCase().includes("mobala")) {
      setusernameerr("Username cannot include mobala");
      document.getElementById("userName").focus();
      errcount += 1;
    }
    if (UserName.length > 12) {
      document.getElementById("userName").focus();
      document.getElementById("takenlenerr").style.display = "block";
      errcount += 1;
    }
    if (email.length === 0) {
      setEmailerror("Missing Field");
      document.getElementById("email").focus();
      errcount += 1;
    }
    if (emailverify === false) {
      setEmailerror("Email is not verified");
      document.getElementById("verificationCode").focus();
      errcount += 1;
    }
    if (Verifycode != checkcode) {
      errcount += 1;
    }
    if (password.length === 0) {
      setPassworderror("Missing Field");
      document.getElementById("password").focus();
      errcount += 1;
    }
    if (password != confirmpassword) {
      setpasscheck("Password Mismatch");
      document.getElementById("confirmPassword").focus();
      errcount += 1;
    }
    if (password.length < 7) {
      setPassworderror(
        "Password must be 7 or more characters in length and minimum 1 special character"
      );
      document.getElementById("password").focus();
      errcount += 1;
    }
    if (selectedlogincountry == "") {
      setcountryerr("Missing Field");
      document.getElementById("root").scroll(0, 0);
      document.getElementById("country").focus();
      errcount += 1;
    }
    if (errcount == 0) {
      let data = {
        Email: email.toLocaleLowerCase(),
        pwd: password,
        Country: selectedlogincountry,
        UserName: UserName,
        date: new Date().toLocaleString(),
        Image: "",
        IDImage: "",
        DocumentImage: "",
        EndDocumentImage: "",
      };
      let url = `${apiHost}/api/Authentication/SignUp`;
      apiInterceptor
        .post(APIURLS.AUTHENTICATION.SIGNUP, data)
        .then((response) => {
          if (response.data.split(" ")[0] == "SignedUp") {
            setUID(response.data.split(" ")[1]);
            Activate(response.data.split(" ")[1]);
          }
        })
        .catch((error) => {
          //console.log(error);
          setIsLoading(false);
        });
    }
  };

  const getRates = () => {
    let url = `${apiHost}/api/Rates/FetchRate`;
    apiInterceptor.get(APIURLS.RATES.GETRATES).then((response) => {
      debugger
      setRates(response.data.rates);
    });
  };

  const checkAmountLength = (amount, suggested) => {
    var suggestion = suggested.replaceAll(",", "");
    var min_amount = (suggestion * 90) / 100;
    var max_amount = (suggestion * 110) / 100;
    var amount = amount.replaceAll(",", "");
    // //console.log("amount=>", amount, " min_amount=>", min_amount, " max_amount=>", max_amount)
    if (amount > max_amount) return false;
    else if (amount < min_amount) return true;
    else return null;
  };

  const updateSuggestions = () => {
    if (rates != null) {
      debugger;
      let giveAmount = giveamount.toString();
      let takeAmount = takeamount.toString();
      let give = givecurrency.split(" ")[0];
      let take = takecurrency.split(" ")[0];
      let g = rates.filter((x) => x.name == give)[0];
      let t = rates.filter((x) => x.name == take)[0];
      let givecuramm = g["rates"] / t["rates"];
      let takecuramm = t["rates"] / g["rates"];
      let amountgive = giveAmount.replaceAll(",", "");
      let amounttake = takeAmount.replaceAll(",", "");
      let takeout = takecuramm * 0.99 * amountgive;
      let takeoutshow = takecuramm * amountgive;
      // takeout = takeout.toFixed(0)
      let giveout = (givecuramm / 0.99) * amounttake;
      let giveoutshow = givecuramm * amounttake;
      setTakeSuggestion(takeoutshow.toLocaleString("en-US"));
      setGiveSuggestion(giveoutshow.toLocaleString("en-US"));
      // giveout = giveout.toFixed(0)
      setformatoutputGive(givecuramm.toLocaleString("en-US"));
      setformatoutput(takecuramm.toLocaleString("en-US"));
      setOutput(
        takeout.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      );
      setOutputGive(
        giveout.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      );
      return {
        giveSuggestion: giveout.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
        takeSuggestion: takeout.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }),
      };
    } else {
      return {
        giveSuggestion: "0",
        takeSuggestion: "0",
      };
    }
  };
  const getGiveSuggestions = () => {
    // debugger
    if (
      givecurrency != "" &&
      takecurrency != "" &&
      takeamount != "" &&
      givecurrency != null &&
      takecurrency != null &&
      takeamount != null
    ) {
      
      let suggestions = updateSuggestions();
      setShowTakeSuggestion(false);
      setShowGiveSuggestion(true);
      let giveCheck = checkAmountLength(giveamount, suggestions.giveSuggestion);
      setgiveLengtherr(giveCheck);
      settakelengtherr(null);
      setAmountSuretyerr("");
      setAmountSuretyerrGive(giveCheck == null ? "" : amountSuretyerrGive);
    }
  };
  const getTakeSuggestions = () => {
    if (
      givecurrency != "" &&
      takecurrency != "" &&
      giveamount != "" &&
      givecurrency != null &&
      takecurrency != null &&
      giveamount != null
    ) {
      let suggestions = updateSuggestions();
      setShowGiveSuggestion(false);
      setShowTakeSuggestion(true);
      let takeCheck = checkAmountLength(takeamount, suggestions.takeSuggestion);
      settakelengtherr(takeCheck);
      setgiveLengtherr(null);
      setAmountSuretyerr(takeCheck == null ? "" : amountSuretyerr);
      setAmountSuretyerrGive("");
    }
  };
  useEffect(() => {
    getGiveSuggestions();
  }, [giveamount]);

  useEffect(() => {
    getTakeSuggestions();
  }, [takeamount, rates]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="d-flex flex-column min-vh-100 mt-5">
      <div>
        <div id="startingDiv" className="">
          <Row className="centeritem">
            <Col md={props.is1FX || props.isHomeFX ? 10 : 6} className="formbg">
              <Form className="forminput radius createOrder">
                <h1
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "16px",
                    textAlign: "center",
                    marginTop: "-15px"
                  }}
                >
                  Create an order. Get Matching offers. Next you Finalize them after negotiation
                </h1>
                {!props.is1FX ? (
                  <Row
                    className="mb-2"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{ position: "absolute" }}
                        >
                          At your registered location
                        </Tooltip>
                      }
                      placement="top-start" // Set the placement to top-start
                    >
                      <h6 className="quickHeading fw8">Quick Order: </h6>
                    </OverlayTrigger>
                    <input
                      onClick={() => setisQuickOrder(!isQuickOrder)}
                      checked={isQuickOrder}
                      type={"checkbox"}
                      className="chkbox "
                    />
                  </Row>
                ) : null}
                <Model
                  hideModal={hideModal}
                  confirmModal={confirmModal}
                  showModal={showModal}
                />

                {/* <--------------------------------I Want to Give :--------------------> */}

                <GiveCurrencyForm
                  givecurrency={givecurrency}
                  setgivecurrency={setgivecurrency}
                  givecurrencyerr={givecurrencyerr}
                  giveamount={giveamount}
                  setgiveamount={setgiveamount}
                  getGiveSuggestions={getGiveSuggestions}
                  giveamounterr={giveamounterr}
                  outputGive={outputGive}
                  giveSuggestion={giveSuggestion}
                  formatoutputGive={formatoutputGive}
                  formatoutput={formatoutput}
                  handleAmountSuretyGive={handleAmountSuretyGive}
                  amountSuretyGive={amountSuretyGive}
                  amountSuretyerrGive={amountSuretyerrGive}
                  selectedcountry={selectedcountry}
                  setselectedcountry={setselectedcountry}
                  useselectedcity={useselectedcity}
                  setuseselectedcity={setuseselectedcity}
                  useselectedstate={useselectedstate}
                  setuseState={setuseState}
                  Countries={Countries}
                  giveStates={giveStates}
                  giveCities={giveCities}
                  error={error}
                  Cash={Cash}
                  setCash={setCash}
                  Bank={Bank}
                  setBank={setBank}
                  giveAssistance={giveAssistance}
                  setGiveAssistance={setGiveAssistance}
                  iseditORder={iseditORder}
                  mcOrderId={mcOrderId}
                  Currencies={Currencies}
                  setgiveamounterr={setgiveamounterr}
                  setgivecurrencyerror={setgivecurrencyerror}
                  stateArray={stateArray}
                  setError={setError}
                  setgiveCountryId={setgiveCountryId}
                  setgivestateId={setgivestateId}
                />
                {/* <--------------------------------I Want to Take :--------------------> */}
                <h6 className="fw8 mt-3 mb-3 relative">
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{ position: "absolute", marginLeft: "5px" }}
                      >
                        Buy/Send
                      </Tooltip>
                    }
                    placement="right"
                  >
                    <span style={{ cursor: "default" }}>I Want to Take</span>
                  </OverlayTrigger>
                </h6>

                <TakeCurrencyForm
                  setgiveselectedcountry={setgiveselectedcountry}
                  settakecurrencyerr={settakecurrencyerr}
                  setgiveuseState={setgiveuseState}
                  givecurrency={givecurrency}
                  setgiveuseselectedcity={setgiveuseselectedcity}
                  giveselectedcountry={giveselectedcountry}
                  setError={setError}
                  styles={styles}
                  Currencies={Currencies}
                  Countries={Countries}
                  takecurrency={takecurrency}
                  settakecurrency={settakecurrency}
                  takecurrencyerr={takecurrencyerr}
                  takeamount={takeamount}
                  settakeamount={settakeamount}
                  takelengtherr={takelengtherr}
                  output={output}
                  takeSuggestion={takeSuggestion}
                  formatoutput={"NaN"}
                  formatoutputGive={"NaN"}
                  takeCash={takeCash}
                  takeBank={takeBank}
                  takeAssistance={takeAssistance}
                  amountSurety={amountSurety}
                  amountSuretyerr={amountSuretyerr}
                  iseditORder={false} 
                  mcOrderId={null} 
                  error={error}
                  takeStates={takeStates}
                  takeCities={takeCities}
                  usegiveselectedcity={usegiveselectedcity}
                  usegiveselectedstate={usegiveselectedstate}
                  handletakeCashSource={handletakeCashSource}
                  handletakeBankSource={handletakeBankSource}
                  handletakeAssistance={handletakeAssistance}
                  handleAmountSurety={handleAmountSurety}
                  getTakeSuggestions={getTakeSuggestions}
                />
                {/* <--------------------------------Add Aditional Info--------------------> */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <h6 className="fw8 mt-4">Additional Information </h6>
                  <OverlayTrigger
                    overlay={
                      <Tooltip
                        id="tooltip-disabled"
                        bsPrefix="custom-tooltip"
                        style={{
                          position: "absolute",
                          maxWidth: "300px",
                          whiteSpace: "normal",
                          marginLeft: "5px",
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          If you are an individual, avoid disclosing your exact
                          location or house (for security purpose).
                        </p>
                      </Tooltip>
                    }
                    placement="right"
                  >
                    <img
                      src={Iicons}
                      style={{
                        width: "25px",
                        height: "25px",
                        marginTop: "12px",
                      }}
                    />
                  </OverlayTrigger>
                </div>
                <div className="border p-3 mt-3">
                  <AmountInput
                    AddAmount={AddAmount}
                    setAddAmount={setAddAmount}
                  />

                  <ExpiryDateInput
                    startDate={startDate}
                    setStartDate={setStartDate}
                    datedisable={datedisable}
                    setexpirytime={setexpirytime}
                    SetUntilGoodDate={SetUntilGoodDate}
                    maxDate={maxDate}
                    
                    
                  />
                  {props.is1FX && (
                    <LoginInformation
                      {...props}
                      styles={styles}
                      setEmailerror={setEmailerror}
                      setusernameerr={setusernameerr} 
                      setcountryerr={setcountryerr} 
                      renderTooltip={renderTooltip}
                    />
                  )}
                </div>
                {/* <--------------------------------Set Alerts--------------------> */}
                <OrderActions
                  isChecked={isChecked}
                  setIsChecked={setIsChecked}
                  docid={props.docid || []}
                  isLoading={isLoading}
                  isLoadingHold={isLoadingHold}
                  PutonHold={PutonHold}
                  Updatedoc={Updatedoc}
                  uid={uid}
                  activateBtn={activateBtn}
                  props={props}
                  ifFxSignup={ifFxSignup}
                  Activate={Activate}
                />
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container Rate-Date-Time">
        <div id="rate-date-time">
          The FX rates are as of:
          <span style={{ color: "#909090" }}>
            {" "}
            &nbsp;&nbsp; <i> {ddate} </i>
          </span>
          {/* &nbsp;&nbsp; Time : &nbsp; */}
          <span style={{ color: "#909090" }}>
            &nbsp;&nbsp; <i> {time} </i>
          </span>
        </div>
      </div>
    </div>
  );
}
export default CreateOrder;
