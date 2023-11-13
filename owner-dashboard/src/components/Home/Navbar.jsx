import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink , useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../services/axios-interceptor.js";
import { setNotificationBadge } from "../../features/notificationSlice";
import { useNavigate } from "react-router-dom";
import { FaComments } from 'react-icons/fa';
import {MdRateReview} from 'react-icons/md';
import {TbLogout} from 'react-icons/tb'
import {IoSettingsSharp} from 'react-icons/io5'


function NavBar() {
  const location = useLocation();
  const isReservationHistoryPage = location.pathname === '/reservation-history';
  const isDashboardPage = location.pathname === '/home';
  const isPendingPage = location.pathname === '/reservation-list';
  const isImagesPage = location.pathname === '/Images';
  const isMessagesPage = location.pathname === '/Messages';





  
  const [notificationNumber, setNotificationNumber] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notificationBadge } = useSelector((state) => state.notification);
  const checkNotification = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/owners/notification`
      );
      dispatch(setNotificationBadge(data));

      console.log(notificationBadge);
    } catch (error) {
      console.log(error);
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }

    if (notificationBadge) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/restaurants/myRestaurant`
        );

        const { data } = await axios.get(
          `http://localhost:3000/api/reservations/pending/${response.data.id}`
        );
        setNotificationNumber(data.length);
      } catch (error) {
        console.log(error);
        if (error.response.status === 403 || error.response.status === 401) {
          localStorage.clear();
          navigate("/");
        }
      }
    }
  };

  const removeNotificationBadge = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/owners/notification`
      );
      dispatch(setNotificationBadge(data));
    } catch (error) {
      console.log(error);
      if (error.response.status === 403 || error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const logout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    checkNotification();
  }, []);

  return (
<>
  {/* Main navigation container */}
  <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black dark:bg-black dark:shadow-black lg:flex-wrap lg:justify-start lg:py-7">
    <div className="flex w-full flex-wrap items-center justify-between px-3">
      {/* Hamburger button for mobile view */}
      <button
        className="block border-0 bg-transparent px-2 text-neutral-900 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-100 lg:hidden"
        type="button"
        data-te-collapse-init=""
        data-te-target="#navbarSupportedContent1"
        aria-controls="navbarSupportedContent1"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        {/* Hamburger icon */}
        <span className="[&>svg]:w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {/* Collapsible navigation container */}
      <div
        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
        id="navbarSupportedContent1"
        data-te-collapse-item=""
      >
        {/* Logo */}
        <a
          className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-red-500 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0 "
          href="#"
          style={{ fontSize: '25px' }}
        >
          Reservi.
        </a>
        {/* Left navigation links */}
        <ul
          className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
          data-te-navbar-nav-ref=""
        >
      <li className={`mb-4 lg:mb-0 lg:pr-2 ${isDashboardPage ? 'text-red-700' : 'text-neutral-500'}`}>
            {/* Dashboard link */}
          
              <NavLink  className="transition duration-200 hover:text-red-700 hover:ease-in-out focus:text-red-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-red dark:focus:text-red lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-red-600" to="/home">Dashboard</NavLink>
           
          </li>
          {/* Team link */}
          <li className={`mb-4 lg:mb-0 lg:pr-2 ${isPendingPage ? 'text-red-700' : 'text-neutral-500'}`}>
           
                          <NavLink className="transition duration-200 hover:text-red-700 hover:ease-in-out focus:text-red-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-red dark:focus:text-red lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-red-600" to="/reservation-list" onClick={removeNotificationBadge}>
                Pending Reservations
                <span id={notificationBadge ? "circle" : "noCircle"}>
                  {" "}
                  {notificationNumber}
                </span>
              </NavLink>
          </li>
          {/* Projects link */}
          <li className={`mb-4 lg:mb-0 lg:pr-2 ${isReservationHistoryPage ? 'text-red-700' : 'text-neutral-500'}`}>
        <NavLink
          to="/reservation-history"
          className="transition duration-200 hover:text-red-700 hover:ease-in-out focus:text-red-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-red dark:focus:text-red lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-red-600"
        >
          Reservation History
        </NavLink>
      </li>
      <li className={`mb-4 lg:mb-0 lg:pr-2 ${isImagesPage ? 'text-red-700' : 'text-neutral-500'}`}>
            {/* Dashboard link */}
            
              <NavLink className="transition duration-200 hover:text-red-700 hover:ease-in-out focus:text-red-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-red dark:focus:text-red lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-red-600" to="/Images">Images</NavLink>
          </li>
        </ul>
        
      </div>
      {/* Right elements */}
      <div className="relative flex items-center">
        {/* Cart Icon */}
        <a
    className={`mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400 ${isMessagesPage ? 'text-red-700' : 'text-white'}`}          href="#"
        >
          <span className="w-8 h-8">
          <NavLink  to="/Messages"><FaComments style={{ fontSize: '20px' }}/></NavLink>
          </span>
        </a>
        <a
          className="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          href="#"
        >
          <span className="w-8 h-8">
       <NavLink to="/Reviews"><MdRateReview style={{ fontSize: '20px' }}/></NavLink>
          </span>
        </a>
        <a
          className="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          href="#"
        >
          <span className="w-8 h-8">
       <NavLink to="/Settings"><IoSettingsSharp style={{ fontSize: '20px' }}/></NavLink>
          </span>
        </a>
        <a
          className="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          href="#"
        >
          <span className="w-8 h-8">
       <NavLink to="/" onClick={logout}><TbLogout style={{ fontSize: '20px' }}/></NavLink>
          </span>
        </a>

      </div>
    </div>
  </nav>
</>

  );
}

export default NavBar;
