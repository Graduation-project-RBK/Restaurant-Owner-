import React from "react";
import NavBar from "./Navbar";
import "./Images.css";

const Images= () => {
  const handleImage = (e) => {
    const file = e.target.files[0]
    setProduct({ ...product, imageUrl: file })

  }
  return (
    <div>
    <NavBar />
    <div className="menu-container">
      <h2>Images</h2>
      <div class="mb-3">
          <label for="imageUrl" class="form-label">Choose Main_Image</label>
          <input type="file" class="form-control" id="imageUrl"/>
         
        </div>
        <div class="mb-3">
          <label for="imageUrl" class="form-label">Choose Menu Images</label>
          <input type="file" class="form-control" id="imageUrl"/>
         
        </div>
        <div class="mb-3">
          <label for="imageUrl" class="form-label">Choose Extra Image</label>
          <input type="file" class="form-control" id="imageUrl"/>
         
        </div>
        <button>Save</button>
    </div>
    </div>
  );
};

export default Images;
