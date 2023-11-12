import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';


function Signup() {
    const [inputs, setInputs] = useState({});

    const [personalId, setPersonalID] = useState(null)
    const [taxDeclaration, setTaxDeclaration] = useState(null)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };
    const handlePersonalIdChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPersonalID(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const handleTaxDeclarationChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setTaxDeclaration(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const validator = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!emailRegex.test(inputs.email)) {
            toast.error("Invalid email format");
            return false;
        }
        if (!passwordRegex.test(inputs.password)) {
            toast.error(
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and at least 8 characters long."
            );
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validator()) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append("fullname", `${inputs.firstName} ${inputs.lastName}`);
                formData.append("email", inputs.email);
                formData.append("password", inputs.password);
                formData.append("personalId", personalId);
                formData.append("taxDeclaration", taxDeclaration);

                const { data } = await axios.post("http://localhost:3000/api/owners/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setLoading(false);
                toast.success("Account created successfully. Please check your email for verification instructions.");

            } catch (error) {
                if (
                    error.response &&
                    error.response.status === 400 &&
                    error.response.data.error === "Email already exists"
                ) {
                    toast.error("Email already exists. Please use a different email address.");
                } else {
                    console.log(error);
                }
            }
        }
    };
    return (
        <>
          <section className="min-h-screen flex items-stretch text-white ">
            <div
              className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D)",
              }}
            >
              <div className="absolute bg-black opacity-60 inset-0 z-0" />
              <div className="w-full px-24 z-10">
                <h1 className="text-5xl font-bold text-left tracking-wide">
                  Culinary Empowerment: Restaurant Owners' Login.{" "}
                </h1>
                <p className="text-3xl my-4">
                  "Savor success, where flavors meet entrepreneurial excellence."
                </p>
              </div>
            </div>
            <div
              className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
              style={{ backgroundColor: "#161616" }}
            >
              <div
                className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D)",
                }}
              >
                <div className="absolute bg-black opacity-60 inset-0 z-0" />
              </div>
              <div className="w-full py-6 z-20">
                <h1 class="text-4xl font-bold tracking-wide text-white-800">
                  Reservi signup
                </h1>
                <form
                  action=""
                  className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
                  onSubmit={handleSubmit}
                >
                           <div className="flex pb-2 pt-4">
          <div className="flex-1 pr-2">
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              placeholder="First Name"
              className="block w-full p-4 text-lg rounded-sm bg-black"
            />
          </div>
          <div className="flex-1 pl-2">
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              placeholder="Last Name"
              className="block w-full p-4 text-lg rounded-sm bg-black"
            />
          </div>
        </div>
                  <div className="pb-2 pt-4">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      placeholder="Email"
                      className="block w-full p-4 text-lg rounded-sm bg-black"
                    />
                  </div>
                  <div className="pb-2 pt-4 relative">
                    <label htmlFor="password"></label>
                    <input
                      className="block w-full p-4 text-lg rounded-sm bg-black pr-12" 
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <span className="show" onClick={togglePasswordVisibility}>
                      {passwordVisible ? "HIDE" : "SHOW"}
                    </span>
                    </span>
             
                  </div>
                  <div className="pb-2 pt-4 relative">
  <label htmlFor="personalId" className="text-gray-400">Upload Personal ID Image</label>
  <input
    type="file"
    name="personalId"
    id="personalId"
    onChange={handlePersonalIdChange} 
    accept="image/*"
    className="block w-full p-4 text-lg rounded-sm bg-black"
  />
</div>
<div className="pb-2 pt-4 relative">
  <label htmlFor="taxDeclarationChange" className="text-gray-400">Upload Tax Declaration Change Image</label>
  <input
    type="file"
    name="taxDeclarationChange"
    id="taxDeclarationChange"
    onChange={handleTaxDeclarationChange}
    accept="image/*"
    className="block w-full p-4 text-lg rounded-sm bg-black"
  />
</div>
                  <div className="px-4 pb-2 pt-4">
                    <button className="uppercase block w-full p-4 text-lg rounded-full bg-red-500 hover:bg-red-600 " value="Signup"  type="submit">
                      sign in
                    </button>
                  </div>
                  <div className="text-center text-gray-400  hover:text-gray-100">
                   Already have a account?{" "}
                    <a
                      href="#"
                      className="text-red-500 hover:text-red-600 hover:underline"
                      onClick={() => navigate("/")}
                    >
                      Login here
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </>
      );
}

export default Signup
