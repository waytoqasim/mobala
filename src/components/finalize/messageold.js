import React from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Row
} from "react-bootstrap";

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
