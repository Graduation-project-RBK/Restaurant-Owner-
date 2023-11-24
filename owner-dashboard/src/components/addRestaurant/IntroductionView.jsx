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
    <div className='introduction'>
      <div>
        <h1 className='text-3xl mb-4'>Introduction</h1>
      </div>
      <div >
        <h1 className='text-5xl mt-4'>Tell Us About Your Restaurant</h1>
      </div>
      <div>
        <p>In this step, we'll ask you which type of restaurant you have, let us know the location and how many guests you can host in a day, Then give us a look into your place!</p>
      </div>

    </div>
  )
}

export default IntroductionView
