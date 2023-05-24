import React, { useState, useEffect } from "react";
import axios from "axios";
import Carousel2 from "./Carousel2";

function Rate() {
  const [umbRates, setUmbRates] = useState();
  const [intRates, setIntRates] = useState();

  function isActive(date) {
    const today = new Date();
    const checkDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate < today) {
      return false;
    }else{
        return true;
    }
  }
  function isExpired(date) {
    const today = new Date();
    const checkDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate < today) {
      return true;
    }else{
        return false;
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:5555/umbrate")
      .then((res) => {
        setUmbRates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:5555/intrate")
      .then((res) => {
        setIntRates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="container_cust">
      <div className="video">
        <div className="slide-images">
          <div className="img-container">
            <Carousel2></Carousel2>
          </div>
        </div>
      </div>
      <div className="content_cust">
        <h1>ALL RATES</h1>
        <div className="table">
          <h2>UMB RATES</h2>
          <table>
            <tr>
              <th>Currency</th>
              <th>Bid</th>
              <th>Offer</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            {umbRates?.map((val, key) => {
              return (
                <tr>
                  <th>
                    <img src={val.flags} alt=""></img>
                    <span>{val.currency}</span>
                  </th>
                  <th>
                    <span>{val.bid}</span>
                  </th>
                  <th>
                    <span>{val.offer}</span>
                  </th>
                  <th>
                    <span>{val.date}</span>
                  </th>
                  <th>
                    {isActive(val.date) && <span>Active</span>}
                    {isExpired(val.date) && <span>Expired</span>}
                  </th>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="table">
          <h2>INTERNATIONAL</h2>
          <table>
            <tr>
              <th>Currency</th>
              <th>Bid</th>
              <th>Offer</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
            {intRates?.map((val, key) => {
              return (
                <tr>
                  <th>
                    <span>{val.currency}</span>
                  </th>
                  <th>
                    <span>{val.bid}</span>
                  </th>
                  <th>
                    <span>{val.offer}</span>
                  </th>
                  <th>
                    <span>{val.date}</span>
                  </th>
                  <th>
                    {isActive(val.date) && <span>Active</span>}
                    {isExpired(val.date) && <span>Expired</span>}
                  </th>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Rate;
