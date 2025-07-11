import "bootstrap-css-only/css/bootstrap.min.css";
import $ from "jquery";
import React, {
  lazy,
  Suspense,
  useEffect
} from "react";
import CacheBuster from "react-cache-buster";
import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import version from "../package.json";
import APIURLS from "./apiurls";
import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Loading from "./components/loader/loading";
import { AppContext } from "./Context";
import { SessionProvider } from "./context/SessionContext";
import { apiHost } from "./Helper";
import Cookies from "./pages/cookies/Cookies";
import CreateOrder from "./pages/createorder/Creatorder";
import Map from "./pages/map/Map";
import Message from "./pages/messagemobile/message Mobile";
import TopUpNotification from "./pages/notifications/notifications";
import SignUp from "./pages/signup/Signup";
import { Reducer } from "./Reducers";
import { apiInterceptor } from "./service/ApiService";
import SignalRService from "./SignalR";

const OurMission = lazy(() => import("./pages/ourmission/OurMission"));
const Welcome = lazy(() => import("./pages/welcome/Welcome"));
const OrderCom = lazy(() => import("./pages/orders/Ordercom"));
const ChatPage = lazy(() => import("./pages/finalize/chatpage"));
const Watchlist = lazy(() => import("./pages/wishlist/Watchlist"));
const Resetpass = lazy(() => import("./pages/passreset/passreset"));
const UnAuthorized = lazy(() => import("./pages/unauthorized/UnAuthorized"));
const Editprofile = lazy(() =>
  import("./pages/editprofile/EditProfileNew")
);
const Newpass = lazy(() => import("./pages/newpass/newpass"));
const DirectOrder = lazy(() => import("./pages/orderfx/OrderFX"));
const MC = lazy(() => import("./pages/mc/MC"));
const MCPrime = lazy(() => import("./pages/mcprime/McPrime"));
const Tips = lazy(() => import("./pages/tips/Tips"));
const Terms = lazy(() => import("./pages/terms/Terms"));
const Policy = lazy(() => import("./pages/privacypolicy/PrivacyPolicy"));
const Blog = lazy(() => import("./pages/blogs/Blog"));
const HowItWorks = lazy(() => import("./pages/howitworks/HowItWorks"));
const WhatWeDo = lazy(() => import("./pages/whatwedo/WhatWeDo"));
const Match_Tab = lazy(() =>import("./pages/matches/Matches_Tab"));
const OrderfxHome = lazy(() => import("./pages/orderfxhome/OrderFXHome"));
const isProduction = process.env.NODE_ENV === "production";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    // Scroll to top when route changes
    scrollToTop();

    // If your application uses smooth scrolling, you might want to remove the scroll restoration behavior
    // This ensures that the scroll to top happens immediately when changing routes
    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    // Reset scroll restoration behavior when component unmounts
    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  }, [pathname]);

  return null;
}
const App = () => {
  // const { loading, setLoading } = useLoaderContext(); 
  const navigate = useNavigate();
  var headerState = "loggedout";
  const FullFXPaths = [
    "/ordercom",
    "/createorder",
    "/chatpage",
    "/match_tab",
    "/watchlist",
    "/editprofile",
    "/mc",
    "/message",
    "/map",
    "/mcprime",
    "/tips",
  ];
  const pathnames = [
    "/",
    "/SignUp",
    "/Welcome",
    "/passreset",
    "/newpass",
    "/Terms",
    "/PrivacyPolicy",
    "/Blog",
    "/HowItWorks",
    "/WhatWeDo",
    "/OurMission",
    "/OrderFX",
  ];

  const footerpathname = [
    "/Tips",
    "/Blog",
    "/OurMission",
    "/WhatWeDo",
    "/HowItWorks",
    "/PrivacyPolicy",
  ];
  const DisclaimerPathnames = ["/", "/OrderFX", "/OrderFXHome", "/SignUp"];
  const pathnamesFooter = ["/passreset", "/newpass"];

  const [applicationStore, dispatch] = React.useReducer(Reducer, {
    OnlineUsers: {},
    navigation: 0,
    messages: {},
    notifications: [],
    Invite: 0,
    RoomData: {},
  });

  const location = useLocation();
  const establishConnection = () => {
    // SignalRService.registerConnection(sessionStorage.UserID);
    SignalRService.startConnection()
      .then((res) => {
        if (sessionStorage.logedin === "true")
          SignalRService.registerConnection(sessionStorage.UserID);
        const conn = SignalRService.getConnection();
        if (conn !== null) {
          conn.on("ReceiveUsersDictionary", function (res) {
            dispatch({ Payload: res, Type: "ONLINE USERS LIST" });
          });
          conn.on("ChatMessage", function (res) {
            dispatch({ Payload: res, Type: "MESSAGES" });
          });
          conn.on("GetMatches", function (res) {
            dispatch({ Payload: res, Type: "FETCHMATCHES" });
          });
          conn.on("Notification", function (description, heading) {
            if (heading == "acceptinvite") {
              heading = "Invite Accepted";
            }
            if (heading == "rejectinvite") {
              heading = "Invite Rejected";
            }
            dispatch({
              Payload: { description: description, heading: heading },
              Type: "NOTIFICATION ALERT",
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error starting SignalR connection:", error);
        setTimeout(establishConnection, 4000);
      });
  };

  useEffect(() => {
    //console.log("called", window.location.pathname);
    establishConnection();
  }, [dispatch]);

  useEffect(() => {
   // console.log("called", applicationStore.IsFullFX);
    if (applicationStore.IsFullFX != undefined) {
      if (
        applicationStore.IsFullFX != true &&
        FullFXPaths.includes(window.location.pathname.toLocaleLowerCase())
      ) {
        window.location.href = "/Unauthorized";
      }
    }
  }, [applicationStore.IsFullFX]);

  if (
    window.location.pathname.toLocaleLowerCase() == "/orderfxhome" ||
    sessionStorage.getItem("previousPathName") === "/OrderFXHome"
  ) {
    headerState = "orderfx";
  } else if (
    FullFXPaths.includes(window.location.pathname.toLocaleLowerCase())
  ) {
    headerState = "loggedin";
  } else {
    headerState = "loggedout";
  }

  useEffect(() => {
    if (sessionStorage.logedin === "true") {
      let url = `${apiHost}/api/User/GetUserPermissions?UserId=${sessionStorage.UserID}`;
      apiInterceptor
        .get(APIURLS.USERS.GETUSERPERMISSIONS(sessionStorage.UserID), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        .then((res) => {
          dispatch({ Type: "PERMISSION", Payload: { ...res.data } });
          dispatch({
            Type: "FULLFXCHECK",
            Payload:
              res.data.isProfessionPublic == null &&
              res.data.areNumbersPublic == null
                ? false
                : true,
          });
        });
    }
  }, []);

  useEffect(() => {
    const session = sessionStorage.getItem("sessionIn");
    if (session !== null || pathnames.includes(window.location.pathname)) {
      $("#root").css({ display: "block" });
    }
    // if (session !== null || AdminPathNames.includes(window.location.pathname)) {
    //   $("#root").css({ display: "block" });
    // }
    if (session == null && !pathnames.includes(window.location.pathname)) {
      window.location.href = "/";
    }

    // if (session == null && AdminPathNames.includes(window.location.pathname)) {
    //   window.location.href = "/AdminLogin";
    // }
  }, [null]);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 1);
  // useEffect(() => {
  //   apiInterceptorWrapper(setLoading);
  // }, [setLoading]);

 
  return (
    <CacheBuster
      currentVersion={version}
      isEnabled={isProduction}
      isVerboseMode={false}
      loadingComponent={<Loading />}
    >
       {/* <LoaderProvider>
      {loading && <Loader/>}  */}
      <SessionProvider>
      <AppContext.Provider value={{ applicationStore, dispatch }}>
        <Cookies />
        <ScrollToTop />
        <div
          style={
            window.location.pathname == "/ChatPage" ||
            window.location.pathname == "/MessageMobile"
              ? { flexDirection: "column", display: "flex", height: "100%" }
              : {}
          }
        >
          {DisclaimerPathnames.includes(window.location.pathname) && (
            <div style={{ background: "#dae5f1", textAlign: "center" }}>
              Mobala is simply a meeting place. We don’t handle any money and
              have no agents handling money on our behalf.
            </div>
          )}
          {window.location.pathname.toLocaleLowerCase() ==
          "/unauthorized" ? null : (
            <Header headerState={headerState} expiryTimestamp={time} />
          )}
          {[...pathnames, "/ChatPage"].includes(
            window.location.pathname
          ) ? null : (
            <TopUpNotification expiryTimestamp={time} />
          )}
          <div
          id="head"
            className={`maxh ${
              window.location.pathname === "/ChatPage" ||
              window.location.pathname === "/MessageMobile"
                ? "flex-column"
                : headerState === "loggedin"
                ? ""
                : "top-padding"
            }`}
          >
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<DirectOrder />} />
                <Route path="/Unauthorized" element={<UnAuthorized />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/passreset" element={<Resetpass />} />
                <Route path="/newpass" element={<Newpass />} />
                <Route path="/Welcome" element={<Welcome />} />

                <Route path="/OrderCom" element={<OrderCom />} />
                <Route path="/CreateOrder" element={<CreateOrder />} />
                <Route path="/ChatPage" element={<ChatPage />} />
                <Route path="/Match_Tab" element={<Match_Tab />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/editprofile" element={<Editprofile />} />
                {/* <Route path="/messageold" element={<Messageold />} /> */}
                <Route path="/MC" element={<MC />} />
                <Route path="/Message" element={<Message />} />
                <Route path="/McPrime" element={<MCPrime />} />
                <Route path="/Map" element={<Map />} />

                <Route
                  path="/OrderFXHome"
                  element={<OrderfxHome expiryTimestamp={time} />}
                />

                <Route path="/OurMission" element={<OurMission />} />
                <Route path="/Tips" element={<Tips />} />
                <Route path="/Terms" element={<Terms />} />
                <Route path="/PrivacyPolicy" element={<Policy />} />
                <Route path="/Blog" element={<Blog />} />
                <Route path="/HowItWorks" element={<HowItWorks />} />
                <Route path="/WhatWeDo" element={<WhatWeDo />} />
              </Routes>
            </Suspense>
          </div>
          {/* {footerpathname.includes(window.location.pathname) && (
            // <div
            // className="goBackStyle"
            //   style={{
            //     display: "flex",
            //     justifyContent: "flex-end",
            //     // marginTop: "-29px",
                
            //   }}
            // >
            //   <button className="btnback" onClick={() => goBack()}>
            //     Go back
            //   </button>
            // </div>
          )} */}
          {[...pathnamesFooter, "/ChatPage", "/Map", "/Unauthorized"].includes(
            window.location.pathname
          ) ? null : (
            <Footer expiryTimestamp={time} />
          )}
        </div>
      </AppContext.Provider>
      </SessionProvider>
      

      
      {/* </LoaderProvider> */}
    </CacheBuster>
  );
};

export default App;
