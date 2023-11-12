import React , {useState} from "react";
import NavBar from "./Navbar";
import "./Settings.css"


const settings=()=>{
  const [setting, setSetting] = useState({
    description: "",
    category:"",
    ReservationQuota:"",
    opensAt:Number,
    closingTime:Number,
    phoneNumber:Number,
  });
  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setSetting({ ...setting, [name]: value });
    console.log(setting)
  };
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
              onChange={handleInputChange}


            />
          </div>
          <div  className="form-group">
          <label htmlFor="phoneNumber">Reservation Quota:</label>
          <input
              type="tel"
              id="phoneNumber"
              onChange={handleInputChange}


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
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="closeTime">Closes at:</label>
            <input
              type="time"
              id="closeTime"
              onChange={handleInputChange}

            />
            
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              onChange={handleInputChange}


            />
          </div>
      

          <button className='save' type="button">Save</button>
        </form>
      </div>
      </div>
     
    
    )
}
export default settings;