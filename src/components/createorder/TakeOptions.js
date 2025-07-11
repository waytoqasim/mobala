const TakeOptions = ({ takeCash, handletakeCashSource, takeBank, handletakeBankSource, takeAssistance, handletakeAssistance }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      <div className="mt-2">
        <input
          onClick={handletakeCashSource}
          checked={takeCash}
          type={"checkbox"}
          className=""
        />{" "}
        Cash
        <input
          onClick={handletakeBankSource}
          checked={takeBank}
          type={"checkbox"}
          className="chkbox ml-3"
        />{" "}
        Bank
      </div>
      <div className="mt-2">
        <input
          onClick={handletakeAssistance}
          checked={takeAssistance}
          type={"checkbox"}
          className=""
        />{" "}
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled" bsPrefix="custom-tooltip" style={{ position: "absolute" }}>
              At Take Location
            </Tooltip>
          }
          placement="top-start"
        >
          <span style={{ cursor: "default" }}>
            Money changer assistance is required.
          </span>
        </OverlayTrigger>
      </div>
    </div>
  );
  