import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Carousel2() {
  const [carouselElements, setCarouselElements] = useState();
  const [isMuted, setIsMuted] = useState(true);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    getUserData();
    console.log(ref.current)
  }, [ref]);


  function getUserData() {
    axios
      .get("http://localhost:5555/getImages")
      .then((res) => {
        setCarouselElements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex); 
    if(ref.current.classList.contains('active')){
      setIsMuted(false);
      console.log("working")
    }
  }

  return (
    <div>
      <div className="container-fluid">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {carouselElements?.map((val, key) => {
            if (val.mediaType === "video") {
              if(val.status === "ACTIVE"){
                return (
                  <Carousel.Item interval={val.interval} style={{  height: "400px" }}  ref={ref}>
                    <video
                      className="slider-video"
                      src={`/uploads/${val.img}`}
                      autoPlay
                      muted = {isMuted}
                      loading="lazy"
                    ></video>
                  </Carousel.Item>
                );
              }
            }
            if (val.mediaType === "image") {
              if(val.status === "ACTIVE"){
                return (
                  <Carousel.Item style={{ height: "400px" }}>
                    <img
                      style={{ width: "600px" }}
                      className="d-block w-100"
                      src={`/uploads/${val.img}`}
                      alt=""
                    />
                  </Carousel.Item>
                );
              }
            }
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Carousel2;
