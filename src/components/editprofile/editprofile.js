import axios from "axios";
import * as CryptoJS from "crypto-js";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Cencle from "../../asstes/cancel.png";
import Location from "../../asstes/Location.svg";
import pdfImage from "../../asstes/pdf.svg";
import Picture from "../../asstes/Profile.svg";
import Tick from "../../asstes/tick.svg";
import { AppContext } from "../../Context";
import { apiHost } from "../../Helper";

function Editprofile() {
  const navigate = useNavigate();
  const [border, setborder] = useState(false);
  const form = useRef();
  const [emailerr, setEmailerror] = useState("");
  const [checkemail, setcheckEmail] = useState(" ");
  const [showform, setshowform] = useState(false);
  const [Profession, setProfession] = useState("");
  const [isProfessionPublic, setisProfessionPublic] = useState("");
  const [ArePhoneNumberPublic, setArePhoneNumberPublic] = useState("");
  const [emailverify, setemailverify] = useState("");
  const [verifiedcode, setverifiedcode] = useState("");
  const [checkcode, setcheckcode] = useState("");
  const [Verifycode, setverifycode] = useState("");
  const [msg, setmsg] = useState("");
  const [currentpass, setcurrentpass] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [missmsg, setmissmsg] = useState("");
  const [emptymsg, setemptymsg] = useState("");
  const [Uid, setUid] = useState(sessionStorage.getItem("UserID"));
  const [list, setlist] = useState({});
  const [firstname, setfirstname] = useState("");
  const [middlename, setmiddleName] = useState("");
  const [lastname, setlastname] = useState("");
  const [mobilenumber, setmobilenumber] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [country, setCountry] = useState();
  const [selectedcountry, setselectedcountry] = useState("");
  const [State, setState] = useState([]);
  const [selectedstate, setselectedstate] = useState("");
  const [city, setCity] = useState([]);
  const [selectedcity, setselectedcity] = useState();
  const imageRef = useRef(null);
  const [long, setlong] = useState("");
  const [lat, setlat] = useState("");
  const [email, setemail] = useState("");
  const [previousemail, setpreviousemail] = useState("");
  const [MobCode, setMobCode] = useState("");
  const [PhoneCode, setPhoneCode] = useState("");

  const [data, setdata] = useState([]);
  const [username, setusername] = useState("");
  const [geolocation, setgeolocation] = useState("");
  const [type, settype] = useState("password");
  const [type1, settype1] = useState("password");

  const [AditionalAddress, setAditionalAddress] = useState("");
  const [website, setwebsite] = useState("");
  const [skypeid, setskypeid] = useState("");
  const [firstnameerr, setfirstnameerr] = useState("");
  const [lastnameerr, setlastnameerr] = useState("");
  const [locationerr, setLocationerr] = useState("");
  const [countryerr, setcountryerr] = useState("");
  const [stateerr, setstateerr] = useState("");
  const [cityerr, setcityerr] = useState("");
  const [mobilererr, setmobilererr] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [show1stdocpic, setshow1stdocpic] = useState("");
  const [show2nddocpic, setshow2nddocpic] = useState("");
  const [show3rddocpic, setshow3rddocpic] = useState("");
  const [docdisc, setdocdisc] = useState("");
  const [secdocdisc, setsecdocdisc] = useState("");
  const [iddisc, setiddisc] = useState("");
  const [image1, setimage1] = useState("");
  const [image2, setimage2] = useState("");
  const [image3, setimage3] = useState("");
  const [image4, setimage4] = useState("");
  const [isWebsitePublic, setisWebsitePublic] = useState("");
  const [isAddressPublic, setisAddressPublic] = useState("");

  const [profileimagesource, setprofileimagesource] = useState([]);
  const [imagesource1, setimagesource1] = useState([]);
  const [imagesource2, setimagesource2] = useState([]);
  const [imagesource3, setimagesource3] = useState([]);
  const [imagesourceurl1, setimagesourceurl1] = useState("");
  const [imagesourceurl2, setimagesourceurl2] = useState("");
  const [imagesourceurl3, setimagesourceurl3] = useState("");
  const [firstFile, setFirstFile] = useState("");
  const [secondFile, setSecondFile] = useState("");
  const [thirdFile, setThirdFile] = useState("");
  const [show1stFile, setshow1stFile] = useState(false);
  const [show2ndFile, setshow2ndFile] = useState(false);
  const [show3rdFile, setshow3rdFile] = useState(false);
  const [profileImage, setprofileImage] = useState("");

  const context = useContext(AppContext);

  useEffect(() => {
    //console.log("imagesourceurl1");
    //console.log(imagesourceurl1);
  }, [imagesourceurl1]);

  useEffect(() => {
    setUid(window.location.search.split("=")[1]);
  }, [null]);
  useEffect(() => {
    if (checkcode == Verifycode && checkemail === email) {
      console.clear();
      setverifiedcode(checkcode);
      setborder(true);
      setemailverify(true);
      //console.log(checkcode);
      //console.log(verifiedcode);
      //console.log(email);
      //console.log(checkemail);
      //console.log("true");
      setshowform(false);
      document.getElementById("tick").style.display = "block";
      document.getElementById("email").disabled = true;
      document.getElementById("codebutton").className = "btnverifygreyededit";
      document.getElementById("codebutton").innerHTML = "Verified/Change";
    } else {
      setemailverify(false);
      document.getElementById("codebutton").style.display = "block";
      document.getElementById("tick").style.display = "none";

      setborder(false);
    }
  }, [checkcode, Verifycode, email, verifiedcode]);
  const Getdata = async () => {
    let url = `${apiHost}/api/User/GetUserByIdForEdit?UserId=${sessionStorage.getItem(
      "UserID"
    )}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
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
            if (i == 1) {
              setshow1stFile(true);
            } else if (i == 2) {
              setshow2ndFile(true);
            } else if (i == 3) {
              setshow3rdFile(true);
            }
          }
        }
        setlist(data);
        console.clear();
        //console.log(data);
      });
  };
  const Style = {
    err: {
      borderWidth: "2px",
      borderColor: "#ff000070",
    },
  };
  const deactivate = async () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };
  const confirmModal = async () => {
    //console.log("my===========", list);
    let obj={}
    let url = `${apiHost}/api/Authentication/DeleteAccount?ID=${Uid}`;
    axios
      .post(url,obj, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        if(response.data==true){
          window.location.href("/")
        }
        else{
          alert("Someting went wrong!")
        }
      }).catch((err) => {
        //console.log(err)
      })
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const Update = async () => {
    if (firstname.length === 0) {
      setfirstnameerr("Missing Field");
      setTimeout(() => {
        setfirstnameerr("");
      }, 5000);
    } else if (lastname.length === 0) {
      setlastnameerr("Missing Field");
      setTimeout(() => {
        setlastnameerr("");
      }, 5000);
    } else if (geolocation.length === 0) {
      setLocationerr("Missing Field");
      setTimeout(() => {
        setLocationerr("");
      }, 5000);
    } else if (checkcode != Verifycode) {
      document.getElementById("codeerr").style.display = "block";
      setTimeout(() => {
        document.getElementById("codeerr").style.display = "none";
      }, 5000);
    } else if (selectedcountry === "") {
      setcountryerr("Missing Field");
      setTimeout(() => {
        setcountryerr("");
      }, 5000);
    } else if (selectedstate === "null") {
      setstateerr("Missing Field");
      setTimeout(() => {
        setstateerr("");
      }, 5000);
    } else if (setselectedcity === "") {
      setcityerr("Missing Field");
      setTimeout(() => {
        setcityerr("");
      }, 5000);
    } else if (mobilenumber === "") {
      setmobilererr("Missing Field");
      setTimeout(() => {
        setmobilererr("");
      }, 5000);
    } else {
      let profileimagepath = image1;
      let firstdocpath = image2;
      let seconddocpath = image3;
      let thirddocpath = image4;
      let profileimageBase64 = "";
      let firstdocBase64 = "";
      let seconddocBase64 = "";
      let thirddocBase64 = "";
      if (profileimagesource.length != 0) {
        const file = profileimagesource[0].name;
        profileimagepath = Uid + ":" + file;
        profileimageBase64 = await toBase64(profileimagesource[0]);
      }
      if (imagesource1.length != 0) {
        const file = imagesource1[0].name;
        firstdocpath = Uid + ":" + file;
        firstdocBase64 = await toBase64(imagesource1[0]);
      }
      if (imagesource2.length != 0) {
        const file = imagesource2[0].name;
        seconddocpath = Uid + ":" + file;
        seconddocBase64 = await toBase64(imagesource2[0]);
      }
      if (imagesource3.length != 0) {
        const file = imagesource3[0].name;
        thirddocpath = Uid + ":" + file;
        thirddocBase64 = await toBase64(imagesource3[0]);
      }
      let obj = {
        ID: Uid,
        Website: website,
        AditionalAddress: AditionalAddress,
        Profession: Profession,
        FirstName: firstname,
        MiddleName: middlename,
        LastName: lastname,
        Mobilenumber: mobilenumber,
        UserName: username,
        Country: selectedcountry,
        Province: selectedstate,
        City: selectedcity,
        PhoneNumber: phonenumber,
        Image: profileimagepath,
        IDImage: firstdocpath,
        DocumentImage: seconddocpath,
        EndDocumentImage: thirddocpath,
        Location: geolocation,
        IsWebsitePublic: isWebsitePublic,
        IsAddressPublic: isAddressPublic,
        IsProfessionPublic: isProfessionPublic,
        AreNumbersPublic: ArePhoneNumberPublic,
        ImageBase64: profileimageBase64,
        IDImageBase64: firstdocBase64,
        DocumentImageBase64: seconddocBase64,
        EndDocumentImageBase64: thirddocBase64,
        CountrywhereGovernmentIDIssued: list.user.countrywhereGovernmentIdissued,
        PhoneCode: list.user.phoneCode,
        MobileCode: list.user.mobileCode,
        IsMC: list.perimssions.isMc,
        IsMCPrime: list.perimssions.isMcprime,
        ProfileDescription:iddisc,
        DocumentDescription:docdisc,
        SecondDocumentDescription:secdocdisc,
        PicAvailability:list.perimssions.picAvailability,
        AreYouan:list.user.areYouan
      }
      let url = `${apiHost}/api/User/UpdateUser`;
      axios
        .post(url, obj, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((docSnap) => {
          context.dispatch({ Type: "NAVIGATION" });
          navigate(`/OrderCom?ID=${uid}&t=${Date.now()}`);
        }).catch((e)=>{
          //console.log(e)
        })
    }
  };
  useEffect(() => {
    Getdata();
  }, [null]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
    });
  }, [null]);
  function getlocation() {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state == "granted" || result.state == "prompt") {
          navigator.geolocation.getCurrentPosition(function (position) {
            setlat(position.coords.latitude);
            setlong(position.coords.longitude);
            fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`,
              { method: "GET" }
            )
              .then((res) => res.json())
              .then((data) => setgeolocation(data.display_name))
              .catch((err) => console.log(err));
          });
          //console.log("Avaiable");
        }
        else {
          alert('Please allow location access in your browser settings.');
        }
      });
  }

  useEffect(() => {
    setUid(window.location.search.split("=")[1]);
  }, [null]);
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////
  function useDisplayImage() {
    const [result, setResult] = useState("");

    function uploader(e) {
      const imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    return { result, uploader };
  }
  const { result, uploader } = useDisplayImage();
  /////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  function useDocDisplayImage() {
    const [Docresult, setDocResult] = useState("");

    function Docuploader(e) {
      setshow1stdocpic(true);
      if (e == pdfImage) {
        setDocResult(pdfImage);
      } else {
        const imageFile = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setDocResult(e.target.result);
        });

        reader.readAsDataURL(imageFile);
      }
    }

    return { Docresult, Docuploader };
  }
  const { Docresult, Docuploader } = useDocDisplayImage();
  //////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  function Secdocresult() {
    const [secDocresult, setsecDocResult] = useState("");

    function secDocuploader(e) {
      setshow2nddocpic(true);
      if (e == pdfImage) {
        setsecDocResult(pdfImage);
      } else {
        const imageFile = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setsecDocResult(e.target.result);
        });

        reader.readAsDataURL(imageFile);
      }
    }

    return { secDocresult, secDocuploader };
  }
  const { secDocresult, secDocuploader } = Secdocresult();
  //////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  function useIDDisplayImage() {
    const [IDresult, setIDResult] = useState("");

    function IDuploader(e) {
      setshow3rddocpic(true);

      if (e == pdfImage) {
        setIDResult(pdfImage);
      } else {
        const IDimageFile = e.target.files[0];

        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
          setIDResult(e.target.result);
        });

        reader.readAsDataURL(IDimageFile);
      }
    }

    return { IDresult, IDuploader };
  }
  const { IDresult, IDuploader } = useIDDisplayImage();
  //////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  const styles = {
    err: {
      borderColor: "#ff6969b5",
      borderWidth: "4px",
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
  //////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////
  useEffect(async () => {
    if (Object.keys(list).length != 0) {
      setfirstname(list.user.firstName);
      setmiddleName(list.user.middleName);
      setlastname(list.user.lastName);
      setmobilenumber(list.user.mobilenumber != null ? list.user.mobilenumber : "");
      setphonenumber(list.user.phoneNumber);
      setPhoneCode(list.user.phoneCode != null ? list.user.phoneCode : "");
      setMobCode(list.user.mobileCode);
      setemail(list.user.email);
      setpreviousemail(list.user.email);
      setusername(list.user.userName);
      setselectedcountry(list.user.country === "" ? list.user.AutoCountry : list.user.country);
      // let tempListOfCountries = Country;
      // for (let index = 0; index < tempListOfCountries.length; index++) {
      //   if (orderslist.giveCountry == tempListOfCountries[index]) {
      //     setgiveCountryId(index);
      //   }
      // }
      setselectedstate(list.user.province === "" ? list.user.AutoState : list.user.province);
      setselectedcity(list.user.city === "" ? list.user.AutoCity : list.user.city);
      setgeolocation(list.user.location === "" ? list.user.AditionalAddress : list.user.location);
      setAditionalAddress(list.user.aditionalAddress);
      setProfession(list.user.profession != null ? list.user.profession : "");
      setisProfessionPublic(list.perimssions.isProfessionPublic);
      setisAddressPublic(list.perimssions.isAddressPublic);
      setisWebsitePublic(list.perimssions.isWebsitePublic);
      setArePhoneNumberPublic(list.perimssions.areNumbersPublic);
      setwebsite(list.user.website != null ? list.user.website : "");
      setimage1(list.user.profileimagepath != null ? list.user.profileimagepath : "");
      setimage2(list.user.idimage != null ? list.user.idimage : "");
      setimage3(list.user.documentImage != null ? list.user.documentImage : "");
      setimage4(list.user.endDocumentImage != null ? list.user.endDocumentImage : "");
      setprofileImage(list.user.image0)
      setFirstFile(list.user.idimage ? list.user.idimage.split(":")[1] : "")
      setSecondFile(list.user.documentImage ? list.user.documentImage.split(":")[1] : "")
      setThirdFile(list.user.endDocumentImage ? list.user.endDocumentImage.split(":")[1] : "")
      setimagesourceurl1(list.user.image1)
      setimagesourceurl2(list.user.image2)
      setimagesourceurl3(list.user.image3)
    }
  }, [list]);

  useEffect(() => {
    axios
      .get(
        `https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json`
      )
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, [null]);

  useEffect(() => {
    handleCountry();
  }, [selectedcountry]);

  useEffect(() => {
    handleState();
  }, [selectedstate]);

  const Country = [...new Set(data.map((item) => item.country))];
  Country.sort();
  const handleCountry = (e) => {
    //console.log(`The Selected Country is ${selectedcountry}`);
    let states = data.filter((state) => state.country === selectedcountry);
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setState(states);
    //console.log("States are :", State);
  };
  const handleState = (e) => {
    //console.log(`The Selected State is ${selectedstate}`);
    let checkObj = {};
    let cities = data.filter((data) => {
      let duplicated = false;
      if (checkObj[data.name]) {
        duplicated = true;
      } else {
        checkObj[data.name] = true;
      }
      return data.subcountry === selectedstate && !duplicated;
    });
    //console.log("Cities are :", cities);
    cities.sort();
    setCity(cities);
  };

  useEffect(() => {
    if (confirmPassword != Password) setmissmsg("Password missmatch");
    else setmissmsg("");
  }, [Password, confirmPassword]);
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const updatepass = () => {

    const myString = currentpass;
    const hash = CryptoJS.MD5(myString);

    if (hash.toString() === list.user.pwd) {
      if (Password != "")
        if (Password.length > 7)
          if (format.test(Password))
            if (confirmPassword === Password) {
              setmissmsg("");
              let url = `${apiHost}/api/Authentication/UpdatePassword?ID=${Uid}&password=${confirmPassword}`;
              axios
                .post(url)
                .then((response) => {
                  navigate(`OrderCom?ID=${Uid}`)
                })
                .catch((error) => {
                  //console.log(error.text);
                });

              if (missmsg === "") {
                // window.location.href = `/editprofile?ID=${Uid}`;
              }
            } else {
              setmissmsg("Password mismatched");
              setTimeout(() => {
                setmissmsg("");
              }, 4000);
            }
          else {
            setemptymsg(
              "Your Password must contains at least 1 special character"
            );
            setTimeout(() => {
              setemptymsg("");
            }, 4000);
          }
        else {
          setemptymsg("Your Password should more than 7 characters");
          setTimeout(() => {
            setemptymsg("");
          }, 4000);
        }
      else {
        setemptymsg("Missing Field");
        setTimeout(() => {
          setemptymsg("");
        }, 4000);
      }
      setTimeout(() => {
        context.dispatch({ Type: "NAVIGATION" });
        context.dispatch({ Type: "NAVIGATION" });
        navigate(`/OrderCom?ID=${uid}&t=${Date.now()}`);
      }, 500);
      
    } else {
      setmsg("Enter Correct Password");
      setTimeout(() => {
        setmsg("");
      }, 4000);
    }
  };

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
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  useEffect(() => {
    //console.log();

    if (Password != confirmPassword) {
      document.getElementById("passmatch").style.display = "inline";
    } else {
      document.getElementById("passmatch").style.display = "none";
    }
  }, [confirmPassword]);

  const passerr = (Password) => {
    //console.log("passerr called/..");
    if (Password.length === 0) {
      document.getElementById("passempty").style.display = "inline";
    } else {
      document.getElementById("passempty").style.display = "none";
    }
    if (Password.length < 7) {
      document.getElementById("passlength").style.display = "inline";
    } else {
      document.getElementById("passlength").style.display = "none";
    }
    if (!format.test(Password)) {
      document.getElementById("passspecial").style.display = "inline";
    } else {
      document.getElementById("passspecial").style.display = "none";
    }
  };
  const sendEmail = async (e) => {
    e.preventDefault();
    if (checkcode == Verifycode) {
      document.getElementById("email").disabled = false;
      document.getElementById("codebutton").className = "verifybtnedit";
      document.getElementById("codebutton").innerHTML = "verify";
      document.getElementById("tick").style.display = "none";
      setcheckcode(" ");
      setverifycode("");
    } else {
      // let val = Math.floor(1000 + Math.random() * 9000);
      let val = Math.floor(1000 + Math.random() * 9000);
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
        let url = `${apiHost}/api/User/GetUserById?UserId=${Uid}`;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
          .then(async (docSnap) => {
            if (docSnap.data.length >= 1 && email != previousemail) {
              document.getElementById("emailcheck").style.display = "block";
              setTimeout(() => {
                document.getElementById("emailcheck").style.display = "none";
              }, 6000);
            } else {
              let url = `${apiHost}/api/Email/SendVerificationEmail?toEmail=${email}&code=${val}`;
              axios
                .post(url)
                .then(async (response) => {
                  setshowform(true);
                  setcheckEmail(email);

                  document.getElementById("codebutton").style.display = "none";
                  document.getElementById("sendcodemsg").style.display =
                    "block";
                  setTimeout(() => {
                    document.getElementById("sendcodemsg").style.display =
                      "none";
                  }, 6000);
                  //console.log(response.data);
                })
                .catch((error) => {
                  //console.log(error.text);
                });
            }
          });
      }
    }
  };

  return (
    <div className="container">
      {/* <SignUp /> */}
      <Modal show={showModal} onHide={hideModal} size="md">
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
            style={{ width: "20%" }}
            onClick={confirmModal}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Accordion defaultActiveKey="0" style={{ marginTop: "20px" }}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Personal Information</Accordion.Header>
          <Accordion.Body>
            <Row className="centeritem">
              <Col className="formbg">
                <Form ref={form} className="forminput radius">
                  <div className="">
                    <div style={{}}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <div
                          style={{
                            margin: "auto",
                            border: "2px #61616159 solid",
                            borderRadius: "248px",
                          }}
                        >
                          {result == "" ?
                            (
                              <img
                                style={{
                                  height: "140px",
                                  width: "140px",
                                  borderRadius: "248px"
                                }}
                                ref={imageRef}
                                src={profileImage === "" ? Picture : profileImage}
                                alt=""
                              />
                            ) : (
                              <img
                                style={{
                                  height: "140px",
                                  width: "140px",
                                  borderRadius: "248px"
                                }}
                                ref={imageRef}
                                src={result}
                                alt=""
                              />
                            )
                          }
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          margin: "auto"
                        }}
                      >
                        <div style={{ width: "fit-content", margin: "auto" }}>
                          <input
                            onChange={(e) => {
                              setprofileimagesource(e.target.files);
                              uploader(e);
                            }}
                            accept="image/png, image/gif, image/jpeg"
                            type="file"
                            className="custom-file-input mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    <Row>
                      <Col>
                        <span>*First Name</span>
                        <Form.Group
                          onChange={(e) => {
                            setfirstname(e.target.value);
                          }}
                          controlId="FirstName"
                        >
                          <Form.Control
                            style={firstnameerr === "" ? null : Style.err}
                            value={firstname}
                            type="text"
                          />
                        </Form.Group>
                        <span
                          id="firstname"
                          style={{
                            color: "red",
                            fontWeight: "450"
                            ,fontStyle:"italic"
                          }}
                        >
                          {firstnameerr}
                        </span>
                      </Col>
                      <Col>
                        <span>Middle Name</span>
                        <Form.Group
                          onChange={(e) => {
                            setmiddleName(e.target.value);
                          }}
                          controlId="MiddleName"
                        >
                          <Form.Control
                            value={middlename}
                            type="Middle Name"
                            placeholder="Middle Name"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <span>*Last Name</span>
                        <Form.Group
                          onChange={(e) => {
                            setlastname(e.target.value);
                          }}
                          className=""
                          controlId="LastName"
                        >
                          <Form.Control
                            style={lastnameerr === "" ? null : Style.err}
                            value={lastname}
                            type="text"
                          />
                        </Form.Group>
                        <span
                          id="lastname"
                          style={{
                            color: "red",
                            fontWeight: "450",
                            fontStyle:"italic"
                          }}
                        >
                          {lastnameerr}
                        </span>
                      </Col>
                    </Row>
                    <div className="">
                      <Row className="mt-3">
                        <label>*Enter Location</label>
                        <InputGroup className="">
                          <Form.Control
                            style={locationerr === "" ? null : Style.err}
                            onChange={(e) => {
                              setgeolocation(e.target.value);
                              //console.log(`Location is ${e.target.value}`);
                            }}
                            value={geolocation}
                            aria-label="Current Location"
                          />
                          <InputGroup.Text
                            onClick={getlocation}
                            className="inputicon"
                          >
                            <img src={Location} alt="logo" />
                          </InputGroup.Text>
                        </InputGroup>
                        <span
                          id="location"
                          style={{
                            color: "red",
                            fontWeight: "450",
                            fontStyle:"italic"
                          }}
                        >
                          {locationerr}
                        </span>
                      </Row>
                    </div>

                    <Row className="textcenter mb-3">
                      <Col style={{ marginTop: "10px", textAlign: "left" }}>
                        <span>*Country</span>
                        <Form.Select
                          style={countryerr === "" ? null : Style.err}
                          // value={country}
                          onChange={(e) => setselectedcountry(e.target.value)}
                          aria-label="Country"
                          value={selectedcountry}
                        >
                          <option value="">Select Country</option>
                          {Country.map((item, key) => (
                            <option value={country} key={key}>
                              {item}{" "}
                            </option>
                          ))}
                        </Form.Select>
                        <span
                          id="country"
                          style={{
                            color: "red",
                            fontWeight: "450",
                            fontStyle:"italic"
                          }}
                        >
                          {countryerr}
                        </span>
                      </Col>
                      <Col style={{ marginTop: "10px", textAlign: "left" }}>
                        <span>*State</span>
                        <Form.Select
                          style={stateerr === "" ? null : Style.err}
                          onChange={(e) =>
                            setselectedstate(
                              selectedstate === selectedstate
                                ? e.target.value
                                : selectedstate
                            )
                          }
                          aria-label="State/Province"
                          value={selectedstate}
                        >
                          <option value="null">State/Province</option>

                          {State.map((items, key) => (
                            <option value={items} key={items}>
                              {items}{" "}
                            </option>
                          ))}
                        </Form.Select>
                        <span
                          id="state"
                          style={{
                            color: "red",
                            fontWeight: "450",
                            fontStyle:"italic"
                          }}
                        >
                          {stateerr}
                        </span>
                      </Col>
                      <Col style={{ marginTop: "10px", textAlign: "left" }}>
                        <span style={{}}>*City</span>
                        <Form.Select
                          style={cityerr === "" ? null : Style.err}
                          onChange={(e) =>
                            setselectedcity(
                              selectedcity === selectedcity
                                ? e.target.value
                                : selectedcity
                            )
                          }
                          aria-label="City"
                          value={selectedcity}
                        >
                          <option value="">City</option>
                          {city.map((items, key) => (
                            <option value={items.name} key={key}>
                              {items.name}{" "}
                            </option>
                          ))}
                        </Form.Select>
                        <span
                          id="city"
                          style={{
                            color: "red",
                            fontWeight: "450",
                            fontStyle:"italic"
                          }}
                        >
                          {cityerr}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span>Preferred UserName</span>
                        <Form.Group
                          onChange={(e) => {
                            setusername(e.target.value);
                          }}
                          className="mb-3"
                          controlId="LastName"
                        >
                          <Form.Control
                            disabled
                            value={username}
                            type="text"
                            placeholder="*Last Name"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span>*Email</span>
                        <Form.Group className="mb-3" controlId="E-mail">
                          <Form.Control
                            id="email"
                            onChange={(e) => {
                              setemail(e.target.value);
                              //console.log(`E-mail is ${e.target.value}`);
                            }}
                            value={email}
                            name="user_email"
                            type="text"
                            disabled
                            placeholder="Email"
                          />
                          <div className="tick-icon">
                            <img
                              id="tick"
                              style={{ width: "26px" }}
                              src={Tick}
                            />
                          </div>
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
                            style={
                              showform === true ? styles.show : styles.hide
                            }
                            name="message"
                          >
                            Enter Verification Code
                          </lable>

                          <Form.Control
                            id="verificationCode"
                            as={NumberFormat}
                            style={
                              showform === true ? styles.show : styles.hide
                            }
                            onChange={(e) => {
                              setcheckcode(e.target.value);
                              if (e.target.value != Verifycode) {
                                document.getElementById(
                                  "codeerr"
                                ).style.display = "none";
                              }
                            }}
                            value={checkcode}
                          />
                        </Form.Group>
                        <span
                          id="codeerr"
                          style={{ display: "none", color: "red" }}
                        >
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
                        <h6 style={{ color: "red",fontStyle:"italic" }}>{emailerr}</h6>
                      </Col>
                      <Col
                        style={{ textAlign: "center", marginBottom: "10px" }}
                        sm={4}
                      >
                        <div
                          id="codebutton"
                          onClick={sendEmail}
                          className="btnverifygreyededit"
                        >
                          Verified/Change
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Row>
                          <label>*Mobile number</label>
                        </Row>
                        <Row>
                          <Col sm={list.Mobilenumber === mobilenumber ? 12 : 8}>
                            <InputGroup className="mb-3">
                              <InputGroup.Text>
                                {MobCode}
                              </InputGroup.Text>
                              <FormControl
                                id="mobileNumber"
                                onChange={(e) => {
                                  setmobilenumber(e.target.value);
                                }}
                                style={mobilererr === "" ? null : Style.err}
                                value={mobilenumber}
                                type="text"
                                placeholder=""
                              />
                              <span
                                id="number"
                                style={{
                                  color: "red",
                                  fontWeight: "450",
                                  fontStyle:"italic"
                                }}
                              >
                                {mobilererr}
                              </span>
                            </InputGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Row>
                          <label>Phone Number</label>
                        </Row>

                        <Row>
                          <Col>
                            <InputGroup className="mb-3">
                              <InputGroup.Text>
                                {PhoneCode == ""
                                  ? MobCode
                                  : PhoneCode}
                              </InputGroup.Text>
                              <FormControl
                                id="phoneNumber"
                                onChange={(e) => {
                                  setphonenumber(e.target.value);
                                }}
                                // style={mobilererr === "" ? null : Style.err}
                                value={phonenumber}
                                type="text"
                                placeholder=""
                              />
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row
                          className="checkboximg mb-4"
                        // style={{ marginTop: -15, marginLeft: 1 }}
                        >
                          <Col>
                            <input
                              onClick={() => {
                                if (ArePhoneNumberPublic) {
                                  setArePhoneNumberPublic(false);
                                } else {
                                  setArePhoneNumberPublic(true);
                                }
                              }}
                              checked={ArePhoneNumberPublic}
                              type={"checkbox"}
                            />{" "}
                            Make these numbers public
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item style={{ marginTop: "20px" }} eventKey="1">
          <Accordion.Header>Update Password</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row>
                <label>Current Password</label>
                <Col>
                  <InputGroup onChange={(e) => setcurrentpass(e.target.value)}>
                    <Form.Control
                      value={currentpass}
                      placeholder="Enter Your Current Password"
                    ></Form.Control>
                  </InputGroup>
                  <label style={{ color: "#ff6666" }}>{msg}</label>
                </Col>
              </Row>

              <Row style={{ marginTop: "1%" }}>
                <label>Enter New Password</label>
                <Col>
                  <InputGroup
                    onChange={(e) => {
                      passerr(e.target.value);
                      setPassword(e.target.value);
                    }}
                  >
                    <Form.Control
                      value={Password}
                      // onchange={passerr}
                      type={type}
                      placeholder="Enter Your new Password"
                    />
                    {type === "password" ? (
                      <div className="eye-icon">
                        <i onClick={changetype} className="fa fa-eye-slash"></i>
                      </div>
                    ) : (
                      <div className="eye-icon">
                        <i onClick={changetypepass} className="fa fa-eye"></i>
                      </div>
                    )}
                  </InputGroup>
                  <label style={{ color: "#ff6666" }}>{emptymsg}</label>
                </Col>
                <span id="passempty" style={{ color: "red", display: "none" }}>
                  * Password cannot be empty
                </span>

                <span id="passlength" style={{ color: "red", display: "none" }}>
                  * Password must be more than 7 characters
                </span>
                <span
                  id="passspecial"
                  style={{
                    color: "red",
                    display: "none",
                    marginBottom: "10px",
                  }}
                >
                  * Atleast 1 special character is recommended
                </span>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <label>Confirm Password</label>

                <Col>
                  <InputGroup
                  // onChange={(e) => setconfirmPassword(e.target.value)}
                  >
                    <Form.Control
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                      type={type1}
                    />{" "}
                    {type1 === "password" ? (
                      <div className="eye-icon">
                        <i
                          onClick={changetype1}
                          className="fa fa-eye-slash"
                        ></i>
                      </div>
                    ) : (
                      <div className="eye-icon">
                        <i onClick={changetypepass1} className="fa fa-eye"></i>
                      </div>
                    )}
                  </InputGroup>
                  <span
                    id="passmatch"
                    style={{ color: "red", display: "none" }}
                  >
                    * Password mismatch
                  </span>
                </Col>
              </Row>
              <Row
                className="mt-3"
                style={{ textAlign: "right", justifyContent: "right" }}
              >
                <Col md={3}>
                  <Button onClick={updatepass} variant="success">
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item style={{ marginTop: "20px" }} eventKey="3">
          <Accordion.Header>Additional Information</Accordion.Header>
          <Accordion.Body>
            <div style={{ marginTop: "10px" }} className=" p-3">
              <Row className="mt-3">
                <Col>
                  <h5 className="mb-3"> Promotional Material (Optional)</h5>
                </Col>
              </Row>
              {/* <Row> */}
              {/* ////////////////////////////////// */}
              <Row>
                <Col>
                  <Row>
                    <input
                      accept="image/*,application/pdf"
                      type="file"
                      id="firstDocument"
                      className="custom-file-input mb-2"
                      style={{ marginLeft: "12px" }}
                      onChange={(e) => {
                        list["image1"] = "";
                        let image = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(image);

                        reader.addEventListener("loadend", () => {
                          //console.log(reader.result);
                          setimagesource1(e.target.files);
                          let firstFile = e.target.files[0].name;
                          setFirstFile(firstFile);
                          setshow1stFile(true);
                          setimagesourceurl1(reader.result);
                        });
                        reader.removeEventListener("loadend");
                      }}
                    />
                    {show1stFile === true ? (
                      <strong className="strong_file mt-2">
                        <a
                          href={imagesourceurl1}
                          target="_blank"
                        >
                          {firstFile.length > 14 ? firstFile.substring(0, 9) + "..." : firstFile}
                        </a>
                        <img
                          src={Cencle}
                          style={{
                            width: "18px",
                            float: "right",
                          }}
                          onClick={() => {
                            document.getElementById("firstDocument").value =
                              null;
                            setshow1stFile(false);
                            setFirstFile("");
                            setimage2("")
                            setimagesource1([]);
                          }}
                        />
                      </strong>
                    ) : null}
                  </Row>
                  <Row
                    className="checkboximg mb-4"
                    style={{ marginTop: -14, marginLeft: 1 }}
                  >
                    <InputGroup
                      style={{ padding: "0px" }}
                      className="mt-2 mb-1"
                    >
                      <FormControl
                        onChange={(e) => setiddisc(e.target.value)}
                        value={iddisc}
                        placeholder="Description"
                      />
                    </InputGroup>
                  </Row>
                </Col>
                <Col>
                  <div>
                    <Row>
                      <input
                        accept="image/*,application/pdf"
                        type="file"
                        id="secondDocument"
                        className="custom-file-input mb-2"
                        style={{ marginLeft: "12px" }}
                        onChange={(e) => {
                          list["image2"] = "";
                          const reader = new FileReader();
                          let image = e.target.files[0];
                          reader.readAsDataURL(image);
                          reader.addEventListener("loadend", () => {
                            setimagesource2(e.target.files);
                            setimagesourceurl2(reader.result);
                            let secondFile = e.target.files[0].name;
                            setshow2ndFile(true);
                            setSecondFile(secondFile);
                          });
                          reader.removeEventListener("loadend");
                        }}
                      />
                      {show2ndFile === true ? (
                        <>
                          <strong className="strong_file mt-2">
                            <a href={imagesourceurl2} target="_blank">
                              {secondFile.length > 14 ? secondFile.substring(0, 9) + "..." : secondFile}
                            </a>
                            <img
                              src={Cencle}
                              style={{
                                width: "18px",
                                float: "right",
                              }}
                              onClick={() => {
                                document.getElementById(
                                  "secondDocument"
                                ).value = null;
                                setshow2ndFile(false);
                                setSecondFile("");
                                setimagesource2([]);
                                setimage3("")
                              }}
                            />
                          </strong>
                        </>
                      ) : null}
                    </Row>
                    <Row
                      className="checkboximg mb-4"
                      style={{ marginTop: -14, marginLeft: 1 }}
                    >
                      <InputGroup
                        style={{ padding: "0px" }}
                        className="mt-2 mb-1"
                      >
                        <FormControl
                          onChange={(e) => setdocdisc(e.target.value)}
                          value={docdisc}
                          placeholder="Description"
                        />
                      </InputGroup>
                    </Row>
                    <Col md={6}></Col>
                  </div>
                  {/* ) : null} */}
                </Col>
                <Col>
                  <Row>
                    <input
                      accept="image/*,application/pdf"
                      type="file"
                      style={{ marginLeft: "12px" }}
                      id="thirdDoucument"
                      className="custom-file-input mb-2"
                      onChange={(e) => {
                        list["image3"] = "";
                        let image = e.target.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(image);
                        reader.addEventListener("loadend", () => {
                          setimagesource3(e.target.files);
                          setimagesourceurl3(reader.result);
                          let thirdFile = e.target.files[0].name;
                          setThirdFile(thirdFile);
                          setshow3rdFile(true);
                        });
                        reader.removeEventListener("loadend");
                      }}
                    />
                    {show3rdFile === true ? (
                      <strong className="strong_file mt-2">
                        <a href={imagesourceurl3} target="_blank">
                          {thirdFile.length > 14 ? thirdFile.substring(0, 9) + "..." : thirdFile}
                        </a>
                        <img
                          src={Cencle}
                          style={{
                            width: "18px",
                            float: "right",
                          }}
                          onClick={() => {
                            document.getElementById("thirdDoucument").value =
                              null;
                            setshow3rdFile(false);
                            setThirdFile("");
                            setimagesource3([]);
                            setimage4("")
                          }}
                        />
                      </strong>
                    ) : null}
                  </Row>
                  <Row
                    className="checkboximg mb-4"
                    style={{ marginTop: -14, marginLeft: 1 }}
                  >
                    <InputGroup
                      style={{ padding: "0px" }}
                      className="mt-2 mb-1"
                    >
                      <FormControl
                        onChange={(e) => setsecdocdisc(e.target.value)}
                        value={secdocdisc}
                        placeholder="Description"
                      />
                    </InputGroup>
                  </Row>
                </Col>
                {/* ) : null} */}
              </Row>
              <Row>
                <Row>
                  <Col>
                    <label>Address</label>
                    <Form.Group className="mb-3" controlId="Address">
                      <Form.Control
                        onChange={(e) => {
                          setAditionalAddress(e.target.value);
                          //console.log(`Address is ${e.target.value}`);
                        }}
                        value={AditionalAddress}
                        type="text"
                        maxLength={200}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row
                  className="checkboximg mb-4"
                // style={{ marginTop: -15, marginLeft: 1 }}
                >
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
                <Row>
                  <Col>
                    <label>Website</label>
                    <Form.Group className="mb-3" controlId="Website">
                      <Form.Control
                        onChange={(e) => {
                          setwebsite(e.target.value);
                          //console.log(`Website is ${e.target.value}`);
                        }}
                        value={website}
                        type="text"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row
                  className="checkboximg mb-4"
                // style={{ marginTop: -15, marginLeft: 1 }}
                >
                  <Col>
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
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="Profession ID">
                    <Form.Control
                      onChange={(e) => {
                        setProfession(e.target.value);
                      }}
                      value={Profession}
                      placeholder="Profession"
                      type="text"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row
                className="checkboximg mb-4"
              // style={{ marginTop: -15, marginLeft: 1 }}
              >
                <Col>
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
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Row
        className="mt-3 mb-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "70px",
          paddingRight: "35px",
        }}
      >
        <Col md={4}>
          <Button style={{ textTransform: "capitalize" }} onClick={deactivate}>
            {" "}
            Delete account
          </Button>
        </Col>
        <Col md={2}>
          <Button style={{ textTransform: "capitalize" }} onClick={Update}>
            {" "}
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}
export default Editprofile;
