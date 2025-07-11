import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownMenu = ({ status, editOrder, putOnHold, putOnActive, putAsCompleted, deleteOrder, matchCount, id }) => (
  <Dropdown id="orders-dropdown"
  style={{
    padding: 0,
    marginTop:
      status == "Matched" ||
      status == "InFinalize"
        ? 0
        : "-20px",
  }}>
    <Dropdown.Toggle variant="Default" id="dropdown-basic" style={{
                        border: "none",
                        boxShadow: "none",
                        margin:
                          status == "Matched" ||
                          status == "InFinalize"
                            ? 0
                            : "5px",
                        padding:
                          status == "Matched" ||
                          status == "InFinalize"
                            ? 0
                            : "15px",
                      }}>
      <span className="threedots" />
    </Dropdown.Toggle>
    <Dropdown.Menu id={id} size="sm">
      {status !== "Completed" && <DropdownItem clickHandler={editOrder} name="Edit" />}
      {status !== "Completed" && status !== "InFinalize" && <DropdownItem clickHandler={() => putOnHold(id)} name="Mark as on-Hold" /> }
      {status === "Hold" && <DropdownItem clickHandler={() => putOnActive(id)} name="Mark as Active"/>}
      {status !== "Completed" && <DropdownItem clickHandler={() => putAsCompleted(id)} name="Mark as Completed" />}
      <DropdownItem clickHandler={() => deleteOrder(id)} name="Delete" />
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownMenu;

const DropdownItem=({clickHandler,name})=>{
  return(
    <Dropdown.Item onClick={clickHandler}>{name}</Dropdown.Item>
  )
} 
