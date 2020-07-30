import React from "react";
import "./dayOfWeekRow.scss";

function DayOfWeekRow(props) {
    const { dayNamesMin, firstDay } = props;
    var endOfDays = dayNamesMin.slice(0, firstDay);
    var startDays = dayNamesMin.slice(firstDay);
    const dayOfWeeks = startDays.concat(endOfDays).map((dayOfWeek) => {
        return (
            <div key={dayOfWeek} className="wrapper">
                <span className="cell">
                    {dayOfWeek}
                </span>
            </div>
        )
    });
    return (
        <div className={"dayofweek "+props.className}>
            {dayOfWeeks}
        </div>
    );
}
export default DayOfWeekRow;