import React from "react";
import { Modal } from "react-bootstrap";
import Arrow from "../../asstes/arrowenter.svg";
import Cencle from "../../asstes/cancel.png";
const ChatModel=({
    showModal,
    hideModal,
    deleteUser,
    setshowChatpage,
    changeTab,data,index,
    ordersList,
    setShowModal,
    activelistDict,
    })=>{
    return (
        <>
            <Modal
                key={`${index}-modal`}
                show={showModal}
                onHide={hideModal}
                size="md"
                className="modal-backdrop.show modalp0"
            >
                <Modal.Header>
                    <Modal.Title style={{ fontSize: 16 }}>
                        Complete the Order and end all conversations
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: "end" }}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <button
                                type="button"
                                className="cancelmodal"
                                onClick={hideModal}
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button
                                id={data.orderId}
                                type="button"
                                className="completeconvomodal btn btn-primary"
                                onClick={(e) => {
                                    deleteUser(e.currentTarget.id);
                                }}
                            >
                                Complete
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div
                id={data.orderId}
                key={index}
                className={index == 0 ? "item-coloured" : "item"}
                onClick={(e) => {
                    setshowChatpage(false);
                    if (e.target.nodeName == "IMG") {
                        changeTab(
                            e.target.parentElement.id,
                            ordersList,
                            activelistDict
                        );
                    } else {
                        changeTab(e.target.id, ordersList, activelistDict);
                    }
                }}
            >
                <img
                    src={Cencle}
                    onClick={(e) => {
                        setShowModal(true);
                    }}
                    style={{
                        width: "18px",
                        float: "right",
                    }}
                />
                {data.giveAmount.toLocaleString()} {data.giveCurrency}{" "}
                {data.giveCity}
                {", "}
                {data.giveCountryCode}
                &nbsp;&nbsp; &nbsp;&nbsp;
                <br></br>
                <img src={Arrow} style={{ width: "52px" }} />
                {data.takeAmount.toLocaleString()} {data.takeCurrency}{" "}
                {data.takeCity}
                {","}
                {data.takeCountryCode}
            </div>
        </>
    )
}

export default ChatModel;