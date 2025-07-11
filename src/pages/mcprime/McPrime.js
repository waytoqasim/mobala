import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ShimmerBadge, ShimmerButton, ShimmerThumbnail } from "react-shimmer-effects";
import "../../App.css";
import { AppContext } from "../../Context";
import APIURLS from '../../apiurls';
import info from "../../asstes/Iinfo.svg";
import close from "../../asstes/close.svg";
import { Codes } from "../../components/CountryCodes";
import { Currencies } from "../../components/Currencies";
import BundleSwitch from '../../components/mcprime/BundleSwitch';
import CountryCurrencySelection from "../../components/mcprime/CountryCurrencySelection";
import ErrorNotification from '../../components/mcprime/ErrorNotification';
import InfoModal from "../../components/mcprime/InfoModal";
import OrdersSection from '../../components/mcprime/OrdersSection';
import Pagination from '../../components/mcprime/Pagination';
import Permissions from '../../components/mcprime/Permissions';
import SearchFilter from '../../components/mcprime/SearchFilter';
import { Cities as cityData } from "../../components/newCountry";
import { apiInterceptor } from '../../service/ApiService';

function MCPrime(props) {
  const context = useContext(AppContext);
  const [passcode, setPasscode] = useState("");
  const [Countries, setCountries] = useState([]);
  const [selectedcountry, setSelectedcountry] = useState("");
  const [currency, setcurrency] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [orderList, setorderList] = useState([]);
  const [permssions, setPermssions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [requestIsLoading, setRequestIsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [errorPasscode, setErrorPasscode] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("UserID"));
  const [showModal, setShowModal] = useState(false);
  const [password, setUserPassword] = useState(null);

  const [mcCountries, setMcCountries] = useState([]);
  const [mcCurrencies, setMcCurrencies] = useState([]);

  const [userName, setUserName] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");
  const [isExcludeMc, setisExcludeMc] = useState(false);
  const [isOnlyMc, setisOnlyMc] = useState(false);
  const [isSwitchOn, setisSwitchOn] = useState(false);
  const [isCountrySwitchOn, setIsCountrySwitchOn] = useState(false);
  const [isProfitSort, setIsProfitSort] = useState(false);
  const [bundleError, setbundleError] = useState("");
  const [partyBundleError, setpartyBundleError] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [profitOrderList, setProfitOrderList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;


  const indexOfLastPost = currentPage * postsPerPage;
  // calculating first post index
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);
  const x_countries = currentPosts.filter(country => country.giveCountry !== country.takeCountry);
    const same_countries = currentPosts.filter(country => country.giveCountry === country.takeCountry);
    const distanceSortXCountries = x_countries.slice().sort((a, b) => a.givecitydistance - b.givecitydistance);
    const distanceSortSameCountries = same_countries.slice().sort((a, b) => a.givecitydistance - b.givecitydistance);
    const profitSortXCountries = x_countries.slice().sort((a, b) => {
      const profitA = profitOrderList.find(profit => profit.orderId === a.orderId)?.profit || 0;
      const profitB = profitOrderList.find(profit => profit.orderId === b.orderId)?.profit || 0;
      return profitB - profitA;
    })
    const profitSortSameCountries = same_countries.slice().sort((a, b) => {
      const profitA = profitOrderList.find(profit => profit.orderId === a.orderId)?.profit || 0;
      const profitB = profitOrderList.find(profit => profit.orderId === b.orderId)?.profit || 0;
      return profitB - profitA;
    })
  const totalPages = Math.ceil(filteredList.length / postsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //////////////////
  const [showRequestPassCodeBtn, setShowRequestPassCodeBtn] = useState(false);
  /////////////////

  const switchElement = document.getElementById("customSwitches");

  const [showBundle, setShowBundle] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [bundles, setBundles] = useState([]);

  const toggleBundle = (index) => {
    setExpandedItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    if (context.applicationStore.Permissions !== undefined) {
      console.log(context.applicationStore.Permissions);
      setPermssions(context.applicationStore.Permissions);
    }
  }, [context.applicationStore.Permissions]);

  useEffect(() => {
    if (context.applicationStore.matchOrder !== undefined) {
      let order = context.applicationStore.matchOrder;
      let currencies = [];
      let countries = [];
      mcCurrencies.forEach((d) => {
        currencies.push(d.currency.split(" ")[0]);
      });
      mcCountries.forEach((d) => {
        countries.push(d.countries);
      });
      if (
        currencies.includes(order.giveCurrency || order.takeCurrency) &&
        countries.includes(order.takeCountry || order.giveCountry)
      ) {
        let userCoordinates = sessionStorage.getItem("UserCoordinates");
        let dd = new Date(order.untilGoodDate);
        let date = dd.toDateString().split(" ");
        date = date[1] + " " + date[2] + ", " + date[3];
        order.untilGoodDate = date;
        order.takeAmount = parseInt(order.takeAmount.replaceAll(",", ""));
        order.giveAmount = parseInt(order.giveAmount.replaceAll(",", ""));
        order["alreadyCreated"] = null;
        order["givecitydistance"] = getDistance(
          order.giveCityLatLon,
          JSON.parse(userCoordinates)
        );
        order["takecitydistance"] = getDistance(
          order.takeCityLatLon,
          JSON.parse(userCoordinates)
        );
        setorderList([...orderList, order]);
      }
    }
  }, [context.applicationStore.matchOrder, mcCountries, mcCurrencies], orderList);

  const getCurrencyCode = (countrywhereGovernmentIdissued) => {
    return Codes.filter(
      (item) => item[0] === countrywhereGovernmentIdissued
    ).flat()[2];
  };

  useEffect(() => {
    getMcOrders();
    sessionStorage.setItem("previousPathName", window.location.pathname);
  }, [],Navigate, getMcOrders, getMcOrders, getMcOrders);

  useEffect(() => {
    document.getElementById("root").scrollTop = 0;
  }, [currentPage]);

  useEffect(() => {
    // //console.log(userFilter === null);
    let tempList = orderList.filter((x) => {
      debugger
      var includeItem = true;
      includeItem =
        (userFilter === null ||
          userFilter === "" ||
          x.userName.toLowerCase().includes(userFilter.toLowerCase())) &&
        (selectedOption === "All" ||
          (selectedOption === "Exclude MCs" && !(x.isMC === true)) ||
          (selectedOption === "Only MCs" && x.isMC === true));
      return includeItem;
    });
    setFilteredList(tempList);
  }, [selectedOption, orderList, userFilter]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "Exclude MCs") {
      setisExcludeMc(true);
      setisOnlyMc(false);
    } else if (e.target.value === "Only MCs") {
      setisExcludeMc(false);
      setisOnlyMc(true);
    } else {
      setisExcludeMc(false);
      setisOnlyMc(false);
    }
  };

  useEffect(() => {
    if (isSwitchOn && expandedItems === null) {
      setbundleError(
        "You are not subscribed to Bundle alerts for paid subscribers"
      );
    } else if (isSwitchOn) {
      setpartyBundleError(
        "3-party: You are not subscribed to 3-party Bundle alerts for paid subscribers"
      );
      setbundleError("");
    } else {
      setbundleError("");
      setpartyBundleError("");
    }
  }, [isSwitchOn, expandedItems, setbundleError, setpartyBundleError]);

  useEffect(() => {

    apiInterceptor.get(APIURLS.MCPRIME.GETMCCOUNTRIES(userId))
      .then((res) => {
        let arr = []
        for(let i = 0; i<res.data.length;i++)
        {
          if (!arr.some(item => item.countries === res.data[i].countries)) {
            arr.push(res.data[i]);
          }
        }
        setMcCountries(arr);
      })
      .catch((e) => {
        setIsLoading(false);
      });

    getCountry();
    getCountryCode();
  }, [], userId);

  const getCountry = () => {
    let countries = cityData.map((d) => d.country);
    countries = [...new Set(countries)];
    countries = countries.sort();
    setCountries(countries);
  };

  const getCountryCode = (give, take) => {
    let result = ["", "", ""];
    for (let index = 0; index < Codes.length; index++) {
      const element = Codes[index][0];
      if (element === give) {
        result[0] = Codes[index][1];
      }
      if (element === take) {
        result[1] = Codes[index][1];
      }
    }
    return result;
  };

  useEffect(() => {
    apiInterceptor.get(APIURLS.MCPRIME.GETMCCOUNTRIES(userId))
      .then((res) => {
        let match = [];
        for (const currency of Currencies) {
          res.data.forEach((element) => {
            if (currency.includes(element.currency)) {
              match.push({ currency: currency });
            }
          });
          // setMcCurrencies(match);
        }
        setMcCurrencies(match);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, [], userId);

  const toggleContent = () => {
    setShowModal(true);
  };

  const hideModal = () => {
    setShowModal(false);
  };


  // const primeService = () => {
  //   document.getElementById("primeservice").style.display = "block";
  //   document.getElementById("Normalbtn").disabled = true;
  //   document.getElementById("Normalbtn").checked = false;
  // };
  // const noprimeService = () => {
  //   document.getElementById("noprimeservice").style.display = "block";
  //   document.getElementById("Addbtn").disabled = true;
  //   document.getElementById("Addbtn").checked = false;
  // };

  // const notUnderConstruction = () => {
  //   document.getElementById("Addbtn2").disabled = true;
  //   document.getElementById("Addbtn2").checked = false;
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function requestPassCode() {
    setShowRequestPassCodeBtn(true);
  }

  function noPassCode() {
    setShowRequestPassCodeBtn(false);
  }

  useEffect(() => {
    if (passcode.length === 7) confirmPasscode();
  }, [passcode], confirmPasscode, confirmPasscode, Permissions);

  useEffect(() => {
    //console.log(permssions)
  }, [permssions]);

  const PrimePasscode = () => {
    setRequestIsLoading(true);
    
      apiInterceptor.post(APIURLS.MCPRIME.MAKEMCPRIME(userId),{})
      .then((res) => {
        console.log(res);
        context.dispatch({
          Type: "PERMISSION",
          Payload: { ...permssions, isMcprime: true },
        });
        setRequestIsLoading(false);
      })
      .catch((e) => {
        setRequestIsLoading(false);
      });
  };

  function confirmPasscode() {
    setIsLoading(true);
    
      apiInterceptor.post(APIURLS.MCPRIME.CHECKPASSCODE(userId,passcode),{})
      .then((res) => {
        if (res.data === true) {
          setIsLoading(false);
          context.dispatch({
            Type: "PERMISSION",
            Payload: { ...permssions, isMcprimeAuthenticated: true },
          });
        } else {
          setIsLoading(false);
          setErrorPasscode("Passcode incorrect");
          // setTimeout(() => {
          //   setError("");
          // }, 1000);
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }

  function AddMCCountry(mcCountries) {
    return new Promise((resolve, reject) => {
      let countries = [];
      if (mcCountries.length > 3) {
        let arr = mcCountries;
        arr.pop();
        setMcCountries(arr);
        setError("Maximum limit reached");
        setOrdersLoading(false)
        // return;
      } else {
        for (let i = 0; i < mcCountries.length; i++) {
          countries.push(mcCountries[i].countries);
        }
        let obj = {
          UserId: userId,
          Countries: countries,
          Email: sessionStorage.getItem("email"),
        };
       
          apiInterceptor.post(APIURLS.MCPRIME.UPDATEMCCOUNTRIES,obj)
          .then((response) => {
            // setMcCountries(response.data);
            resolve(response.data);
            //setRequested(true);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  const removeCountry = (countryName) => {
    const updatedCountries = mcCountries.filter(
      (x) => x.countries !== countryName
    );
    setMcCountries(updatedCountries);
  };

  function AddMCCurrencies(currencyArr) {
    return new Promise((resolve, reject) => {
      let currencies = [];
      if (currencyArr.length > 0) {
        for (let i = 0; i < currencyArr.length; i++) {
          currencies.push(currencyArr[i].currency.split(" ")[0]);
        }

        
          apiInterceptor.post(APIURLS.MCPRIME.UPDATEMYCURRENCIES,{
            userId: userId,
            currencies: currencies,
          })
          .then(function (response) {
            resolve(response.data);
            getMcOrders();
          })
          .catch(function (error) {
            reject(error);
          });
      } else {
        resolve("data not stored");
      }
    });
  }
  function getEachOrderProfitValue(orderId) {
        
          apiInterceptor.get(APIURLS.MCPRIME.GETEACHORDERPROFITVALUE(orderId))
          .then((response) => {
            // console.log(`The Profit of ${orderId} is ${response.data}`);
            setProfitOrderList((prevProfits) => [
              ...prevProfits,
              { "orderId": orderId, "profit": response.data },
            ]);
          }).catch((error) => {
            console.log("Error : ", error.message);
          })
      }
  function getMcOrders() {
   
      apiInterceptor.get(APIURLS.MCPRIME.GETMCORDERS(userId))
      .then((res) => {
        setIsLoading(false);
        var datalist = res.data;
        var userCoordinates = sessionStorage.getItem("UserCoordinates");
        datalist.forEach((d, i) => {
          getEachOrderProfitValue(d.orderId);
          let dd = new Date(d.untilGoodDate + "Z");
          let date = dd.toDateString().split(" ");
          date = date[1] + " " + date[2] + ", " + date[3];
          d.untilGoodDate = date;
          datalist[i]["givecitydistance"] = getDistance(
            JSON.parse(d.giveCityLatLon),
            JSON.parse(userCoordinates)
          );
          datalist[i]["takecitydistance"] = getDistance(
            JSON.parse(d.takeCityLatLon),
            JSON.parse(userCoordinates)
          );
        });

        setorderList(datalist);
        datalist.map((d, i) => {
          debugger;
          d.bundles = datalist.filter((x) => {
            return (
              x.giveCurrency === d.takeCurrency &&
              d.giveCurrency === x.takeCurrency &&
              x.userid !== d.userid
            );
          });
        });
        datalist = datalist.filter((x) => {
          return x.bundles.length > 1;
        });
        //console.log("bundles=>", datalist);
        debugger;
        setBundles(datalist);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }

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

  function RequestPasscodeAgain() {
    
      apiInterceptor.post(APIURLS.MCPRIME.REQUESTPASSWORDAGAIN(userId,password),{})
      .then((res) => {})
      .catch((e) => {});
  }

  function filterByUserName(user) {
    setUserFilter(user);
  }

  // function GetBundleData() {
  //   // , "expired"
  //   apiInterceptor.get(APIURLS.RATES.GETRATES).then((response) => {
  //     let orders = [...orderList];
  //     orders.forEach((order) => {
  //       let repOrders = orderList.filter((x) => {
  //         return (
  //           order.giveCurrency === x.takeCurrency &&
  //           order.takeCurrency === x.giveCurrency
  //         );
  //       });
  //       order["bundles"] = repOrders;
  //     });
  //     orders = orderList.filter((x) => {
  //       return x.bundles.length !== 0;
  //     });
  //     // //console.log(orders);
  //     // setorderList(orders)
  //   });
  // }

  useEffect(() => {
    console.log(Permissions);
  }, [Permissions]);

  return (
    <div className="container" style={{ marginTop: 90 }}>
       <div id="orderFX1">
       <InfoModal close={close} showModal={showModal} hideModal={hideModal} />
      </div>
      
      <Permissions 
      permssions={permssions}
      Permissions={Permissions}
      showRequestPassCodeBtn={showRequestPassCodeBtn}
      requestIsLoading={requestIsLoading}
      noPassCode={noPassCode}
      requestPassCode={requestPassCode}
      PrimePasscode={PrimePasscode}
    />
      {permssions.isMcprimeAuthenticated ? (
        <div id="accordions">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginLeft: "-36px"}}>
            <div style={{ marginTop: 10 }}>
              <a
                className="btn-option"
                style={{ textAlign: "center" }}
                onClick={toggleContent}
              >
                <img
                  src={info}
                  className="info ml-5"
                  alt="logo"
                  style={{ width: "30px" }}
                />
              </a>
            </div>
            <div>
                <p className="text-center mt-4" style={{ fontWeight: "bold" }}>
                  Get Prime Deals pipeline using criteria below
                </p>
            </div>
            <div></div>
          </div>

          <div className="ContainerSmooth">
      <CountryCurrencySelection
        mcCountries={mcCountries}
        setMcCountries={setMcCountries}
        mcCurrencies={mcCurrencies}
        setMcCurrencies={setMcCurrencies}
        selectedcountry={selectedcountry}
        setSelectedcountry={setSelectedcountry}
        currency={currency}
        setcurrency={setcurrency}
        Countries={Countries}
        Currencies={Currencies}
        error={error}
        setError={setError}
        setOrdersLoading={setOrdersLoading}
        getCurrencyCode={getCurrencyCode}
        AddMCCountry={AddMCCountry}
        AddMCCurrencies={AddMCCurrencies}
        getMcOrders={getMcOrders}
      />
    </div>

          <div className="ContainerSmooth">
      <SearchFilter
        userName={userName}
        setUserName={setUserName}
        filterByUserName={filterByUserName}
        handleOptionChange={handleOptionChange}
        selectedOption={selectedOption}
        isSwitchOn={isSwitchOn}
        setIsProfitSort={setIsProfitSort}
        isProfitSort={isProfitSort}
        setIsCountrySwitchOn={setIsCountrySwitchOn}
        isCountrySwitchOn={isCountrySwitchOn}
      />
      <BundleSwitch
        isSwitchOn={isSwitchOn}
        setisSwitchOn={setisSwitchOn}
        bundleError={bundleError}
        partyBundleError={partyBundleError}
      />
            {isLoading ? (
              <div className="py-3 position-relative centeritem mt-4 row">
                <div className="col-md-8">
                  
                  <div style={{ paddingBlock: "10px" }}>
                  <ShimmerButton size="lg" />
                    <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                    <ShimmerBadge width={100} />
                  </div>
                  <div style={{ paddingBlock: "10px" }}>
                  <ShimmerButton size="lg" />
                    <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                    <ShimmerBadge width={100} />
                  </div>
                  <div style={{ paddingBlock: "10px" }}>
                  <ShimmerButton size="lg" />
                    <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                    <ShimmerBadge width={100} />
                  </div>
                  <div style={{ paddingBlock: "10px" }}>
                  <ShimmerButton size="lg" />
                    <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                    <ShimmerBadge width={100} />
                  </div>
                  <div style={{ paddingBlock: "10px" }}>
                  <ShimmerButton size="lg" />
                    <ShimmerThumbnail height={100} width={1000} className="m-0" rounded />
                    <ShimmerBadge width={100} />
                  </div>


                </div>
              </div>
            ) : (
              <OrdersSection
                bundles={bundles}
                expandedItems={expandedItems}
                toggleBundle={toggleBundle}
                currentPosts={currentPosts}
                context={{ applicationStore: { OnlineUsers: [] } }}
                isSwitchOn={isSwitchOn}
                isCountrySwitchOn={isCountrySwitchOn}
                isProfitSort={isProfitSort}
                distanceSortXCountries={distanceSortXCountries}
                profitSortXCountries={profitSortXCountries}
                profitSortSameCountries={profitSortSameCountries}
                distanceSortSameCountries={distanceSortSameCountries}
                profitOrderList={profitOrderList}
              />
            )}
      
      <ErrorNotification
        bundleError={bundleError}
        partyBundleError={partyBundleError}
      />
      {!ordersLoading && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredList.length / 10)} 
          handlePageChange={handlePageChange}
          currentPosts={currentPosts}
          filteredList={filteredList}
        />
      )}
    </div>
        </div>
      ) : null}
      <footer className="mt-auto">{/*<Footer />*/}</footer>
    </div>
  );
}
export default MCPrime;
