import React, { useEffect } from 'react';
import axios from "../../../services/axios-interceptor"
import { setHasRestaurant } from "../../features/ownerSlice"
import { useSelector, useDispatch } from 'react-redux';


function IntroductionView() {
  const dispatch = useDispatch();

  const checkOnwership = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/restaurants/myRestaurant')
      console.log(data)
      if (data) {

        dispatch(setHasRestaurant('true'))
      }
    }
    catch (error) {
      console.log(error)
      if (error.response.status === 404) {
        dispatch(setHasRestaurant('false'))
      }
    }
  }

  useEffect(() => {
    checkOnwership()
  })

  return (
    <div>
      <h1>Introduction</h1>
    </div>
  )
}

export default IntroductionView
