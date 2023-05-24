import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useRef } from "react";

function Images() {
  const [image, setImage] = useState();
  const [images, setImages] = useState();
  const [fileType, setFileType] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const aRef = useRef(null);

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

  const setImageFile = (e) => {
    setImage(e.target.files[0]);
  };

  const setMedia = (e) => {
    setFileType(e.target.value);
  };

  const addImage = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", image);
    formData.append("mediaType", fileType);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post(
      "http://localhost:5555/images",
      formData,
      config
    );

    if (res.data.status === 201) {
      getUserData();
      aRef.current.value = null;
      setIsAlertVisible(true);

      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    } else {
      setIsError(true);
      setError("Could not upload file. Please try again.");

      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const deleteUser = async (id) => {
    const res = await axios.delete(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data.status === 201) {
      getUserData();
    } else {
      console.log("error");
    }
  };

  const makeActive = async (id, status) => {
    const res = await axios.put('http://localhost:5555/makeactive', {id: id, status: status});

    if (res.data.status === 201) {
      getUserData();
    } else {
      console.log("error");
    }
  };

  return (
    <div className="cardview">
      <div className="imageForm">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              ref={aRef}
              type="file"
              name="photo"
              onChange={setImageFile}
            />
          </Form.Group>
          <div className="dropdown">
            <div className="labeldiv">
              <label for="mediaType">Choose media type</label>
            </div>

            <div>
              <select
                name="mediaType"
                id="mediaType"
                value={fileType}
                onChange={setMedia}
              >
                <option value="">--Choose Media Type--</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>
          </div>
          <Button variant="secondary" type="submit" onClick={addImage}>
            Submit
          </Button>
        </Form>
        {isAlertVisible && (
          <div className="alert-container">
            <div className="alert-inner">File Uploaded</div>
          </div>
        )}
        {isError && (
          <div className="error-container">
            <div className="error-inner">{error}</div>
          </div>
        )}
      </div>

      <div className="cards">
        {images?.map((val, key) => {

          if (val.mediaType === "image") {
            if(val.status === "ACTIVE"){
              return (
                <div className="card">
                  <Card style={{ border: "none" }} className="mb-3">
                    <Card.Img
                      variant="top"
                      src={`/uploads/${val.img}`}
                      style={{
                        width: "100%",
                        textAlign: "center",
                        margin: "auto",
                        height: "200px",
                      }}
                      className="mt-2"
                    />
                    <Card.Body>
                        <Button
                          onClick={() => makeActive(val.id, 'INACTIVE')}
                          style={{background:"green", borderColor:"green", marginRight:"10px"}}
                        >
                          Active
                        </Button>
                    
                      <Button
                        variant="danger"
                        onClick={() => deleteUser(val.id)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            }else if(val.status === "INACTIVE"){
              return (
                <div className="card">
                  <Card style={{ border: "none" }} className="mb-3">
                    <Card.Img
                      variant="top"
                      src={`/uploads/${val.img}`}
                      style={{
                        width: "100%",
                        textAlign: "center",
                        margin: "auto",
                        height: "200px",
                      }}
                      className="mt-2"
                    />
                    <Card.Body>
                        <Button
                          onClick={() => makeActive(val.id, 'ACTIVE')}
                          style={{marginRight:"10px"}}
                        >
                          Inactive
                        </Button>
                    
                      <Button
                        variant="danger"
                        onClick={() => deleteUser(val.id)}
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            }
            
          }
          if (val.mediaType === "video") {
            if(val.status === "ACTIVE"){
              return (
                <div className="card">
                  <Card style={{ border: "none" }} className="mb-3">
                    <video
                      className="slider-video"
                      src={"slideshow_imgs/video1.mp4"}
                      loop
                      autoPlay
                      muted
                      loading="lazy"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        margin: "auto",
                        height: "200px",
                      }}
                    ></video>
                    <Card.Body>
                      <Button style={{background:"green", borderColor:"green", marginRight:"10px"}} onClick={() => makeActive(val.id, 'INACTIVE')}>
                        Active
                      </Button>

                      <Button variant="danger" onClick={() => deleteUser(val.id)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            }else if(val.status === "INACTIVE"){
              return (
                <div className="card">
                  <Card style={{ border: "none" }} className="mb-3">
                    <video
                      className="slider-video"
                      src={"slideshow_imgs/video1.mp4"}
                      loop
                      autoPlay
                      muted
                      loading="lazy"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        margin: "auto",
                        height: "200px",
                      }}
                    ></video>
                    <Card.Body>
                      <Button style={{marginRight:"10px"}} onClick={() => makeActive(val.id, 'ACTIVE')}>
                        Inactive
                      </Button>

                      <Button variant="danger" onClick={() => deleteUser(val.id)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
}

export default Images;
