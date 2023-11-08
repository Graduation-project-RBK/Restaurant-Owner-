import React from "react";
import NavBar from "./Navbar";
import "./Settings.css"


const settings=()=>{
    return(
        <div>
             <NavBar />
       
      
     
        <div className="form-container">
            
     
        <h2>Edit Your Details</h2>
        <form>
        <div  className="form-group">
          <label htmlFor="phoneNumber">Description:</label>
          <input
              type="tel"
              id="phoneNumber"


            />
          </div>
          <div  className="form-group">
          <label htmlFor="phoneNumber">Reservation Quota:</label>
          <input
              type="tel"
              id="phoneNumber"


            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"

            >
               
              <option value="">Select a category</option>
              <option value="Category 1">Italian</option>
              <option value="Category 2">Tunisian</option>
              <option value="Category 3">French</option>
              <option value="Category 3">Steakhouse</option>
              <option value="Category 3">Japanese</option>
              <option value="Category 3">Lebanese</option>
            </select>
          </div>
        
          <div className="form-group">
            <label htmlFor="openTime">Opens at:</label>
            <input
              type="time"
              id="openTime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="closeTime">Closes at:</label>
            <input
              type="time"
              id="closeTime"

            />
            
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"


            />
          </div>
      

          <button className='save' type="button">Save</button>
        </form>
      </div>
      </div>
     
    
    )
}
export default settings;