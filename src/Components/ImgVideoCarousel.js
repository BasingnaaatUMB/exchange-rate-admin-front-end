import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function ImgVideoCarousel() {
  const [images, setImages] = useState();

  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    axios
      .get("http://localhost:5555/getImages")
      .then((res) => {
        setImages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
 
  return (
    <div>
      

      
    </div>
  );
}

export default ImgVideoCarousel;
