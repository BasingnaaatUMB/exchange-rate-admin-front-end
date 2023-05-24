import React, { useState } from "react";
import axios from 'axios';
import { useRef } from 'react';

function Addrate() {

    const [csv, setCsv] = useState();
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const aRef = useRef(null);

    let formData = new FormData();
    if (csv){
        formData.append("import-csv", csv);
    }

    function uploadFile(e) {
        e.preventDefault()

        axios.post('http://localhost:5555/import-csv', formData, {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }).then(res => {
            aRef.current.value = null;
            setIsAlertVisible(true);

            setTimeout(() => {
                setIsAlertVisible(false);
            }, 3000);

        }).catch((error) => {
            setIsError(true);
            setError("Could not upload file. Please try again.")

            setTimeout(() => {
                setIsError(false);
            }, 3000)
            
        })

    }
    
    return (
        <div className="upload">
            <h1 style={{color: "white"}}>Upload Rate File</h1>
            <form action="/import-csv" onSubmit={(e) => uploadFile(e)} method="post" encType="multipart/form-data">
                <input ref={aRef} type="file" className="form-control" name="import-csv" accept="csv" onChange={(event) => {setCsv(event.target.files[0])}}></input>
                <button>Upload File</button>
            </form>
            {isAlertVisible && <div className="alert-container">
                <div className="alert-inner">File Uploaded</div>
            </div>}
            {isError && <div className="error-container">
                <div className="error-inner">{error}</div>    
            </div>}
        </div>
    )
    
}

export default Addrate;