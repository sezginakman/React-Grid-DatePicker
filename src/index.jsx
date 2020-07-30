import React from "react";
import "./style.scss"
import Calendar from "./Calendar";

function DatePicker({onDateChanged,availableDates}) {

    const dateChangeHandler = (startDate, endDate) => {
        console.log(startDate, endDate);
       
    }
    return (

        <div className={"datepicker"}>
            {/*  <div className={"datepicker"}>
            <p>24.06 - 30.06</p>
            <span class="">
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H160V12c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V160h352v298c0 3.3-2.7 6-6 6z"></path>
                </svg>
            </span>  multiSelect={{ maxDateRange: 3 }} availableDates={[new Date(2020, 6, 1),
                new Date(2020, 6, 2),
                new Date(2020, 6, 3),
                new Date(2020, 6, 4),
                new Date(2020, 6, 10),
                new Date(2020, 6, 11)]}
        </div> */}
            <Calendar  minDate={new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())} onDateChanged={dateChangeHandler}
               startDate={new Date(2020, 7, 2)}              
               availableDates={[new Date(2020, 7, 1),
                new Date(2020, 7, 2),
                new Date(2020, 7, 3),
                new Date(2020, 7, 4),
                new Date(2020, 7, 10),
                new Date(2020, 7, 11)]}
            ></Calendar>

        </div>
    );
}
export default DatePicker; 