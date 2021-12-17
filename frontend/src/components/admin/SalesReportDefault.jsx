import "./SalesReport.css";
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Form,
  Table,
  FloatingLabel,
  Pagination,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { instanceAdmin } from "../../axios/axios";
import swal from "sweetalert";
import SpinContext from "../../context/spinnerContext";
import {SalesReport} from "./SalesReport";
import { SalesReportSingleDay } from "./SalesReportSingleDay";
import {SalesReportSingleWeek} from "./SalesReportSingleWeek";
import{SalesReportSIngleMonth} from "./SalesReportSIngleMonth";
import {SalesReportSingleYear} from "./SalesReportSingleYear";
import Button from "@restart/ui/esm/Button";
import {SalesReportRange} from "./SalesReportRange";
import PrintProvider, { Print, NoPrint } from "react-easy-print";
import { useReactToPrint } from "react-to-print";
function SalesReportDefault() {
  const [state, setstate] = useState("0");
  const [startDate, setStartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [dateerror, setdateerror] = useState("");

  const sortWithRange = () => {
    window.localStorage.setItem("state", "5");
    setstate("5");
  };
  useEffect(() => {
   
    if (window.localStorage.getItem("state")) {
      setstate(window.localStorage.getItem("state"));
    }
    return () => {
      window.localStorage.removeItem("state");
    };
  }, [state]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  

  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <div className="cotainer__sales__seperate">
            <div className="head">
              <h1>Sales Managment</h1>
            </div>
            <div className="small__contents">
              <Form.Select
                aria-label="Default select example"
                className="mb-3"
                onChange={(e) => {
                  setstate(e.target.value);

                  window.localStorage.setItem("state", e.target.value);
                }}
              >
                <option selected>Quick sort</option>
                <option value={0}>All</option>
                <option value={1}>Last 24 hours</option>
                <option value={2}>This Week</option>
                <option value={3}>This Month</option>
                <option value={4}>This Year </option>
              </Form.Select>
              <Form>
                <Form.Label>Start date</Form.Label>
                {dateerror && <p>{dateerror}</p>}
                <Form.Control
                  type="Date"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                ></Form.Control>
                <Form.Label>End date</Form.Label>
                {dateerror && <p>{dateerror}</p>}
                <Form.Control
                  type="Date"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => {
                    setendDate(e.target.value);
                  }}
                ></Form.Control>
                <Button className="sort_btn"
                  onClick={() => {
                    sortWithRange();
                  }}
                >
                  Sort
                </Button>
              </Form>
            </div>

            {/* <SalesReportSingleDay/> */}
          </div>
        </Col>

        <Col md={10} >
        <button className="print-button" onClick={handlePrint}>Print this out!</button>
          {state === "0" && <SalesReport  ref={componentRef}/>}
         
          {state === "1" && <SalesReportSingleDay ref={componentRef} />}
          {state === "2" && <SalesReportSingleWeek  ref={componentRef}/>}
          {state === "3" && <SalesReportSIngleMonth  ref={componentRef}/>}
          {state === "4" && <SalesReportSingleYear  ref={componentRef}/>}
          {state === "5" && (
            <SalesReportRange startdate={startDate} enddate={endDate}  ref={componentRef}/>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default SalesReportDefault;
