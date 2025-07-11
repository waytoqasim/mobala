"../../App.css";
import * as CryptoJS from "crypto-js";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip
} from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context";
import { apiHost } from "../../Helper";
import APIURLS from "../../apiurls";
import { default as cancel, default as Cencle } from "../../asstes/cancel.png";
import close from "../../asstes/close.svg";
import Iicons from "../../asstes/infobox.png";
import Location from "../../asstes/locattionbtn2.svg";
import Tick from "../../asstes/tick.svg";
import { apiInterceptor } from "../../service/ApiService";
import { Codes, dialCodes } from "../CountryCodes";
import { Cities as cityData } from "../newCountry";


function Profile(props) {
  const [fourthFileError, setFourthFileError] = useState("");
  const [secondFileError, setSecondFileError] = useState("");
  const [thirdFileError, setThirdFileError] = useState("");
  const form = useRef();
  const [uid, setUID] = useState(sessionStorage.getItem("UserID"));
  const [isLoading, setIsLoading] = useState(false);
  const [profileimagesource, setprofileimagesource] = useState("");
  const [imagesource2, setimagesource2] = useState([]);
  const [imagesource3, setimagesource3] = useState([]);
  const [imagesource4, setimagesource4] = useState([]);
  const [Countries, setCountries] = useState([]);
  const [States, setStates] = useState([]);
  const [Cities, setCities] = useState([]);
  const [mcCountries, setmcCountries] = useState([]);
  const [selectedcountry, setselectedcountry] = useState("");
  const [selectedcountryID, setselectedcountryID] = useState("");
  const [useselectedstate, setuseState] = useState("");
  const [useselectedcity, setuseselectedcity] = useState("");
  const [firstname, setFirstName] = useState("");
  const [middlename, setMiddleName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [checkemail, setcheckEmail] = useState(" ");
  const [mobilenumber, setMNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [UserName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [emailerr, setEmailerror] = useState("");
  const [passworderr, setPassworderror] = useState("");
  const [border, setborder] = useState(false);
  const [agreechecked, setagreeChecked] = useState(false);
  const [Picinpublic, setPicinpublic] = useState(false);
  const [IDinpublic, setIDinpublic] = useState(false);
  const [passcheck, setpasscheck] = useState("");
  const [agreeerr, setagreeerr] = useState("");
  const [usernameerr, setusernameerr] = useState("");
  const [firstnameerr, setfirsnameerr] = useState("");
  const [lastnameerr, setlastnameerr] = useState("");
  const [iderr, setiderr] = useState("");
  const [numerr, setnumerr] = useState("");
  const [cityerr, setcityerr] = useState("");
  const [stateerr, setstateerr] = useState("");
  const [locationerr, setLocationerr] = useState("");
  const [countryerr, setcountryerr] = useState("");
  const [geolocation, setgeolocation] = useState("");
  const [geoaddress, setgeoaddress] = useState("");
  const [othercountrycode, setothercountrycode] = useState("");
  const [checkcode, setcheckcode] = useState(" ");
  const [Verifycode, setverifycode] = useState("");
  const [showform, setshowform] = useState(false);
  const [emailverify, setemailverify] = useState(false);
  const [countrycode, setcountrycode] = useState("");
  const [type, settype] = useState("password");
  const [type1, settype1] = useState("password");
  const [Profession, setProfession] = useState("");
  const [isProfessionPublic, setisProfessionPublic] = useState(false);
  const [isPhoneNumberPublic, setisPhoneNumberPublic] = useState(false);
  const [isWebsitePublic, setisWebsitePublic] = useState(false);
  const [isAddressPublic, setisAddressPublic] = useState(false);
  const [verifiedcode, setverifiedcode] = useState(" ");
  const [profiledisc, setprofiledisc] = useState("");
  const [iddisc, setiddisc] = useState("");
  const [docdisc, setdocdisc] = useState("");
  const [secdocdisc, setsecdocdisc] = useState("");
  const [firstDocPublic, setFirstDocPublic] = useState(false);
  const [secondDocPublic, setSecondDocPublic] = useState(false);
  const [thirdDocPublic, setThirdDocPublic] = useState(false);
  const [radiocheck, setradiocheck] = useState({
    Individual: true,
    Corporation: false,
  });
  const [isMC, setisMC] = useState(false);
  const [isBank, setisBank] = useState(false);
  const [isMCPrime, setisMCPrime] = useState(false);
  const [isMcprimeAuth, setisMcprimeAuth] = useState(false);
  const [isMCPrimeLicenses, setisMCPrimeLicenses] = useState(false);
  const [licenseText, setLicenseText] = useState("");
  const [selectedCountiresText, setSelectedCountiresText] = useState([]);
  const [firstFile, setFirstFile] = useState("");
  const [secondFile, setSecondFile] = useState("");
  const [thirdFile, setThirdFile] = useState("");
  const [fourthFile, setFourthFile] = useState("");
  const [isFX1User, setisFX1User] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [userID, setuserID] = useState("");

  ////////////////////
  // const [isMCIndividual, setisMCIndividual] = useState(true);
  // const [isMCCorporation, setisMCCorporation] = useState(false);

  // FOUZ's States
  const [settlementServices, setSettlementServices] = useState(false);
  const [settlementFees, setSettlementFees] = useState("0");
  const [freeSettlement, setFreeSettlement] = useState(true);
  // FOUZ's States End

  ////////////////////////

  const [currencyCode, setCurrencyCode] = useState("");
  const [currencyCodes, setCurrencyCodes] = useState([]);
  ////////////////////////

  const [list, setlist] = useState({});
  const navigate = useNavigate();
  const [Uid, setUid] = useState(sessionStorage.getItem("UserID"));
  const context = useContext(AppContext);

  // useEffect(() => {
  //  if(isMCPrime){
  //   navigate("/McPrime");
  //  }
    
  // }, [isMCPrime]);
  

  useEffect(() => {
    window.scrollTo(0, 100);
    document
      .getElementById("startingDiv")
      .scrollIntoView({ behavior: "auto", block: "start" });
  }, []);

  const Getdata = async () => {
    let url = `${apiHost}/api/User/GetUserByIdForEdit?UserId=${Uid}`;
    apiInterceptor
      .get(APIURLS.USERS.GETUSERBYIDFOREDIT(uid))
      .then(async (docSnap) => {
        const data = { ...docSnap.data };
        const images = [
          data.user.profileimagepath,
          data.user.idimage,
          data.user.documentImage,
          data.user.endDocumentImage,
        ];
        for (let i = 0; i < images.length; i++) {
          if (images[i] == "" || images[i] == null) {
            let name = `image${i}`;
            data.user[name] = "";
          } else {
            let name = `image${i}`;
            data.user[name] = apiHost + "/Images/" + images[i];
          }
        }
        // console.log(data.user["areYouan"]);
        let isCorp = data.user["areYouan"] === "Corporation";
        setradiocheck(
          isCorp
            ? { Individual: false, Corporation: true }
            : { Individual: true, Corporation: false }
        );
        // setradiocheck({data?.user?.areYouan=="Corporation"?
        //   Corporation: true:Individual: true,})
        setlist(data);
        // console.log("BRRRRRRRRRRR--------DATAAAAAAAAAAAAAAAAAAAA", data);
      });
  };

  useEffect(() => {
    if (Object.keys(list).length !== 0) {
      const { user } = list;
  
      // Set general user info
      setFirstName(user.firstName);
      setMiddleName(user.middleName);
      setLastName(user.lastName);
      setMNumber(user.mobilenumber || "");
      setPhoneNumber(user.phoneNumber || "");
      setothercountrycode(user.phoneCode || "");
      setcountrycode(user.mobileCode);
      setEmail(user.email);
      setcheckEmail(user.email);
      setUsername(user.userName);
      setselectedcountry(user.country || user.AutoCountry);
      setuseState(user.province || user.AutoState);
      setuseselectedcity(user.city || user.AutoCity);
      setgeoaddress(user.location || user.AditionalAddress);
      setAddress(user.aditionalAddress);
      setProfession(user.profession || "");
      setWebsite(user.website || "");
      setprofileimagesource(user.image0 || "");
      setimagesource2(user.image1 || "");
      setimagesource3(user.image2 || "");
      setimagesource4(user.image3 || "");
  
      // Set profile description, docs, and settlement info
      setprofiledisc(user.profileDescription);
      setdocdisc(user.documentDescription);
      setsecdocdisc(user.secondDocumentDescription);
      setiddisc(user.idDescription);
      setSettlementServices(user.settlementServices);
      setSettlementFees(user.settlementFees);
      setCurrencyCode(user.settlementFees.split(",")[1]);
      setFreeSettlement(user.settlementFees == 0);
  
      // Public settings
      setPicinpublic(user.picAvailability);
      setisProfessionPublic(user.isProfessionPublic);
      setisAddressPublic(user.isAddressPublic);
      setisWebsitePublic(user.isWebsitePublic);
      setisPhoneNumberPublic(user.areNumbersPublic);
  
      // Document visibility
      setFirstDocPublic(user.isFirstDocumentPublic ?? false);
      setSecondDocPublic(user.isSecondDocumentPublic ?? false);
      setThirdDocPublic(user.isThirdDocumentPublic ?? false);
  
      // Set user profile features
      setisMC(user.isMc);
      setisBank(user.isBank);
      setisMCPrime(user.isMcPrime);
      setisMcprimeAuth(user.isMcprimeAuthenticated);
      setisMCPrimeLicenses(user.isMCPrimeLicenses);
      setLicenseText(user.mcLicense || "");
  
      // Set selected countries for MC
      const mcCountries = user.mcCountries
        ? user.mcCountries.split(",").filter((country) => country.trim() !== "")
        : [];
      setSelectedCountiresText(mcCountries);
  
      // Set document paths
      setFirstFile(user.profileimagepath?.split("~")[1] || "");
      setSecondFile(user.idimage?.split("~")[1] || "");
      setThirdFile(user.documentImage?.split("~")[1] || "");
      setFourthFile(user.endDocumentImage?.split("~")[1] || "");
  
      // Set security info
      setPassword("**********");
      setConfirmPassword("**********");
  
      // Set government ID info
      setselectedcountryID(user.countrywhereGovernmentIdissued);
  
      // Set agree checked state
      setagreeChecked(props.editProfile || false);
      
      // Set verification defaults
      setverifycode("0000");
      setcheckcode("0000");
      setemailverify(true);
    }
  }, [list]);
  

  useEffect(() => {
    const countryData = Codes.find((country) => country[0] === selectedcountry);
    if (countryData != undefined) {
      if (countryData[2] === "-") {
        setCurrencyCode(countryData[1]);
      } else {
        setCurrencyCode(countryData[2]);
      }
    } else {
      setCurrencyCode("");
    }
  }, [selectedcountry]);
  const [setle, setSetle] = useState()
  useEffect(() => {
    let updatedCurrencyCode = "";

    // Ensure settlementFees is treated as a string and check if it includes a comma
    if (typeof settlementFees === "string" && settlementFees.includes(",")) {
      const settlementCode = settlementFees.split(",")[1];
      setSetle(settlementFees.split(",")[0])

      if (settlementCode) {
        console.log(settlementCode)
        updatedCurrencyCode = settlementCode;
        setCurrencyCode(updatedCurrencyCode);
        console.log(updatedCurrencyCode)
      }
    }
  }, [settlementFees]);

  const updatepass = () => {
    //const myString = currentpass;
    if (password != "**********") {
      if (password == confirmpassword) {
        const hash = CryptoJS.MD5(password);

        let url = `${apiHost}/api/Authentication/UpdatePassword?ID=${Uid}&password=${confirmpassword}`;
        apiInterceptor
          .post(APIURLS.AUTHENTICATION.UPDATEPASSWORD(Uid,confirmpassword))
          .then((response) => { })
          .catch((error) => {
            //console.log(error.text);
          });
      }
    }
  };

  useEffect(() => {
    if (props.editProfile != undefined && props.editProfile == true) {
      //console.log("========== Checking Is Editing Profile =============== ");
      Getdata();
    } else {
      var queryString = window.location.search;
      if (queryString.length > 0) {
        let urlParams = new URLSearchParams(queryString);
        let encodedString = urlParams.get("data");
        let jsonString = decodeURIComponent(encodedString);
        let myObject = JSON.parse(jsonString);
        setisFX1User(true);
        setEmail(myObject["email"]);
        setuserID(myObject["userId"]);
        document.getElementById("codebutton").className = "btnverifygreyed";
        document.getElementById("codebutton").innerHTML = "Verified";
        setUsername(myObject["userName"]);
      }
    }
  }, [null]);

  // useEffect(() => {
  //   let url = `${apiHost}/api/User/GetUsers`;
  //   axios.get(url).then((response) => {
  //     let USerNameLIst = [];
  //     response.data.forEach((dd) => {
  //       if (dd.id != "admin") {
  //         dd = JSON.parse(dd);
  //         let userName = dd.UserName.toLowerCase();
  //         USerNameLIst.push(userName);
  //       }
  //     });
  //     setuserNameList(USerNameLIst);
  //   });
  // }, [null]);

  //
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  function generateKeyPair() {
    const nacl = require("tweetnacl");
    const { publicKey, secretKey } = nacl.box.keyPair();
    const publicKeyStr = btoa(
      String.fromCharCode(...new Uint8Array(publicKey))
    );
    const privateKeyStr = btoa(
      String.fromCharCode(...new Uint8Array(secretKey))
    );
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    return { publicKey: publicKeyStr, privateKey: privateKeyStr };
  }
  function handleagreeClick() {
    setagreeChecked(!agreechecked);
  }
  function handlePicinPublic() {
    setPicinpublic(!Picinpublic);
  }
  function handleIDinPublic() {
    setIDinpublic(!IDinpublic);
  }
  const changetype = async () => {
    settype("input");
  };
  const changetypepass = async () => {
    settype("password");
  };
  const changetype1 = async () => {
    settype1("input");
  };
  const changetypepass1 = async () => {
    settype1("password");
  };

  const styles = {
    err: {
      borderColor: "red",
      borderWidth: "1px",
      fontStyle: "italic",
    },
    upload: {
      display: "none",
    },
    btntextt: {
      color: "#616161",
      fontSize: "14px",
    },
    btnwidth: {
      width: "140px ",
    },
    show: {
      display: "block",
    },
    showsent: {
      display: "block",
      color: "green",
      marginBottom: "10px",
    },
    hide: {
      display: "none",
    },
  };
  ////////////////////////Location and COuntry/////////////////////////

  useEffect(() => {
    if (cityData.length != 0) {
      getCountry();
    }
  }, [null]);

  const getCountry = () => {
    let countries = cityData.map((d) => d.country);
    countries = [...new Set(countries)];
    countries = countries.sort();
    setCountries(countries);
  };

  useEffect(() => {
    if (!props.editProfile) {
      getlocation().then((d) => {
        setselectedcountry(d.results[0].country);
      });
    }
  }, [Countries]);

  useEffect(() => {
    //console.log("country changed");
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
    setStates(states);
  };

  useEffect(() => {
    if (!props.editProfile) {
      if (geolocation != "") {
        setuseState(geolocation.results[0].state);
      }
    }
  }, [States]);

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
    setCities(cities);
  };

  useEffect(() => {
    if (geolocation && geolocation != "") {
      if (Cities.includes(geolocation.results[0].city))
        setuseselectedcity(geolocation.results[0].city);
    }
  }, [Cities]);
  ///////////////////////////////////////////////////////////////////////////
  const getlocation = () => {
    return new Promise((resolve, reject) => {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state == "granted" || result.state == "prompt") {
            setselectedcountry("");
            setuseState("");
            setuseselectedcity("");
            navigator.geolocation.getCurrentPosition(function (position) {
              fetch(
                `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=21f61a865243443b8b07654137eadc62`,
                { method: "GET" }
              )
                .then((res) => res.json())
                .then((data) => {
                  setgeolocation(data);
                  //console.log(data);
                  resolve(data);
                })
                .catch((err) => console.log(err));
            });
          } else {
            setLocationerr("This website wants to know your location");
            alert("Please allow location access in your browser settings.");
            // setTimeout(() => {
            //   setLocationerr("");
            // }, 3000);
          }
        });
    });
  };

  function geoerror() {
    if (geolocation && geolocation != "") {
      setgeoaddress(
        geolocation.results[0].address_line1 +
        ", " +
        geolocation.results[0].address_line2
      );
      // setTimeout(() => {
      // }, 1000);
    }
  }

  const checkMobileValid = () => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://api.numlookupapi.com/v1/validate/${countrycode + mobilenumber
        }?apikey=6GTUdjOMNEledmZm14LpHS7wvhwMUJZu4PyaNqZI`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then(async (data) => {
          if (
            (data.message =
              "You used all your monthly requests. Please upgrade…plan at https://app.numlookupapi.com/subscription")
          ) {
            resolve(true);
          } else {
            resolve(data.valid);
          }
        });
    });
  };

  useEffect(() => {
    geoerror();
  }, [geolocation]);

  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const addUser = async () => {
    document.getElementById("submitButton").disabled = true;
    setIsLoading(true);
    let isMobileValid = false;
    let isUserName = false;
    let errCount = 0;
    let selectedCountiresTextFromArray = "";
    for (let i = 0; i < selectedCountiresText.length; i++) {
      selectedCountiresTextFromArray =
        selectedCountiresTextFromArray + selectedCountiresText[i];
      if (i != selectedCountiresText.length - 1) {
        selectedCountiresTextFromArray = selectedCountiresTextFromArray + ",";
      }
    }
    if (mobilenumber != "") {
      isMobileValid = await checkMobileValid();
    }
    if (UserName != "") {
      isUserName = await checkUserName();
    }
    if (geolocation == "") {
      setLocationerr("Missing Field");
      document.getElementById("root").scroll(0, 0);
      document.getElementById("location").focus();
      errCount += 1;
    }
    if (selectedcountry == "") {
      setcountryerr("Missing Field");
      document.getElementById("root").scroll(0, 0);
      document.getElementById("country").focus();
      errCount += 1;
    }
    if (useselectedstate == "") {
      setstateerr("Missing Field");
      document.getElementById("root").scroll(0, 0);
      document.getElementById("state").focus();
      errCount += 1;
    }
    if (useselectedcity == "") {
      setcityerr("Missing Field");
      document.getElementById("root").scroll(0, 0);
      document.getElementById("city").focus();
      errCount += 1;
    }
    if (email.length === 0) {
      setEmailerror("Missing Field");
      document.getElementById("root").scroll(0, 500);
      document.getElementById("email").focus();
      errCount += 1;
    }
    if (emailverify === false) {
      setEmailerror("Email is not verified");
      document.getElementById("root").scroll(0, 500);
      document.getElementById("verificationCode").focus();
      errCount += 1;
    }
    if (Verifycode != checkcode) {
      document.getElementById("root").scrollTo(0, 500);
      errCount += 1;
    }
    if (password.length === 0) {
      setPassworderror("Missing Field");
      document.getElementById("root").scroll(0, 500);
      document.getElementById("password").focus();
      errCount += 1;
    }
    if (password != confirmpassword) {
      document.getElementById("passmatch").style.display = "inline";
      document.getElementById("root").scroll(0, 500);
      document.getElementById("confirmPassword").focus();
      errCount += 1;
    }
    if (password.length < 7) {
      setPassworderror(
        "Password must be 7 or more characters in length and minimum 1 special character"
      );
      document.getElementById("root").scroll(0, 500);
      document.getElementById("password").focus();
      errCount += 1;
    }
    if (UserName == "") {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("userName").focus();

      setusernameerr("Missing Field");
      errCount += 1;
    }
    if (
      UserName.toLowerCase().includes("mobala") ||
      UserName.toLowerCase().includes("admin")
    ) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("userName").focus();

      setusernameerr(`Username cannot include ${UserName}`);
      errCount += 1;
    }
    if (UserName.length > 12) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("userName").focus();
      document.getElementById("takenlenerr").style.display = "block";
      errCount += 1;
    }
    if (isUserName) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("userName").focus();
      document.getElementById("takenerr").style.display = "block";
      errCount += 1;
    }
    if (
      firstname.toLowerCase().includes("mobala") ||
      firstname.toLowerCase().includes("admin")
    ) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("firstName").focus();

      setfirsnameerr(`firstName cannot include ${UserName}`);
      errCount += 1;
    }
    if (firstname.length === 0) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("firstName").focus();

      setfirsnameerr("Missing Field");
      errCount += 1;
    }
    if (lastname.length === 0) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("lastName").focus();

      setlastnameerr("Missing Field");
      errCount += 1;
    }
    if (selectedcountryID === "") {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("countryID").focus();
      setiderr("Missing Field");
      errCount += 1;
    }
    if (mobilenumber === "") {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("mobileNumber").focus();

      setnumerr("Missing Field");
      errCount += 1;
    }
    if (!isMobileValid) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("mobileNumber").focus();

      setnumerr("Enter a valid mobile Number");
      errCount += 1;
    }
    if (agreechecked !== true) {
      setagreeerr(" ");
      document.getElementById("root").scroll(0, 500);
      document.getElementById("agreeCheck").focus();
      errCount += 1;
    }
    if (!format.test(password)) {
      setPassworderror("Password must contains at least 1 special characters");
      document.getElementById("root").scroll(0, 500);
      document.getElementById("password").focus();
      errCount += 1;
    }
    if (errCount == 0) {
      const { publicKey, privateKey } = generateKeyPair();
      document.getElementById("submitButton").disabled = true;
      let url = `${apiHost}/api/Authentication/SignUp`;
      let profileimagepath = "";
      let firstdocpath = "";
      let seconddocpath = "";
      let thirddocpath = "";
      if (profileimagesource.length != 0) {
        profileimagepath = firstFile + "," + profileimagesource;
      }
      if (imagesource2.length != 0) {
        firstdocpath = secondFile + "," + imagesource2;
      }
      if (imagesource3.length != 0) {
        seconddocpath = thirdFile + "," + imagesource3;
      }
      if (imagesource4.length != 0) {
        thirddocpath = fourthFile + "," + imagesource4;
      }
      let data = {
        Email: email.toLocaleLowerCase(),
        pwd: password,
        PublicKey: publicKey,
        privateKey: privateKey,
        FirstName: firstname,
        MiddleName: middlename,
        LastName: lastname,
        Mobilenumber: mobilenumber,
        MobileCode: countrycode,
        PhoneCode: othercountrycode,
        phoneNumber: phoneNumber,
        UserName: UserName,
        Country: selectedcountry,
        Province: useselectedstate,
        City: useselectedcity,
        CountrywhereGovernmentIDIssued: selectedcountryID,
        Website: website,
        Profession: Profession,
        isProfessionPublic: isProfessionPublic,
        isWebsitePublic: isWebsitePublic,
        firstDocPublic: firstDocPublic,
        secondDocPublic: secondDocPublic,
        thirdDocPublic: thirdDocPublic,
        areNumbersPublic: isPhoneNumberPublic,
        isAddressPublic: isAddressPublic,
        Image: profileimagepath,
        IDImage: firstdocpath,
        DocumentImage: seconddocpath,
        EndDocumentImage: thirddocpath,
        ProfileDiscription: profiledisc,
        DocumentDiscription: docdisc,
        SecondDocumentDiscription: secdocdisc,
        PicAvailability: Picinpublic,
        isMC: isMC,
        isBank: isBank,
        isMCPrime: isMCPrime,
        // isMCPrimeLicense: isMCPrimeLicenses,
        McLicense: licenseText,
        McCountries: selectedCountiresTextFromArray,
        AreYouan: radiocheck,
        AditionalAddress: address,
        Location: geoaddress,
        EditedLocatin: "",
        ReviewScore: 3,
        LastMsg: "",
        Lastinvites: "",
        Reviewedusers: {},
        invites: {},
        isWelcome: false,
        Online: false,
        status: true,
        isMute: false,
        reports: 0,
        reportedUsers: [],
        favList: [],
        ordersCount: 0,
        ordersCompleted: 0,
        date: new Date().toLocaleString(),
        settlementServices: settlementServices,
        settlementFees: settlementFees,
      };
      // console.log("Testing", data);
      apiInterceptor
        .post(APIURLS.AUTHENTICATION.SIGNUP, data)
        .then((response) => {
          if (response.data.split(" ")[0] == "SignedUp") {
            window.location.href = `/`;
          }
        })
        .catch((error) => {
          //console.log(error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      document.getElementById("submitButton").disabled = false;
    }
  };

  //=============================Update ID========================

  const changeRadio = (e) => {
    setradiocheck({
      Individual: e.target.value === "Individual",
      Corporation: e.target.value === "Corporation",
    });
  };

  const renderTooltip = (props) => (
    <Tooltip
      id="button-tooltip"
      bsPrefix="custom-tooltip"
      style={{ position: "absolute" }}
      {...props}
    >
      Click Verify and check your email to verify account
    </Tooltip>
  );

  const showerr = () => {
    if (password.length < 7) {
      document.getElementById("passlength").style.display = "inline";
    } else {
      document.getElementById("passlength").style.display = "none";
    }

    if (!format.test(password)) {
      document.getElementById("passspecial").style.display = "inline";
    } else {
      document.getElementById("passspecial").style.display = "none";
    }
  };

  const hideerr = () => {
    if (password.length > 7) {
      document.getElementById("passlength").style.display = "none";
    }
    if (format.test(password)) {
      document.getElementById("passspecial").style.display = "none";
    }
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
            // setTimeout(() => {
            //   setEmailerror("");
            // }, 5000);
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
                // setTimeout(() => {
                //   document.getElementById("emailcheck").style.display = "none";
                // }, 6000);
              } else {
                let url = `${apiHost}/api/Email/SendVerificationEmail?toEmail=${email}&code=${val}`;
                apiInterceptor
                  .post(APIURLS.EMAIL.SENDVERIFICATIONEMAIL(email,val))
                  .then(async (response) => {
                    setshowform(true);
                    setcheckEmail(email);

                    document.getElementById("codebutton").style.display =
                      "none";
                    document.getElementById("sendcodemsg").style.display =
                      "block";
                    // setTimeout(() => {
                    //   document.getElementById("sendcodemsg").style.display = "none";
                    // }, 6000);
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
      apiInterceptor.get(APIURLS.USERS.ISUSERNAMEEXISTS(UserName))
      .then(async (response) => {
        if (response.data) {
          document.getElementById("takenerr").style.display = "block";
        } else {
          document.getElementById("takenerr").style.display = "none";
        }
        
        resolve(response.data);
      });
    });
  };

  const Checkemail = async () => {
    return new Promise((resolve, reject) => {
      let Email = email.toLowerCase();
      let url = `${apiHost}/api/User/EmailExist?email=${Email}`;
      apiInterceptor.get(APIURLS.USERS.ISEMAILEXISTS(Email))
      .then(async (response) => {
        resolve(response.data);
      });
    });
  };

  const checkMobile = async () => {
    let url = `${apiHost}/api/User/GetUserByNumber?Number=${mobilenumber}`;
    apiInterceptor.get(APIURLS.USERS.MOBILENUMBER(mobilenumber)).then(async (response) => {
      const data = [];
      response.data.map((doc) => {
        data.push({
          ...doc,
          id: doc.id,
          Mobilenumber: doc.mobilenumber,
        });
      });
      if (data.length >= 1) {
        document.getElementById("mobileAlready").style.display = "block";
      } else {
        document.getElementById("mobileAlready").style.display = "none";
      }
    });
  };

  useEffect(() => {
    if (checkcode != Verifycode && checkcode.length > 1) {
      document.getElementById("codeerr").style.display = "block";
    } else {
      document.getElementById("codeerr").style.display = "none";
    }
  }, [checkcode]);

  useEffect(() => {
    if (checkcode == Verifycode && checkemail === email) {
      setverifiedcode(checkcode);
      setborder(true);
      setemailverify(true);
      setshowform(false);
      // document.getElementById("email").disabled = true;
    } else {
      setemailverify(false);
      setborder(false);
    }
  }, [checkcode, Verifycode, email, verifiedcode]);
  useEffect(() => {
    if (isMC == true) {
      document.getElementById("mcprime").style.display = "flex";
      document.getElementById("mcprimeLicenses").style.display = "flex";
      document.getElementById("mcprimeCountries").style.display = "flex";
      document.getElementById("settlementDiv").style.display = "block";
    } else if (isMC == false) {
      setisMCPrime(false);
      setisMCPrimeLicenses(false);
      document.getElementById("mcprime").style.display = "none";
      document.getElementById("mcprimeLicenses").style.display = "none";
      document.getElementById("mcprimeCountries").style.display = "none";
      document.getElementById("settlementDiv").style.display = "none";
    }

    // console.log("brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", Codes);
  }, [isMC]);

  const checkPassword = () => {
    return new Promise((resolve, reject) => {
      let url = `${apiHost}/api/Authentication/CheckPassword?userID=${userID}&password=${password}`;
      apiInterceptor
        .get(APIURLS.AUTHENTICATION.CHECKPASSWORD(userID,password))
        .then((response) => {
          if (response.data == false) {
            setPassworderror("Password is incorrect");
          } else {
            setPassworderror("");
          }
          resolve(response.data);
        });
    });
  };

  const updateUser = async () => {
    document.getElementById("submitButton").disabled = true;
    setIsLoading(true);
    let isMobileValid = false;
    let passworderr = false;
    let errorCount = 0;
    let selectedCountiresTextFromArray = "";
    for (let i = 0; i < selectedCountiresText.length; i++) {
      selectedCountiresTextFromArray =
        selectedCountiresTextFromArray + selectedCountiresText[i];
      if (i != selectedCountiresText.length - 1) {
        selectedCountiresTextFromArray = selectedCountiresTextFromArray + ",";
      }
    }
    if (mobilenumber != "") {
      isMobileValid = await checkMobileValid();
    }
    if (isFX1User) {
      passworderr = await checkPassword();
    }
    if (selectedcountry == "") {
      setcountryerr("Missing Field");
      document.getElementById("root").scroll(0, 0);
      document.getElementById("country").focus();
      errorCount += 1;
    }
    if (useselectedstate == "") {
      setstateerr("Missing Field");
      document.getElementById("root").scroll(0, 0);
      document.getElementById("state").focus();
      errorCount += 1;
    }
    if (useselectedcity == "") {
      setcityerr("Missing Field");
      document.getElementById("root").scroll(0, 0);
      document.getElementById("city").focus();
      errorCount += 1;
    }

    if (passworderr == "Password is incorrect") {
      document.getElementById("root").scroll(0, 500);
      document.getElementById("password").focus();
      errorCount += 1;
    }
    if (
      firstname.toLowerCase().includes("mobala") ||
      firstname.toLowerCase().includes("admin")
    ) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("firstName").focus();

      setfirsnameerr(`firstName cannot include ${UserName}`);
      errorCount += 1;
    }
    if (firstname.length === 0) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("firstName").focus();

      setfirsnameerr("Missing Field");
      errorCount += 1;
    }
    if (lastname.length === 0) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("lastName").focus();

      setlastnameerr("Missing Field");
      errorCount += 1;
    }
    if (selectedcountryID === "") {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("countryID").focus();
      setiderr("Missing Field");
      errorCount += 1;
    }
    if (mobilenumber === "") {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("mobileNumber").focus();

      setnumerr("Missing Field");
      errorCount += 1;
    }
    if (!isMobileValid) {
      document.getElementById("root").scrollTo(0, 820);
      document.getElementById("mobileNumber").focus();

      setnumerr("Enter a valid mobile Number");
      errorCount += 1;
    }
    if (agreechecked !== true) {
      setagreeerr(" ");
      document.getElementById("root").scroll(0, 500);
      document.getElementById("agreeCheck").focus();

      errorCount += 1;
    }
    if (errorCount == 0) {
      let profileimagepath = profileimagesource.includes(apiHost)
        ? profileimagesource.split("Images/")[1]
        : "";
      let firstdocpath = imagesource2.includes(apiHost)
        ? imagesource2.split("Images/")[1]
        : "";
      let seconddocpath = imagesource3.includes(apiHost)
        ? imagesource3.split("Images/")[1]
        : "";
      let thirddocpath = imagesource4.includes(apiHost)
        ? imagesource4.split("Images/")[1]
        : "";
      let profileimageBase64 = "";
      let firstdocBase64 = "";
      let seconddocBase64 = "";
      let thirddocBase64 = "";
      if (
        !profileimagesource.includes(apiHost) &&
        profileimagesource.length != 0
      ) {
        profileimagepath = Uid + "~" + firstFile;
        profileimageBase64 = profileimagesource;
      }
      if (!imagesource2.includes(apiHost) && imagesource2.length != 0) {
        firstdocpath = Uid + "~" + secondFile;
        firstdocBase64 = imagesource2;
      }
      if (!imagesource3.includes(apiHost) && imagesource3.length != 0) {
        seconddocpath = Uid + "~" + thirdFile;
        seconddocBase64 = imagesource3;
      }
      if (!imagesource4.includes(apiHost) && imagesource4.length != 0) {
        thirddocpath = Uid + "~" + fourthFile;
        thirddocBase64 = imagesource4;
      }
      let obj = {
        ID: Uid,
        Website: website,
        AditionalAddress: address,
        Profession: Profession,
        FirstName: firstname,
        MiddleName: middlename,
        LastName: lastname,
        Mobilenumber: mobilenumber,
        UserName: UserName,
        Country: selectedcountry,
        Province: useselectedstate,
        City: useselectedcity,
        PhoneNumber: phoneNumber,
        Image: profileimagepath,
        IDImage: firstdocpath,
        DocumentImage: seconddocpath,
        EndDocumentImage: thirddocpath,
        Location: geoaddress,
        IsAddressPublic: isAddressPublic,
        IsWebsitePublic: isWebsitePublic,
        IsProfessionPublic: isProfessionPublic,
        AreNumbersPublic: isPhoneNumberPublic,
        IsThirdDocumentPublic: thirdDocPublic,
        IsSecondDocumentPublic: secondDocPublic,
        IsFirstDocumentPublic: firstDocPublic,
        ImageBase64: profileimageBase64,
        IDImageBase64: firstdocBase64,
        DocumentImageBase64: seconddocBase64,
        EndDocumentImageBase64: thirddocBase64,
        CountrywhereGovernmentIDIssued: selectedcountryID,
        PhoneCode: othercountrycode,
        MobileCode: countrycode,
        IsMC: isMC,
        isBank: isBank,
        IsMCPrime: isMCPrime,
        mcLicense: licenseText,
        mcCountries: selectedCountiresTextFromArray,
        ProfileDescription: iddisc,
        DocumentDescription: docdisc,
        SecondDocumentDescription: secdocdisc,
        IdDescription: iddisc ?? "",
        PicAvailability: Picinpublic,
        AreYouan: radiocheck.Individual ? "Individual" : "Corporation",
        EditedLocatin: geolocation,
        ProfileDescription: profiledisc,
        DocumentDescription: docdisc,
        SecondDocumentDescription: secdocdisc,
        SettlementServices: settlementServices,
        SettlementFees:
          typeof settlementFees === "string" ?
            settlementFees.split(",").length > 1
              ? settlementFees
                .split(",")
                .map((val, index) => (index === 1 ? currencyCode : val))
                .join(",")
              : `${settlementFees},${currencyCode}` : setle,
      };
      if (!isMCPrime) {
        obj["IsMcprimeAuthenticated"] = false;
      } else {
        obj["IsMcprimeAuthenticated"] = isMcprimeAuth;
      }
      let url = `${apiHost}/api/User/UpdateUser`;
      apiInterceptor
        .post(APIURLS.USERS.USERUPDATE, obj )
        .then((docSnap) => {
          ////to be updated later
          updatepass();
          context.dispatch({
            Type: "PERMISSION",
            Payload: {
              isMc: obj.IsMC,
              isMcprime: obj.IsMCPrime,
              isMcprimeAuthenticated:
                docSnap.data.user.isMcprimeAuthenticated === null
                  ? false
                  : docSnap.data.user.isMcprimeAuthenticated,
            },
          });
          context.dispatch({ Type: "NAVIGATION" });
          sessionStorage.setItem("settingProfilePic", [
            obj.Image + "," + obj.UserName,
          ]);
          // console.log(obj.Image,obj.UserName)
          if (isFX1User) {
            navigate("/");
          }
          navigate(`/OrderCom?ID=${uid}&t=${Date.now()}`);
        })
        .catch((error) => {
          document.getElementById("submitButton").disabled = false;
          setIsLoading(false);
          console.log(error);
        });
    } else {
      document.getElementById("submitButton").disabled = false;
      setIsLoading(false);
    }
  };

  const deactivate = async () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
    setShowModalDelete(false);
  };

  const confirmModal = async () => {
    //console.log("MyAccountDelete", list);
    let obj = {};
    let url = `${apiHost}/api/Authentication/DeleteAccount?ID=${Uid}`;
    apiInterceptor
      .post(APIURLS.USERS.DELETEACCOUNT(Uid), obj)
      .then((response) => {
        if (response.data == true) {
          window.location.href = "/";
        } else {
          alert("Someting went wrong!");
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const DeleteAccount = async () => {
    setShowModalDelete(true);
  };

  const confirmHibernate = async () => {
    //console.log("MyAccountHibernate", list);
    let obj = {};
    let url = `${apiHost}/api/Authentication/HibernateAccount?ID=${Uid}`;
    apiInterceptor
      .post(APIURLS.USERS.HIBERNATEACCOUNT(Uid), obj)
      .then((response) => {
        if (response.data == true) {
          window.location.href = "/";
        } else {
          alert("Someting went wrong!");
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  // useEffect(() => { //console.log(profileImageSrc) }, [profileImageSrc])

  const profileTrash = () => {
    setFirstFile("");
    setprofileimagesource("");
  };

  const handleCountryChange = (e) => {
    const country = e.target.value.trim();
    if (country === "") {
      return;
    }
    if (mcCountries.length < 5 && !mcCountries.includes(country)) {
      setmcCountries([...mcCountries, country]);
      let x = selectedCountiresText;
      x.push(country);
      setSelectedCountiresText(x);
    }
    if (selectedCountiresText.every((newCountry) => newCountry.trim() === "")) {
      setSelectedCountiresText([]);
    }
  };

  const removeCountryOfService = (index) => {
    //console.log(index);
    let x = [...selectedCountiresText];
    // x.pop(name);
    x.splice(index, 1);
    //console.log(x);
    setSelectedCountiresText(x);
    setmcCountries(x);
  };

  return (
    <Row id="startingDiv" className="centeritem">
      <Col md={6} className={props.editProfile ? "formbg mt-5" : "formbg mt-0"}>
        <Modal
          show={showModalDelete}
          onHide={hideModal}
          size="md"
          style={{ marginTop: "70px" }}
        >
          <Modal.Header>
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: "17px" }}>
              Are you sure you want to delete your account?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="default"
              style={{ width: "20%" }}
              onClick={hideModal}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              style={{ width: "25%" }}
              onClick={confirmModal}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showModal}
          onHide={hideModal}
          size="md"
          style={{ marginTop: "70px" }}
        >
          <Modal.Header>
            <Modal.Title>Hibernate Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ fontSize: "17px" }}>
              Are you sure you want to hibernate your account?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="default"
              style={{ width: "20%" }}
              onClick={hideModal}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              style={{ width: "32%" }}
              onClick={confirmHibernate}
            >
              Hibernate
            </Button>
          </Modal.Footer>
        </Modal>
        <Form ref={form} className="forminput radius">
          <Row className="textcenter">
            <h2>
              {props.editProfile ? "Edit Profile " : "Mobala Full FX Signup"}
            </h2>
          </Row>

          <div className="card">
            <div class="custom-card-header">
              <OverlayTrigger
                overlay={
                  <Tooltip
                    id="tooltip-disabled"
                    bsPrefix="custom-tooltip"
                    style={{ position: "absolute", marginRight: "5px" }}
                  >
                    Place where you normally work from
                  </Tooltip>
                }
                placement="right"
              >
                <div>
                  <i class="fas fa-map-marker-alt mr-2 ml-2"></i> *Operating
                  Location
                </div>
              </OverlayTrigger>
            </div>
            <div class="card-body">
              <Row>
                <Col md={4}>
                  <h6>Geographic Details</h6>
                </Col>
                <Col>
                  <InputGroup className="">
                    <Form.Control
                      id="location"
                      value={geoaddress}
                      aria-label="Current Location"
                    />
                    <InputGroup.Text>
                      <a>
                        <img
                          onClick={() => {
                            setLocationerr("");
                            getlocation().then((d) => {
                              setselectedcountry(d.results[0].country);
                              // setuseState(geolocation.results[0].state);
                              setLocationerr("");
                            });
                          }}
                          className="attachbtn1"
                          src={Location}
                          alt="Location"
                        ></img>
                      </a>
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
              </Row>
              <h6 style={{ color: "red", textAlign: "center" }}>
                {locationerr}
              </h6>
              <Row className="textcenter mb-3">
                <Col style={{ marginTop: "10px" }} sm={6}>
                  <select
                    className="form-select"
                    id="country"
                    style={countryerr != "" ? styles.err : null}
                    onChange={(e) => {
                      setselectedcountry(e.target.value);
                      setuseState("");
                      setuseselectedcity("");
                     
                    }}
                    onClick={(e) => {
                      setcountryerr("");
                    }}
                    aria-label="Default select example"
                    value={selectedcountry}
                  >
                    <option value="" key={0}>
                      Country
                    </option>
                    {Countries.map((value, key) => (
                      <option value={value} key={key} hidden={key == 0}>
                        {value}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col style={{ marginTop: "10px" }} sm={6}>
                  <Form.Select
                    style={stateerr != "" ? styles.err : null}
                    id="state"
                    onChange={(e) => {
                      setstateerr("");
                      setuseState(
                        useselectedstate === useselectedstate
                          ? e.target.value
                          : useselectedstate
                      );
                    }}
                    aria-label="Default select example"
                    value={useselectedstate}
                  >
                    <option value="">State/Province</option>
                    {States.map((items, key) => (
                      <option value={items} key={key}>
                        {items}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Select
                    style={cityerr != "" ? styles.err : null}
                    id="city"
                    onChange={(e) => {
                      setcityerr("");
                      setuseselectedcity(
                        useselectedcity === useselectedcity
                          ? e.target.value
                          : useselectedcity
                      );
                    }}
                    onFocus={() => setcityerr("")}
                    aria-label="Default select example"
                    value={useselectedcity}
                  >
                    <option value="">City</option>
                    {Cities.map((items, key) => (
                      <option value={items} key={key}>
                        {items}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </div>
          </div>
          <Row style={{ justifyContent: "space-between", marginTop: 2 }} className="pl-2">
            <Col md={6}>
              <h6>Are you an:</h6>
            </Col>
            <Col md={6}
              style={{
                display: 'flex',
                flexDirection: 'row',
                // alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <input
                  // className="mt-2 mb-4"
                  type="radio"
                  checked={radiocheck.Individual}
                  value="Individual"
                  name="choice"
                  onChange={changeRadio}
                />{" "}
                <label>Individual</label>
              </div>
              <div style={{ marginRight: 10 }}>
                <input
                  type="radio"
                  checked={radiocheck.Corporation}
                  value="Corporation"
                  name="choice"
                  onChange={changeRadio}
                />{" "}
                <label>Corporation</label>
              </div>
            </Col>
          </Row>
          
          {radiocheck.Corporation === true && (
            <Row style={{ justifyContent: "space-between", marginTop: 2 }} className="pl-2">
              <Col md={6}>
                <h6>Are you a Bank:</h6>
              </Col>

              <Col md={6}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  // alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <input
                    type="radio"
                    checked={isBank === false}
                    value={isBank}
                    name="bankChoice"
                    onChange={() => setisBank(false)}
                  />{" "}
                  <label>No</label>
                </div>
                <div style={{ marginRight: 67 }}>
                  <input
                    type="radio"
                    checked={isBank === true}
                    value={isBank}
                    name="bankChoice"
                    onChange={() => setisBank(true)}
                  />{" "}
                  <label>Yes</label>
                </div>
              </Col>
            </Row>
          )}
          <div>
            <Row style={{ justifyContent: "space-between", marginTop: 2 }} className="pl-2">
              <Col md={6}>
                <h6>Are you a Money Changer (MC):</h6>
              </Col>
              <Col md={6}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  // alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <input
                    type="radio"
                    checked={isMC == false}
                    value="no"
                    name="moneyChangerChoice"
                    onChange={() => setisMC(false)}
                  />{" "}
                  <label>No</label>
                </div>
                <div style={{ marginRight: 67 }}>
                  <input
                    type="radio"
                    checked={isMC == true}
                    value="yes"
                    name="moneyChangerChoice"
                    onChange={() => setisMC(true)}
                  />{" "}
                  <label>Yes</label>
                </div>
              </Col>
            </Row>
              <br/>
            <Row
              id="mcprime"
              style={{ display: "none", justifyContent: "space-between", marginTop: 2 }}
              className="pl-2"
            >
              <Col md={6}>
                <h6>Would you like to avail MC Prime Services:</h6>
              </Col>
              <Col md={6}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  // alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <input
                    type="radio"
                    checked={isMCPrime === false}
                    value="no"
                    name="McPrime"
                    onChange={() => setisMCPrime(false)}
                  />{" "}
                  <label>No</label>
                </div>
                <div style={{ marginRight: 67 }}>
                  <input
                    type="radio"
                    checked={isMCPrime === true}
                    value="yes"
                    name="McPrime"
                    onChange={() => setisMCPrime(true)}
                  />{" "}
                  <label>Yes</label> 
                </div>
              </Col>
            </Row>

           

            {/* SETTLEMENT SERVICES */}
            <div id="settlementDiv" style={{ display: "none" }}>
              <Row
                style={{ justifyContent: "space-between", marginTop: 5 }}
                className="pl-2"
              >
                <Col md={6}>
                  <h6 style={{ position: "relative" }}>
                    Would you like to offer Settlement Services?
                    <OverlayTrigger
                      overlay={
                        <Tooltip
                          id="tooltip-disabled"
                          bsPrefix="custom-tooltip"
                          style={{
                            position: "absolute",
                            maxWidth: "300px",
                            whiteSpace: "normal",
                          }}
                        >
                          <p style={{ margin: 0 }}>
                            Settlement Services are offered by Money Changers
                            whereby the parties to a transaction visit a money
                            changer's premises (shop) and exchange the money in
                            his supervision. This is primarily a service to
                            bring a well-known service provider to oversee a
                            transaction and enhance trust.
                          </p>
                        </Tooltip>
                      }
                      placement="top-start"
                    >
                      <img
                        src={Iicons}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginTop: "-3px",
                        }}
                      />
                    </OverlayTrigger>
                  </h6>
                </Col>

                <Col md={6}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <input
                      className="mb-4 "
                      type="radio"
                      checked={settlementServices == false}
                      value="no"
                      name="settlementServices"
                      onChange={() => {
                        setSettlementServices(false);
                        setFreeSettlement(true);
                        setSettlementFees(0);
                      }}
                    />{" "}
                    <label>No</label>
                  </div>
                  <div style={{ marginRight: 67 }}>
                    <input
                      className="mb-4 ml-3"
                      type="radio"
                      checked={settlementServices == true}
                      value="yes"
                      name="settlementServices"
                      onChange={() => setSettlementServices(true)}
                    />{" "}
                    <label>Yes</label>
                  </div>
                </Col>
              </Row>

              <Row
                id="option"
                style={{
                  display: settlementServices ? "flex" : "none",
                  justifyContent: "space-between",
                }}
                className="pl-2"
              >
                <Col md={6}>
                  <h6>
                    What would you charge each party of the 2-parties to offer
                    Settlement Service
                  </h6>
                </Col>
                <Col md={6}>
                  <input
                    className="mt-2 mb-4"
                    type="radio"
                    // checked={settlementFees.split(",")[0]==="0"}
                    checked={true}
                    value="no"
                    name="settlmentFeesOption"
                    onChange={() => {
                      setFreeSettlement(true);
                      setSettlementFees("0");
                      console.log(settlementFees);
                    }}
                  />{" "}
                  Free
                  <input
                    className="mt-2  ml-3 "
                    type="radio"
                    // checked={freeSettlement === false || settlementFees.split(",")[0]!=="0"}
                    checked={true}
                    value="yes"
                    name="settlmentFeesOption"
                    onChange={() => {
                      setFreeSettlement(false)
                    }}
                  />{" "}
                  <input
                    style={{ width: "20%" }}
                    // value={String(settlementFees).split(",")[0] || ""}
                    onChange={(e) => setSettlementFees(e.target.value)}
                  />
                  <select
                    style={{ marginLeft: "10px", padding: "2px" }}
                    value={currencyCode}
                    onChange={(e) => {
                      const newCurrencyCode = e.target.value;

                      // Only update if the new selection is different
                      if (newCurrencyCode !== currencyCode) {
                        setCurrencyCode(newCurrencyCode);
                      }
                    }}
                  >
                    {Codes.map((countryData, i) => (
                      <option key={i} value={countryData[2]}>
                        {countryData[2] === "-"
                          ? countryData[1]
                          : countryData[2]}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </div>
            {/* END SETTLEMENT SERVICES */}

            {/* Licenses */}
            <Row
              id="mcprimeLicenses"
              style={{ display: "none", justifyContent: "space-between" }}
              className="pl-2"
            >
              <Col md={6}>
                <h6>List your licenses, if any</h6>
              </Col>
              <Col md={6}>
                {/* {isMC && ( */}
                <div>
                  <textarea
                    className="form-control mt-2"
                    placeholder="(up to 300 characters)"
                    value={licenseText}
                    onChange={(e) => {
                      if (e.target.value.length <= 300) {
                        setLicenseText(e.target.value);
                      }
                    }}
                    style={{
                      color: "grey",
                      fontSize: "14px",
                      height: "100px",
                      resize: "none",
                    }}
                  />
                  <small className="text-muted">
                    {300 - licenseText.length} characters remaining
                  </small>
                </div>
                {/* )} */}
              </Col>
            </Row>
            <Row
              id="mcprimeCountries"
              style={{ display: "none", justifyContent: "space-between" }}
              className="pl-2"
            >
              <Col style={{ marginTop: "10px" }} md={6}>
                <h6>Add up to 5 countries where you provide services</h6>
              </Col>
              <Col style={{ marginTop: "10px" }} md={6}>
                <select
                  className="form-select"
                  disabled={selectedCountiresText.length <= 4 ? false : true}
                  id="country"
                  onChange={handleCountryChange}
                  aria-label="Default select example"
                >
                  <option value="" key={0}>
                    Country
                  </option>
                  {Countries.map((value, key) => (
                    <option value={value} key={key} hidden={key === 0}>
                      {value}
                    </option>
                  ))}
                </select>
                <small className="text-muted">
                  {5 - selectedCountiresText.length} remaining
                </small>
                <div
                  className={`form-control mt-2 ${selectedCountiresText.length == 0 ||
                      selectedCountiresText.every(
                        (country) => country.trim() === ""
                      )
                      ? "d-none"
                      : ""
                    }`}
                  placeholder=""
                  style={{
                    color: "grey",
                    fontSize: "14px",
                    height: "auto",
                    overflowY: "auto",
                    resize: "none",
                  }}
                >
                  {selectedCountiresText
                    .filter((country) => country.trim() !== "")
                    .map((country, index) => (
                      <div
                        className="d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        <p className="mb-0">{country}</p>
                        {selectedCountiresText.length > 0 && (
                          <img
                            src={cancel}
                            className="cursor-pointer"
                            width={"10px"}
                            height={"10px"}
                            onClick={() => {
                              removeCountryOfService(index);
                            }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </Col>
            </Row>
          </div>

          {/* MC PRIME PASSCODE */}

          {/* login */}
          <div className="card mt-3" style={{ cursor: "default" }}>
            <div class="custom-card-header">
              <i class="fas fa-sign-in-alt mr-2 ml-2"></i> *Login Information
            </div>
            <div class="card-body">
              <Row>
                <Row>
                  <label>E-mail</label>
                </Row>
                <Col sm={8}>
                  <Form.Group className="mb-3" autocomplete="off">
                    <Form.Control
                      className={border === true ? "inputgrennbdr" : null}
                      // style={emailerr != "" ? styles.err : null}
                      id="email"
                      onChange={(e) => {
                        setEmailerror("");
                        document.getElementById("emailcheck").style.display =
                          "none";
                        setEmail(e.target.value);
                      }}
                      style={emailerr != "" ? styles.err : null}
                      onFocus={() => setEmailerror("")}
                      onKeyUp={() => {
                        if (!isFX1User) {
                          Checkemail();
                        }
                      }}
                      value={email}
                      disabled={isFX1User}
                      name="user_email"
                      type="text"
                      autocomplete="off"
                    />
                    <div className="tick-icon1">
                      <img
                        id="tick"
                        style={{
                          display: emailverify ? "block" : "none",
                          width: "26px",
                        }}
                        src={Tick}
                      />
                    </div>
                  </Form.Group>
                  <span
                    id="emailcheck"
                    style={{ display: "none", color: "red" }}
                  >
                    {" "}
                    Email is already registered
                  </span>
                  <span
                    id="sendcodemsg"
                    style={{ display: "none", color: "green" }}
                  >
                    {" "}
                    Verification Email sent successfuly
                  </span>
                  <Form.Group className="mb-3" controlId="E-mail">
                    <lable
                      style={showform === true ? styles.show : styles.hide}
                    >
                      Enter Verification Code
                    </lable>
                    <input
                      name="subject"
                      value={"Verification Code"}
                      hidden={true}
                    />
                    <Form.Control
                      id="verificationCode"
                      as={NumberFormat}
                      style={showform === true ? styles.show : styles.hide}
                      onChange={(e) => setcheckcode(e.target.value)}
                      value={checkcode}
                    />
                  </Form.Group>
                  <span id="codeerr" style={{ display: "none", color: "red" }}>
                    {" "}
                    Your Verification Code is Incorrect
                  </span>
                  <span
                    id="codeerr1"
                    style={{ display: "none", color: "green" }}
                  >
                    {" "}
                    Your Verification Code is Correct
                  </span>
                  {/* <h6 style={{ color: "red" }}>{emailerr}</h6> */}
                </Col>
                <Col
                  style={{
                    textAlign: "center",
                    marginBottom: "15px",
                    // marginTop: "-5px",
                  }}
                  sm={4}
                >
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <Button
                      style={{
                        display: emailverify ? "none" : "block",
                        width: "fit-content",
                      }}
                      id="codebutton"
                      variant="primary"
                      onClick={sendEmail}
                      className={emailverify ? "btnverifygreyed" : "verifybtn"}
                    >
                      {emailverify ? "Verified/Change" : "Verify"}
                    </Button>
                  </OverlayTrigger>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Row>
                    <lable>Password</lable>
                  </Row>
                  <Row>
                    <InputGroup id="passw" className="" autocomplete="off">
                      <Form.Control
                        style={passworderr != "" ? styles.err : null}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        id="password"
                        type={type === "password" ? "password" : "input"}
                        onKeyUp={() => hideerr()}
                        onFocus={() => setPassworderror("")}
                        onBlur={isFX1User ? checkPassword : showerr}
                        className={type === "input" ? "" : "confirmpass"}
                        placeholder="Password"
                        aria-label="Password"
                        onCopy={(e) => {
                          // e.clipboardData.setData("")
                          e.preventDefault();
                          return false;
                        }}
                        aria-describedby="basic-addon2"
                        value={password}
                        autocomplete="off"
                      />
                      {type === "password" ? (
                        <div className="search-icon">
                          <i
                            onClick={changetype}
                            className="fa fa-eye-slash"
                          ></i>
                        </div>
                      ) : (
                        <div className="search-icon">
                          <i onClick={changetypepass} className="fa fa-eye"></i>
                        </div>
                      )}
                    </InputGroup>

                    {/* <h6 style={{ color: "red" }}>{passworderr}</h6> */}
                  </Row>
                </Col>{" "}
                <span id="passempty" style={{ color: "red", display: "none" }}>
                  * Password cannot be empty
                </span>
                <span id="passlength" style={{ color: "red", display: "none" }}>
                  * Password must be more than 7 characters
                </span>
                <span
                  id="passspecial"
                  style={{ color: "red", display: "none" }}
                >
                  * Password must contains at least 1 special character
                </span>
              </Row>
              {isFX1User ? null : (
                <Row>
                  <Col>
                    <Row>
                      <lable>Confirm Password</lable>
                    </Row>
                    <InputGroup className="mb-3" autocomplete="off">
                      <Form.Control
                        className={type1 === "input" ? "" : "confirmpass"}
                        name="new-password"
                        id="confirmPassword"
                        onFocus={() => setpasscheck("")}
                        style={passcheck != "" ? styles.err : null}
                        onChange={(e) => {
                          document.getElementById("passmatch").style.display =
                            "none";
                          setConfirmPassword(e.target.value);
                        }}
                        type={type1 === "password" ? "password" : "input"}
                        placeholder="Password"
                        autoComplete="new-passord"
                        aria-label="confirm-password"
                        autoSave="new-password"
                        aria-describedby="basic-addon2"
                        value={confirmpassword}
                        autocomplete="off"
                      />

                      {type1 === "password" ? (
                        <div className="eye-icon">
                          <i
                            onClick={changetype1}
                            style={{ zIndex: 0 }}
                            className="fa fa-eye-slash"
                          ></i>
                        </div>
                      ) : (
                        <div className="eye-icon">
                          <i
                            onClick={changetypepass1}
                            style={{ zIndex: 0 }}
                            className="fa fa-eye"
                          ></i>
                        </div>
                      )}
                    </InputGroup>
                    <span
                      id="passmatch"
                      style={{ color: "red", display: "none" }}
                    >
                      * Password mismatch
                    </span>
                    <h6 style={{ color: "red" }}>{passcheck}</h6>
                  </Col>
                  <div className="invalid-feedback"></div>
                </Row>
              )}
            </div>
          </div>
          <Row style={{ marginTop: 20 }}>
            <Col>
              <label>
                *Preferred Username / Display Name (can't be changed later)
                <br />
                <span style={{ fontStyle: "italic" }}>
                  {" "}
                  For Money Changers and corporates, keeping name of business in
                  username helps in better identification, for example
                  Harry_Xyzcorp
                </span>
              </label>

              <Form.Group controlId="PreferredUserName" >
                <Form.Control
                  style={usernameerr != "" ? styles.err : null}
                  id="userName"
                  onChange={(e) => {
                    let value = e.target.value;
                    setUsername(value);
                    if (value > 12) {
                      document.getElementById("takenlenerr").style.display =
                        "block";
                    } else {
                      document.getElementById("takenlenerr").style.display =
                        "none";
                    }
                  }}
                  value={UserName}
                  onFocus={() => setusernameerr("")}
                  disabled={isFX1User || props.editProfile}
                  onBlur={(e) => {
                    if (!isFX1User) checkUserName(e.target.value);
                  }}
                  type="text"
                />
              </Form.Group>
              <h6 id="takenerr" style={{ color: "red", display: "none" }}>
                This Username already taken.
              </h6>
              <h6 id="takenlenerr" style={{ color: "red", display: "none" }}>
                Length of Preferred Username can not exceed 12 characters.
              </h6>
            </Col>
          </Row>
          <hr className="my-3" />
          <div className="card" style={{ cursor: "default" }}>
            <div class="custom-card-header">
              <i class="fas fa-user-secret mr-2 ml-2"></i> Confidential Data
              (Will not be shared with other users unless you are a MC)
            </div>
            <div class="card-body">
              <Row>
                <Col>
                  <label>*First Name</label>
                  <Form.Group className=" mb-3" controlId="FirstName" >
                    <Form.Control
                      style={firstnameerr != "" ? styles.err : null}
                      id="firstName"
                      onFocus={() => setfirsnameerr("")}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstname}
                      type="text"
                    />
                  </Form.Group>

                  <Form.Group
                    style={{ display: "none" }}
                    className=" mb-3"
                    controlId="FirstName"
                   
                  >
                    <Form.Control
                      name="message"
                      value={Verifycode}
                      type="text"
                    />
                  </Form.Group>
                </Col>
                <Col className="middlename">
                  <label className="mobilemiddleName">Middle Name</label>
                  <Form.Group className=" mb-3" controlId="MiddleName" >
                    <Form.Control
                      onChange={(e) => {
                        setMiddleName(e.target.value);
                      }}
                      value={middlename}
                      type="Middle Name"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <label>*Last Name</label>
                  <Form.Group className=" mb-3" controlId="LastName" >
                    <Form.Control
                      onFocus={() => setlastnameerr("")}
                      style={lastnameerr != "" ? styles.err : null}
                      id="lastName"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastname}
                      type="text"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <lable>
                    *Country where Government ID issued for residency
                  </lable>
                </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  <Form.Select
                    onFocus={() => setiderr("")}
                    style={iderr != "" ? styles.err : null}
                    aria-label="Default select example"
                    value={selectedcountryID}
                    onChange={(e) => setselectedcountryID(e.target.value)}
                  >
                    <option value="">Country</option>
                    {dialCodes.map((item, key) => (
                      <option value={item.name} key={key}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <lable>*Mobile number</lable>
                  </Row>
                  <Row>
                    <Col className="mb-2" sm={3}>
                      <Form.Select
                        className="phonedropdown"
                        id="countryID"
                        aria-label="Country"
                        onChange={(e) => setcountrycode(e.target.value)}
                        value={countrycode}
                      >
                        <option value="">Country</option>
                        {dialCodes.map((item, key) => (
                          <option value={item.dial_code} key={key}>
                            {item.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <InputGroup className="mb-3">
                        <span className="maskGroup" style={{width:"4rem !important;"}}>
                          {countrycode === "" ? "+" : countrycode}
                        </span>
                        <FormControl
                          onFocus={() => setnumerr("")}
                          id="mobileNumber"
                          style={numerr != "" ? styles.err : null}
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            // if value is not blank, then test the regex

                            if (
                              e.target.value === "" ||
                              (re.test(e.target.value) &&
                                e.target.value.length <= 10)
                            ) {
                              setMNumber(e.target.value);
                            }
                          }}
                          onBlur={checkMobile}
                          value={mobilenumber}
                          type="text"
                          placeholder=""
                          aria-label=""
                        />
                      </InputGroup>
                      <h6 style={{ color: "red" }}>{numerr}</h6>
                    </Col>
                    <span
                      id="mobileAlready"
                      style={{ color: "red", display: "none" }}
                    >
                      * Mobile Number already registered
                    </span>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row>
                    <lable>Other Phone</lable>
                  </Row>
                  <Row>
                    <Col className="mb-2" sm={3}>
                      <Form.Select
                        className="phonedropdown"
                        aria-label="Country"
                        value={othercountrycode}
                        onChange={(e) => setothercountrycode(e.target.value)}
                      >
                        <option value={""}>Country</option>
                        {dialCodes.map((item, key) => (
                          <option value={item.dial_code}>{item.name}</option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <InputGroup className="mb-3">
                        <span className="maskGroup" style={{width:"4rem !important;"}}>
                          {othercountrycode === "" ? "+" : othercountrycode}
                        </span>
                        <FormControl
                          onChange={(e) => {
                            const re = /^[0-9\b]+$/;

                            // if value is not blank, then test the regex

                            if (
                              e.target.value === "" ||
                              (re.test(e.target.value) &&
                                e.target.value.length <= 10)
                            ) {
                              setPhoneNumber(e.target.value);
                            }
                          }}
                          value={phoneNumber}
                          type="text"
                          placeholder=""
                        />
                      </InputGroup>
                    </Col>
                    <Row
                      className="checkboximg mb-4"
                    // style={{ marginTop: -15, marginLeft: 1 }}
                    >
                      <Col>
                        <input
                          onClick={() => {
                            if (isPhoneNumberPublic) {
                              setisPhoneNumberPublic(false);
                            } else {
                              setisPhoneNumberPublic(true);
                            }
                          }}
                          checked={isPhoneNumberPublic}
                          type={"checkbox"}
                        />{" "}
                        Make these numbers public
                      </Col>
                    </Row>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          <div className="card mt-3" style={{ cursor: "default" }}>
            <div class="custom-card-header">
              <i class="fas fa-list-alt mr-2 ml-2"></i> Promotional Material
              (Optional)
            </div>
            <div class="card-body">
              <p>
                A complete profile will bump you up in Search Results and is
                recommended
              </p>

              <Row style={{ cursor: "default" }}>
                <Col>
                  <Row>
                    <Col style={{ maxWidth: "240px", maxHeight: "320px" }}>
                      <input
                        accept="image/*"
                        type="file"
                        className="custom-file-input"
                        onChange={async (e) => {
                          let imagesource = await toBase64(e.target.files[0]);
                          setprofileimagesource(imagesource);
                          let FirstFile = e.target.files[0].name;
                          setFirstFile(FirstFile);
                          // handleImageChange(e)
                        }}
                      />{" "}
                      {firstFile != "" ? (
                        <strong
                          style={{ paddingLeft: "20px", fontSize: "13px" }}
                        >
                          {firstFile.length > 14
                            ? firstFile.substring(0, 13) + "..."
                            : firstFile}
                        </strong>
                      ) : null}
                      <div className="btnupload mt-3 mb-2">
                        {" "}
                        {profileimagesource != "" ? (
                          <div onClick={profileTrash} className="trash-icon">
                            <img
                              style={{
                                display: "flex",
                                width: "12px",
                                marginTop: "6px",
                                marginLeft: "6px",
                              }}
                              src={close}
                            />
                          </div>
                        ) : null}
                        <img
                          style={{
                            maxHeight: "100%",
                            maxWidth: "100%",
                          }}
                          src={
                            profileimagesource.includes(apiHost)
                              ? profileimagesource
                              : `data:application/pdf;base64,${profileimagesource}`
                          }
                          alt="Profile-Image"
                        />
                        {profileimagesource == "" ? (
                          <p
                            style={
                              profileimagesource != ""
                                ? styles.upload
                                : styles.btntextt
                            }
                          >
                            Upload Profile picture
                          </p>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                  <Row
                    className="checkboximg mb-4"
                    style={{
                      // marginTop: -15,
                      marginLeft: 1,
                    }}
                  >
                    <p>Display Picture</p>
                    {/* <InputGroup
                    style={{ padding: "0px", width: "99%" }}
                    className="mt-3 mb-2"
                  >
                    <FormControl
                      onChange={(e) => setprofiledisc(e.target.value)}
                      value={profiledisc}
                      placeholder="Description"
                    />
                  </InputGroup> */}
                    <Col style={{ paddingLeft: "0px" }}>
                      <input
                        onClick={handlePicinPublic}
                        checked={Picinpublic}
                        type={"checkbox"}
                      />{" "}
                      Make public
                    </Col>
                  </Row>
                </Col>
                {/* //////////////////////TWO///////////// */}
                <Col>
                  <Row>
                    <Col
                      style={{
                        minWidth: "240px",
                        maxHeight: "320px",
                        marginRight: "5px",
                        paddingRight: 0,
                      }}
                    >
                      <input
                        accept=".pdf,.doc,.docx"
                        type="file"
                        id="secondFile"
                        className="custom-file-input"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (
                            file &&
                            file.name.toLowerCase().endsWith(".exe")
                          ) {
                            setSecondFileError("EXE files are not allowed.");
                            return;
                          } else {
                            setSecondFileError("");
                          }

                          let imagessource = await toBase64(e.target.files[0]);
                          setimagesource2(imagessource);
                          setSecondFile(e.target.files[0].name);
                        }}
                      />
                      {imagesource2 !== "" ? (
                        <>
                          <strong
                            style={{
                              paddingLeft: "20px",
                              fontSize: "13px",
                            }}
                          >
                            <a
                              onClick={() => {
                                var pdfDataURL = imagesource2.includes(apiHost)
                                  ? imagesource2
                                  : `data:application/pdf;base64,${imagesource2}`;
                                window.open(pdfDataURL, "_blank");
                              }}
                            >
                              {secondFile.length > 10
                                ? secondFile.substring(0, 9) + "..."
                                : secondFile}
                            </a>
                            {imagesource2 != "" ? (
                              <img
                                src={Cencle}
                                style={{
                                  width: "18px",
                                  float: "right",
                                  cursor: "pointer",
                                  marginTop: "7px",
                                }}
                                onClick={() => {
                                  setSecondFile("");
                                  setimagesource2("");
                                }}
                              />
                            ) : null}
                          </strong>
                        </>
                      ) : null}
                      {secondFileError && (
                        <label
                          style={{
                            color: "red",
                            marginTop: "5px",
                            fontStyle: "italic",
                          }}
                        >
                          {secondFileError}
                        </label>
                      )}
                    </Col>
                  </Row>
                  <Row
                    className="mb-4 docUpload"
                    style={{
                      margin: "0px -15px -15px -10px",
                    }}
                  >
                    <InputGroup className="docDescription mt-3 mb-2">
                      <FormControl
                        onChange={(e) => setiddisc(e.target.value)}
                        value={iddisc}
                        placeholder="Description"
                      />
                    </InputGroup>
                  </Row>
                  <Row style={{ display: "flex", justifyContent: "end" }}>
                    <Col
                      style={{
                        maxWidth: "117px",
                        marginTop: "-19px",
                        marginBottom: "10px",
                      }}
                    >
                      <input
                        checked={firstDocPublic}
                        type="checkbox"
                        disabled={secondFile === ""}
                        onChange={() => {
                          setFirstDocPublic(!firstDocPublic);
                        }}
                      />{" "}
                      Make public
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        minWidth: "240px",
                        maxHeight: "320px",
                        marginRight: "5px",
                        paddingRight: 0,
                      }}
                    >
                      {/* THIRD */}
                      <input
                        accept=".pdf,.doc,.docx"
                        type="file"
                        id="thirdFile"
                        className="custom-file-input "
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (
                            file &&
                            file.name.toLowerCase().endsWith(".exe")
                          ) {
                            setThirdFileError("EXE files are not allowed.");
                            return;
                          } else {
                            setThirdFileError("");
                          }

                          let imagessource = await toBase64(e.target.files[0]);
                          setimagesource3(imagessource);
                          let fileName = e.target.files[0].name;
                          setThirdFile(fileName);
                        }}
                      />
                      {imagesource3 != "" ? (
                        <strong
                          style={{
                            paddingLeft: "20px",
                            fontSize: "13px",
                          }}
                        >
                          <a
                            onClick={() => {
                              var pdfDataURL = imagesource3.includes(apiHost)
                                ? imagesource3
                                : `data:application/pdf;base64,${imagesource3}`;
                              window.open(pdfDataURL, "_blank");
                            }}
                          >
                            {thirdFile.length > 10
                              ? thirdFile.substring(0, 9) + "..."
                              : thirdFile}
                          </a>
                          <img
                            src={Cencle}
                            style={{
                              width: "18px",
                              float: "right",
                              cursor: "pointer",
                              marginTop: "7px",
                            }}
                            onClick={() => {
                              setThirdFile("");
                              setimagesource3("");
                            }}
                          />
                        </strong>
                      ) : null}
                      {thirdFileError && (
                        <label
                          style={{
                            color: "red",
                            marginTop: "5px",
                            fontStyle: "italic",
                          }}
                        >
                          {thirdFileError}
                        </label>
                      )}
                    </Col>
                  </Row>
                  <Row
                    className="mb-4 docUpload"
                    style={{
                      margin: "0px -15px -15px -10px",
                    }}
                  >
                    <InputGroup className="docDescription mt-3 mb-2">
                      <FormControl
                        onChange={(e) => setdocdisc(e.target.value)}
                        value={docdisc}
                        placeholder="Description"
                      />
                    </InputGroup>
                  </Row>
                  <Row style={{ display: "flex", justifyContent: "end" }}>
                    <Col
                      style={{
                        maxWidth: "117px",
                        marginTop: "-19px",
                        marginBottom: "10px",
                      }}
                    >
                      <input
                        onClick={() => {
                          setSecondDocPublic(!secondDocPublic);
                        }}
                        disabled={thirdFile === ""}
                        checked={secondDocPublic}
                        type={"checkbox"}
                      />{" "}
                      Make public
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        minWidth: "240px",
                        maxHeight: "320px",
                        marginRight: "5px",
                        paddingRight: 0,
                      }}
                    >
                      {/* FOURTH */}
                      <input
                        accept=".pdf,.doc,.docx"
                        type="file"
                        id="fourthFile"
                        className="custom-file-input "
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (
                            file &&
                            file.name.toLowerCase().endsWith(".exe")
                          ) {
                            setFourthFileError("EXE files are not allowed.");
                            return;
                          } else {
                            setFourthFileError("");
                          }

                          let imagessource = await toBase64(file);
                          setimagesource4(imagessource);
                          let fileName = file.name;
                          setFourthFile(fileName);
                        }}
                      />
                      {imagesource4 != "" ? (
                        <strong
                          style={{
                            paddingLeft: "20px",
                            fontSize: "13px",
                          }}
                        >
                          <a
                            onClick={() => {
                              var pdfDataURL = imagesource4.includes(apiHost)
                                ? imagesource4
                                : `data:application/pdf;base64,${imagesource4}`;
                              window.open(pdfDataURL, "_blank");
                            }}
                          >
                            {fourthFile.length > 10
                              ? fourthFile.substring(0, 9) + "..."
                              : fourthFile}
                          </a>
                          <img
                            src={Cencle}
                            style={{
                              width: "18px",
                              float: "right",
                              cursor: "pointer",
                              marginTop: "7px",
                            }}
                            onClick={() => {
                              setFourthFile("");
                              setimagesource4("");
                            }}
                          />
                        </strong>
                      ) : null}
                      {fourthFileError && (
                        <label
                          style={{
                            color: "red",
                            marginTop: "5px",
                            fontStyle: "italic",
                          }}
                        >
                          {fourthFileError}
                        </label>
                      )}
                    </Col>
                  </Row>
                  <Row
                    className="mb-4 docUpload"
                    style={{
                      margin: "0px -15px -15px -10px",
                    }}
                  >
                    <Col>
                      <InputGroup className="docDescription mt-3 mb-2">
                        <FormControl
                          onChange={(e) => setsecdocdisc(e.target.value)}
                          value={secdocdisc}
                          placeholder="Description"
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row style={{ display: "flex", justifyContent: "end" }}>
                    <Col style={{ maxWidth: "117px", marginTop: "-19px" }}>
                      <input
                        onClick={() => {
                          setThirdDocPublic(!thirdDocPublic);
                        }}
                        disabled={fourthFile === ""}
                        checked={thirdDocPublic}
                        type={"checkbox"}
                      />{" "}
                      Make public
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row style={{ cursor: "default" }}>
                <strong className="mb-4">
                  (Suggest adding Corporation/marketing material in pdf/jpg
                  format only. <i>No ID / passport please</i>.)
                </strong>
              </Row>

              <Row style={{ cursor: "default" }}>
                <Col>
                  <label>Address</label>
                  <Form.Group className="mb-3" controlId="Address">
                    <Form.Control
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                      type="text"
                      maxLength={200}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="checkboximg mb-4" style={{ cursor: "default" }}>
                <Col>
                  <input
                    onClick={() => {
                      if (isAddressPublic) {
                        setisAddressPublic(false);
                      } else {
                        setisAddressPublic(true);
                      }
                    }}
                    checked={isAddressPublic}
                    type={"checkbox"}
                  />{" "}
                  Make public
                </Col>
              </Row>
              <Row style={{ cursor: "default" }}>
                <Col>
                  <label>Website or a personal social media page</label>
                  <Form.Group className="mb-3" controlId="Website" >
                    <Form.Control
                      onChange={(e) => {
                        setWebsite(e.target.value);
                      }}
                      value={website}
                      type="text"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="checkboximg mb-4" style={{ cursor: "default" }}>
                <Col style={{ cursor: "default" }}>
                  <input
                    onClick={() => {
                      if (isWebsitePublic) {
                        setisWebsitePublic(false);
                      } else {
                        setisWebsitePublic(true);
                      }
                    }}
                    checked={isWebsitePublic}
                    type={"checkbox"}
                  />{" "}
                  Make public
                </Col>
              </Row>
              <Row style={{ cursor: "default" }}>
                <Col>
                  <label>Profession</label>
                  <Form.Group className="mb-3" controlId="Profession ID" >
                    <Form.Control
                      onChange={(e) => {
                        setProfession(e.target.value);
                      }}
                      value={Profession}
                      type="text"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="checkboximg mb-4" style={{ cursor: "default" }}>
                <Col style={{ cursor: "default" }}>
                  <input
                    onClick={() => {
                      if (isProfessionPublic) {
                        setisProfessionPublic(false);
                      } else {
                        setisProfessionPublic(true);
                      }
                    }}
                    checked={isProfessionPublic}
                    type={"checkbox"}
                  />{" "}
                  Make public
                </Col>
              </Row>
            </div>
          </div>
          <Row style={{ cursor: "default" }}>
            <Col>
              <input
                id="agreeCheck"
                color="red"
                style={{ zIndex: 3 }}
                onClick={handleagreeClick}
                checked={agreechecked}
                type={"checkbox"}
                className={
                  agreeerr === "" ? "mt-3 mr-2 " : "mt-3 mr-2 chekboxerror"
                }
              />{" "}
              *I have read and agree to the{" "}
              <a href="/Terms" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>
              {/* {"   "} *I agree to the <a href="/Terms">Terms and Conditions</a> */}
            </Col>
            <h6 style={{ marginTop: "3px", color: "red" }}>{agreeerr}</h6>
          </Row>
          <Row className="justify-content-end">
            <Col
              md={12}
              className="d-flex justify-content-between align-items-center p-3"
            >
              <Button
                variant="secondary"
                className="btncancel justify-content-end"
                style={{ width: "fit-content" }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>

              <Button
                onClick={props.editProfile || isFX1User ? updateUser : addUser}
                variant="primary"
                className="btnlogin justify-content-end"
                id="submitButton"
                style={{ width: "fit-content" }}
              >
                {isLoading ? (
                  <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Submit"
                )}
              </Button>
            </Col>
            <Col
              md={12}
              className="d-flex justify-content-between align-items-center p-3"
            >
              {props.editProfile && (
                <div className="d-flex justify-content-between">
                  <a
                    href="#"
                    onClick={deactivate}
                    className="AccDeleteLink"
                    style={{ textAlign: "end", fontSize: "small" }}
                  >
                    Hibernate Account
                  </a>
                </div>
              )}
            </Col>
            <Col
              md={12}
              className="d-flex justify-content-between align-items-center p-3"
            >
              {props.editProfile && (
                <div className="d-flex justify-content-between">
                  <a
                    href="#"
                    onClick={DeleteAccount}
                    className="AccDeleteLink"
                    style={{ textAlign: "end", fontSize: "small" }}
                  >
                    Delete Account
                  </a>
                </div>
              )}
            </Col>
          </Row>
          {!props.editProfile && (
            <p className="text-form  mt-3">
              Have an account? <a href="/"> Login Here</a>
            </p>
          )}
        </Form>
      </Col>
    </Row>
  );
}
export default Profile;