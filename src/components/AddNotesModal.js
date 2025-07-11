import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { apiHost } from '../Helper';

function AddNotesModal({
    showModal,
    setShowModal,
    value,
    setValue,
    mcuserid,
    isNoteCreated
}) {
    const handleSave = async () => {
        // console.log("The Auth Token is : ", localStorage.getItem("authToken"));
        if (isNoteCreated === true) {
            let url = `${apiHost}/api/User/MakeUserNote`;
            const reqdata = {
                UserId: sessionStorage.getItem("UserID"),
                MCUserId: mcuserid,
                note: value
            }

            await axios.post(url, reqdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            })
        } else if (isNoteCreated === false) {
            let url = `${apiHost}/api/User/UpdateUserNote`;
            const data = {
                UserId: sessionStorage.getItem("UserID"),
                MCUserId: mcuserid,
                note: value
            };

            await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            })
        }
        // console.log("Note Created Successfully ", result.data);
        // console.log("The Notes are : ", value);
        // console.log("The User ID is : ",sessionStorage.getItem("UserID"));
        // console.log("The MC USER ID is : ", mcuserid);
        setShowModal(false);
    };

    return (
        <div className="modal show">
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                className="no-padding-modal custom-modal-position"
            >
                <Modal.Header
                    style={{ backgroundColor: "#2995be", color: "white" }}
                    closeButton
                >
                    <Modal.Title style={{ lineHeight: "0" }}>Add Note</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <textarea
                        type="text"
                        placeholder="Type here..."
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        style={{
                            padding: 10,
                            borderWidth: 1,
                            width: "100%",
                            boxSizing: "border-box"
                        }}
                    />
                </Modal.Body>

                <Modal.Footer
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between', // Even spacing between buttons
                    }}
                >
                    <Button variant="secondary" style={{ flex: 1, marginRight: '10px' }} onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" style={{ flex: 1 }} onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddNotesModal;