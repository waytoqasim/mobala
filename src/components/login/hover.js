import React from "react";


export  const Hover=({isHovered,handleHoverOrTap,handleSetHover,stepContainerRef})=>{
    return(
    <div style={{marginTop:"70px"}}>
    {!isHovered ? (
      <div
        className="d-flex"
        style={{
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          overflow: "hidden",
          margin: "0 auto",
          marginBottom: "50px",
          cursor: "pointer",
          transition: "transform 0.5s ease-in-out", // Transition for smooth scaling
          transform: isHovered ? "scale(1.5)" : "scale(1)", // Scale on hover
        }}
        onMouseEnter={handleHoverOrTap}
        onTouchStart={handleHoverOrTap}
      >
        <div
          style={{
            background: "#a6a6a6",
            width: "50%",
            height: "100%",
            transition: "background 0.3s ease", // Smooth background color transition
          }}
        ></div>
        <div
          style={{
            background: "#4f81bd",
            width: "50%",
            height: "100%",
            transition: "background 0.3s ease", // Smooth background color transition
          }}
        ></div>
      </div>
    ) : (
      <div
        className="step-container"
        ref={stepContainerRef} // Reference to detect clicks outside
        onMouseLeave={handleSetHover}//() => setIsHovered(false)} // Revert when mouse leaves
        style={{
          margin: "0 auto",
          marginBottom: "15px",
          transition:"opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateY(0)" : "translateY(-10px)",
        }}
      >
        {/* Step 1 */}
        <STEP number={1} name="Order" />
        {/* Line between Step 1 and Step 2 */}
        <div className="line"></div>
        {/* Step 2 */}
        <STEP number={2} name="Match" />
        {/* Line between Step 2 and Step 3 */}
        <div className="line"></div>
        {/* Step 3 */}
        <STEP number={3} name="Finalize" />
        
      </div>
    )}
  </div>)
}

export const STEP =({number,name})=>{
return(
    <div className="step">
          <div className="circle">{{number}}</div>
          <p style={{fontSize:"12px"}}>{{name}}</p>
    </div>
)
}