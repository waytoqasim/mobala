import React from "react";
import {
  useNavigate,
} from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const prevpathname = sessionStorage.getItem("previousPathName")
  console.log(prevpathname)
  const goBack = () => {
    if(prevpathname)
    {
      navigate(prevpathname);
    }
    else
    {
    navigate(-1);
    }
    console.log("/"+prevpathname)
  };
  return (
      <div
        className="goBackStyle"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          // marginTop: "-29px",
        }}
      >
        <button className="btnback" onClick={goBack}>
          Go back
        </button>
      </div>
  );
};

export default BackButton;
