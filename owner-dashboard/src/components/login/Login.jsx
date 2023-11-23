import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

function Login() {
  const [inputs, setInputs] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/owners/signin",
        inputs
      );
      toast.success("Successfully Logged In");
      console.log(data);
      if (data.message === "User hasn't created a restaurant") {
        localStorage.setItem("token", data.token);

        navigate("/add-restaurant");
      } else if (data.message === "User hasn't chosen account type") {

        localStorage.setItem("token", data.token);

        navigate("/options");
      }


      else if (data.message === "owner successfully logged in") {
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 410 &&
        error.response.data.error === "Email doesn't exist"
      ) {
        toast.error("Please provide a correct email");
      } else if (
        error.response &&
        error.response.status === 411 &&
        error.response.data.error === "unvalid password"
      ) {
        toast.error("Please provide a correct password");
      } else if (
        error.response &&
        error.response.status === 403 &&
        error.response.data.message === "This account was banned by the admin."
      ) {
        toast.error("This account was banned by the admin.");
      } else if (
        error.response &&
        error.response.status === 403 &&
        error.response.data.message === "This account is pending the admin's decision."
      ) {
        toast.error("This account is pending the admin's decision.");
      } else if (
        error.response &&
        error.response.status === 403 &&
        error.response.data.message === "This account was declined by the admin."
      ) {
        toast.error("This account was declined by the admin.");
      } else if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.error ===
        "Account not verified. Another verification email has been sent. Please check your email for instructions."
      ) {
        toast.error(
          "Account not verified. Please check your email for verification instructions."
        );
      } else {
        console.log(error);
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
              Culinary Empowerment: Owner Hub{" "}
            </h1>
            <p className="text-3xl my-4">
              "Savor success, where flavors meet entrepreneurial excellence."
            </p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundImage: "repeating-radial-gradient(  #0c0a0a 80%,#2f312f 90%,#3f4549 90%)", backgroundSize: "65px 65px" }}
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
            <h1 className="text-4xl font-bold tracking-wide text-white-800">
              Reservi login
            </h1>
            <form
              action=""
              className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto"
              onSubmit={handleSubmit}
            >
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
                  className="block w-full p-4 text-lg rounded-sm bg-black pr-12" // Add pr-12 for right padding
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
              <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
                <a href="#">Forgot your password?</a>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-red-500 hover:bg-red-600 " value="LOGIN" type="submit">
                  sign in
                </button>
              </div>
              <div className="text-center text-gray-400  hover:text-gray-100">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-red-500 hover:text-red-600 hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Register here
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
