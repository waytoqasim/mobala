
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "../../App.css";

function AgreementSlip(props) {
    const [date, setdate] = useState(true);
    const [data, setdata] = useState({});


    useEffect(() => {
        setdata({ ...props.chatData })
        debugger
    }, [props.chatData])


    useEffect(() => {
        let dateobj = new Date();
        let date = dateobj.toDateString();
        date = date.split(" ")[1] + " " + date.split(" ")[2] + ", " + date.split(" ")[3]
        setdate(date);
    }, [])

    let prevDate = "";
    const changePrevDate = (dateString) => {
        prevDate = dateString;
    };


    return (
        <div className="notranslate" >
            <div className="d-flex " style={{ margin: "23px 0px 20px 0px" }}>
                <Col style={{ paddingLeft: 0 }}>
                    <h3 style={{ fontWeight: 600 }}>Digital Transcript</h3>
                </Col>
                <Col style={{ textAlign: "right" }}>
                    <h5 style={{ padding: "6px", marginBottom: 0, fontSize: "14px" }}>Date of Download: {date}</h5>
                </Col>
            </div>
            <div className="black-line"></div>
            <div style={{ marginTop: "20px" }}>
                <div className="first-party">
                    <div>
                        <h6>First Party: {sessionStorage.getItem("UserName")}</h6>
                    </div>
                    <div>
                        <h6 style={{ marginBottom: 0 }}>Initial Order: (Give) {data.takeCurrency} {data.selftakeAmount} {data.selftakeCity}, {data.selftakeCountry}  {data.giveCurrency} {data.selfgiveAmount} {data.selfgiveCity}, {data.selfgiveCountry}(Take)</h6>
                    </div>
                </div>
                <div className="second-party">
                    <div>
                        <h6>Second Party: {data.username}</h6>
                    </div>
                    <div>
                        <h6 style={{ marginBottom: 0 }}>Initial Order: (Give) {data.giveCurrency} 2000 {data.giveCity}, {data.giveCountry}   {data.takeCurrency} 100,000 {data.takeCity}, {data.takeCountry} (Take)</h6>
                    </div>
                </div>
                {data.messages !== undefined ? data.messages.map((d) =>{
                    <>
                        {prevDate !== new Date(d.time.split("T")[0]).toLocaleString().split(",")[0] ? (
                            <div className="d-flex " style={{ marginTop: '20px' }}>
                                <div className="col-11" style={{ display: "flex", alignItems: "center" }} >
                                    <div style={{ background: "#d3d3d3", height: "1px", width: "100%" }}></div>
                                </div>
                                <div className="col-1" style={{ padding: 0 }}>
                                    <h6 style={{ marginBottom: 0 }}>
                                        {new Date(d.time.split("T")[0]).toString().split(" ")[1] +
                                            " " +
                                            new Date(d.time.split("T")[0]).toString().split(" ")[2] +
                                            ", " +
                                            new Date(d.time.split("T")[0]).toString().split(" ")[3]}
                                    </h6>
                                </div>
                            </div>
                        ) : null}
                        {changePrevDate(
                            new Date(d.time.split("T")[0]).toLocaleString().split(",")[0]
                        )}
                        <div className={sessionStorage.getItem("UserID") === d.userId ? "first-party d-flex" : "second-party d-flex"}>
                            <div className="col-3" style={{ display: "flex", alignItems: "center" }}>
                                <h5>Name: {sessionStorage.getItem("UserID") == d.userId ? sessionStorage.getItem("UserName") : data.username}</h5>
                            </div >
                            <div className="col-9">
                                {d.message}
                            </div >
                        </div>
                    </>
            }) : null}
            </div>
            <div className="footerSlip" style={{display:"flex"}}>
                <Col><h5>Software: Mobala</h5></Col>
                <Col><h5>--------------End of Transcript--------------</h5></Col>
                <Col></Col>
            
                <div style={{ justifyContent: "center" }}></div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div></div>
                    {/* <div><h5>Page 1of 10</h5></div> */}
                </div>
            </div>

        </div >
    );
}

export default AgreementSlip;