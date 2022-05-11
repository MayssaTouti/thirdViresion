import React, { useState } from "react";
import '../App.css'; 
const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>User Profile Card</h2>
            <h1 className="heading" > Add your Image </h1>
            <div className="card">
            {selectedImage && (
                <div className="container">
                    <img alt="not fount" id="img" width={"250px"} className="img" style={{ width: '20%' }} src={URL.createObjectURL(selectedImage)} />
                    <br />
                 
                </div>
            )}
            <br />

            <br />
               
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }}
                />
                <i className="material-icons"> add_photo_alternate </i>
                <div className="label" >
                    <label htmlFor="input" className="image-upload" >
                       

                        <h1 style={{ align: 'left' }}>User Name </h1> : <h1> </h1>
                        <p className="title">CEO &amp; Founder, Example</p>
                        <p>Harvard University</p>
                        <div style={{ margin: '50px 0', height: '50px ', width: '50%' }}></div> 

                    </label>
                </div>
                <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
        </div>
    );
};

export default UploadAndDisplayImage;