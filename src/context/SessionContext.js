import Cookies from "js-cookie";
import moment from "moment";
import React, { createContext, useContext, useState } from "react";

// Create a Context for Session
const SessionContext = createContext();

// Create a provider component
export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState({});

  const setSessions = (response) => {
    sessionStorage.setItem("logedin", true);
    sessionStorage.setItem("email", Cookies.get("email"));
    localStorage.setItem("authToken", response.data.token);
    sessionStorage.setItem("sessionIn", 1);
    sessionStorage.setItem("publicKey", response.data.publicKey);
    sessionStorage.setItem("privateKey", response.data.privateKey);
    sessionStorage.setItem("isMute", response.data.isMute);
    sessionStorage.setItem("Reviewedusers", response.data.reviewedusers);
    sessionStorage.setItem("UserLoginTime", moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"));
    sessionStorage.setItem("UserName", response.data.userName);
    sessionStorage.setItem("City", response.data.city);
    sessionStorage.setItem("Province", response.data.province);
    sessionStorage.setItem("Country", response.data.country);
    sessionStorage.setItem("contact", response.data.mobileNumber);
    sessionStorage.setItem("UserID", response.data.id);
    sessionStorage.setItem("LastMsg", response.data.lastMsg);
    sessionStorage.setItem("LastInvite", response.data.lastInvite);
    sessionStorage.setItem("Picture", response.data.picture);
    sessionStorage.setItem("IsMC", response.data.isMC);
    sessionStorage.setItem("IsMCPrime", response.data.isMCPrime);
    sessionStorage.setItem("settingProfilePic", [response.data.picture + "," + response.data.userName]);
    sessionStorage.setItem("IsMCPrimeAuthenticated", false);
    sessionStorage.setItem("loginStamp", Date.now());
    localStorage.setItem("FinalizedData", "DefaultOrders");
    localStorage.setItem("matchesOrder", "DefaulMatches");
    sessionStorage.setItem("countrywhereGovernmentIdissued", response.data.countrywhereGovernmentIdissued);
  };

  const clearSessions = () => {
    sessionStorage.clear();
    localStorage.clear();
    setSessionData({});
  };

  return (
    <SessionContext.Provider value={{ setSessions, clearSessions, sessionData }}>
      {children}
    </SessionContext.Provider>
  );
};

// Custom hook to use session data in components
export const useSession = () => {
  return useContext(SessionContext);
};
