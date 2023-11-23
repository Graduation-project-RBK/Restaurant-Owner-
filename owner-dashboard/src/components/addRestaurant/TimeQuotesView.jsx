import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOpeningTime, setClosingTime, setReservationQuota, setIsNextDisabled } from '../../features/restaurantSlice';
import dayjs from 'dayjs';
import { TimePicker } from 'antd';
import moment from 'moment';

const format = 'HH:mm';

function TimeQuotasView() {
    const { openingTime, closingTime, reservationQuota } = useSelector(state => state.restaurant);
    const dispatch = useDispatch();

    useEffect(() => {
        checkIsNextDisabled(openingTime, closingTime, reservationQuota);
    }, []);

    const handleOpeningTimeChange = (newOpeningTime) => {
        dispatch(setOpeningTime(newOpeningTime.$d));

        checkIsNextDisabled(newOpeningTime, closingTime, reservationQuota);
    };

    const handleClosingTimeChange = (newClosingTime) => {
        dispatch(setClosingTime(newClosingTime.$d));

        checkIsNextDisabled(openingTime, newClosingTime, reservationQuota);
    };

    const handleQuotaChange = (event) => {
        const newQuota = event.target.value;
        dispatch(setReservationQuota(newQuota));
        checkIsNextDisabled(openingTime, closingTime, newQuota);
    }

    const checkIsNextDisabled = (openingTime, closingTime, reservationQuota) => {
        if (!openingTime || !closingTime || !reservationQuota) {
            dispatch(setIsNextDisabled(true));
        } else {
            dispatch(setIsNextDisabled(false));
        }
    };

    return (
        <div className="timeQuotascontainer">

            <label className='timeQuotasLabel'>Opening Time</label>
            <TimePicker defaultValue={dayjs('24:00', format)} format={format} onChange={handleOpeningTimeChange} />
            <label className='timeQuotasLabel'>Closing Time</label>
            <TimePicker defaultValue={dayjs('24:00', format)} format={format} onChange={handleClosingTimeChange} />
            <label className='timeQuotasLabel'>Reservation Quotas</label>
            <input
                className='timeQuotasInput'
                type="number"
                name="reservationQuota"
                max="250"
                onChange={handleQuotaChange}
                value={reservationQuota}
            />
        </div>
    );
}

export default TimeQuotasView;
