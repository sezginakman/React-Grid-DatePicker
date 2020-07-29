import React from "react";
import "./dateButton.scss";

function DateIndicator(props) {
    const { date, label } = props;
    return (
        <button className={props.className} onClick={props.onClick} onMouseEnter={props.onMouseEnter}>
            <time dateTime={date}>{label}</time>
        </button>
    );
}
export default DateIndicator;