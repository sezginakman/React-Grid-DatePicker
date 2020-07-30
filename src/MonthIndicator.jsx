import React, { useContext } from "react";
import DatePickerContext from "./DatePickerContext";
import "./monthIndicator.scss";

function MonthIndicator(props) {
    const datePickerContext = useContext(DatePickerContext);
    const { monthList, monthNames, onClick } = props;

    const Months = monthList.map((date, index) => {
        const {month,year,dateTime,reactRef}=date;
        const monthName = monthNames[month] + (index === 0 || index === 12 ? ' '+year : '');
        let className = "month-button " + (datePickerContext.activeMonth === index ? "is-selected" : "");
        return (
            <button
                className={className}
                key={dateTime}
                dateTime={dateTime}
                onClick={() => onClick(reactRef, index)} >
                <time dateTime={dateTime}>{monthName}</time>
            </button>
        )
    });
    return (
        <div className="month-indicator">
            {Months}
        </div>
    );
}
export default MonthIndicator;