import React, { useEffect, useState , Fragment } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink , useLocation} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../services/axios-interceptor.js";
import { setNotificationBadge } from "../../features/notificationSlice";
import { useNavigate } from "react-router-dom";
import { FaComments, FaEdit } from 'react-icons/fa';
import {MdRateReview} from 'react-icons/md';
import {TbLogout} from 'react-icons/tb'


import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function NavBar() {
  const location = useLocation();
  const isReservationHistoryPage = location.pathname === '/reservation-history';
  const isDashboardPage = location.pathname === '/home';
  const isPendingPage = location.pathname === '/reservation-list';
  const isImagesPage = location.pathname === '/Images';
  const isMessagesPage = location.pathname === '/Messages';
  const isReviewsPage = location.pathname === '/Reviews';
  const isSettingsPage = location.pathname === '/Settings';





  
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
  <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#ffffff] py-2 shadow-md border-black dark:bg-white dark:shadow-gray-900 lg:flex-wrap lg:justify-start lg:py-3">
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
          className="mb-4 ml-2 mr-5 mt-3 flex items-center text-red-600 hover:text-neutral-900 focus:text-neutral-900 dark:text-red-500 dark:hover:text-neutral-900 dark:focus:text-neutral-900 lg:mb-0 lg:mt-0 "
          href="/home"
          style={{ fontSize: '25px' }}
        >
          Reservi.<a className="text-black text-sm" >for owners</a>
        </a>
        {/* Left navigation links */}
        <ul
          className=" list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
        >
      <li className={`mb-6 lg:mb-0 lg:pr-8 ml-20 ${isDashboardPage ? 'text-red-700' : 'text-black'}`}>
            {/* Dashboard link */}
          
              <NavLink  className="transition duration-200 hover:text-red-700 hover:ease-in-out focus:text-red-700 disabled:text-white motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-red dark:focus:text-red lg:px-2 [&.active]:text-red-600 dark:[&.active]:text-red-600" to="/home">Dashboard</NavLink>
           
          </li>
          {/* Team link */}
          <li className={`mb-6 lg:mb-0 lg:pr-8 ${isPendingPage ? 'text-red-700' : 'text-black'}`}>
           
                          <NavLink className="transition duration-200 hover:text-red-700 hover:ease-in-out focus:text-red-700 disabled:text-white motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-red dark:focus:text-red lg:px-2 [&.active]:text-red-600 dark:[&.active]:text-red-600" to="/reservation-list" onClick={removeNotificationBadge}>
                Pending Reservations
                <span id={notificationBadge ? "circle" : "noCircle"}>
                  {" "}
                  {notificationNumber}
                </span>
              </NavLink>
          </li>
          {/* Projects link */}
          <li className={`mb-6 lg:mb-0 lg:pr-8 ${isReservationHistoryPage ? 'text-red-700' : 'text-black'}`}>
        <NavLink
          to="/reservation-history"
          className="transition duration-200 hover:text-red-700 hover:ease-in-out focus:text-red-700 disabled:text-white motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-red dark:focus:text-red lg:px-2 [&.active]:text-red-600 dark:[&.active]:text-red-600"
        >
          Reservation History
        </NavLink>
      </li>
      <li className={`mb-6 lg:mb-0 lg:pr-8 ${isImagesPage ? 'text-red-700' : 'text-black'}`}>
            {/* Dashboard link */}
            
              <NavLink className="transition duration-200 hover:text-red-700 hover:ease-in-out focus:text-red-700 disabled:text-white motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-red dark:focus:text-red lg:px-2 [&.active]:text-red-600 dark:[&.active]:text-red-600" to="/Images">Images</NavLink>
          </li>
        </ul>
        
      </div>
      {/* Right elements */}
      <div className="relative flex items-center">
        {/* Cart Icon */}
        <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black-100=x   shadow-sm ring-1 ring-inset ring-white hover:bg-white hover:text-red-600">
        <FaList style={{ fontSize: '20px' }}/>
          <ChevronDownIcon className="-mr-1 h-5 w-5 hover:text-red-600" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-white text-red-600' : 'text-black',
                    'block px-4 py-2 text-sm'
                  )}
                >
                   <NavLink  to="/Messages"><FaComments style={{ fontSize: '20px' }}/>messages</NavLink>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-white text-red-600' : 'text-black',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  <NavLink to="/Reviews"><MdRateReview style={{ fontSize: '20px' }}/>reviews</NavLink>
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-white text-red-600' : 'text-black',
                    'block px-4 py-2 text-sm'
                  )}
                >
                 <NavLink to="/" onClick={logout}><TbLogout style={{ fontSize: '20px' }}/>Logout</NavLink>
                </a>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

      </div>
    </div>
  </nav>
</>

  );
}

export default NavBar;
