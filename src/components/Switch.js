import React from "react";
import "./switch.css";

const Switch = ({ isOn, handleToggle, onColor }) => {
    return (
        <label style={{ background: isOn && onColor, background: "#adb5bd" }} className="react-switch">
            <input
                checked={isOn}
                onChange={() => {handleToggle();console.log("SSSSSSSSSSSSSSSSS")}}
                className="react-switch-checkbox"
                type="checkbox" 
            />
            <div className="react-switch-button" />
            <div className="react-switch-labels" style={{display:'flex',flexDirection:'row',padding:'1.5%'}}>
                <span style={{ zIndex: 100 }}>Sort by Distance</span>
                <span style={{ zIndex: 100 }}>Sort by FX-Rate</span>
            </div>
        </label>
    );
};

export default Switch;
