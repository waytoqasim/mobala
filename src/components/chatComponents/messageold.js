import React from "react";
import Profile from "../../asstes/Profilepic.png";
import Heart from "../../asstes/Ratingheart.svg";
import Phone from "../../asstes/phone.svg";
import Send from "../../asstes/Sendbtn.svg";
import Attach from "../../asstes/Attachbtn.svg";
import Location from "../../asstes/locattionbtn.svg";

import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import Message from "./message";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const messageold = (props) => {
  function PrintDocument() {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  }
  return (
    <div>
      <Row className="mt-4">
        <div id="divToPrint">
          <p>Hello</p>
        </div>
      </Row>
    </div>
  );
};

export default messageold;
