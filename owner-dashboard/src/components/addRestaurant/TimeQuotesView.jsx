import React from 'react'

function TimeQuotasView() {
    return (
        <div className="timeQuotascontainer">
            <label className='timeQuotasLabel'>Opening Time</label>
            <input
                className='timeQuotasInput'
                type="time"
                name="openingTime"
            />
            <label className='timeQuotasLabel'>Closing Time</label>
            <input
                className='timeQuotasInput'
                type="time"
                name="closingTime"
            />
            <label className='timeQuotasLabel'>Reservation Quotas</label>
            <input
                className='timeQuotasInput'
                type="number"
                name="reservationQuota"
                max="250"
            />
        </div>
    )
}

export default TimeQuotasView
