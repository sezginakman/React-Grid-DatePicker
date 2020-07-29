import React from "react";
import DatePickerContext from "./DatePickerContext";
import "./dateButton.scss";
import { dateDiffInDays, Dates } from "./dateHelper";

export default class DateButton extends React.PureComponent {
    static contextType = DatePickerContext;
    constructor(props) {
        super(props);
        this.classProps = {
            normal: "",
            selected: " is-selected",
            inRange: " is-inRange",
            start: " is-end",
            end: " is-start",
            hover: " hover",
            disable: " is-disable",
            today: " is-today"
        }
        this.calenderHoverHandler = this.calenderHoverHandler.bind(this);
        this.calenderClickHandler = this.calenderClickHandler.bind(this);
    }
    calenderHoverHandler = (newDate) => {
        const { minDate, startDate, maxDateRange, setHoverDate } = this.context;

        if (startDate !== null) {
            if (maxDateRange !== 0 && maxDateRange < dateDiffInDays(startDate, newDate)) {

                let maxDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                if (Dates.compare(startDate, newDate) === -1)
                    maxDate.setDate(maxDate.getDate() + maxDateRange);
                else if (Dates.compare(startDate, newDate) === 1)
                    maxDate.setDate(maxDate.getDate() - maxDateRange);

                if (Dates.compare(maxDate, minDate) <= 0) setHoverDate(minDate);
                else setHoverDate(maxDate);
            } else {
                if (Dates.compare(newDate, minDate) <= 0) setHoverDate(minDate);
                else
                    setHoverDate(newDate);
            }

        }

    }
    calenderClickHandler = (newDate) => {
        const availableDates = this.context.availableDates;
        if (availableDates !== null && availableDates.every(availableDate => Dates.compare(newDate, availableDate) !== 0)) return;

        if (this.context.minDate != null && Dates.compare(newDate, this.context.minDate) < 0) return;

        if (this.context.endDate !== null && this.context.startDate !== null) this.context.clearDates(newDate);
        if (this.context.startDate === null) this.context.setStartDate(newDate);
        if (this.context.endDate === null && this.context.startDate !== null) this.context.setEndDate(this.context.hoverDate);
    }
    render() {

        const { realDate, label, dateTime } = this.props;
        let className = "date-button ";
        let wrapperState = "";
        let buttonState = "";
        const currentDate = realDate;
        const { minDate, startDate, endDate, hoverDate } = this.context;
        const availableDates = this.context.availableDates;
        let selectionEndDate = endDate ?? hoverDate ?? startDate;


        if (Dates.compare(currentDate, minDate) === -1)
            buttonState = "disable";

        else if (Dates.compare(currentDate, startDate) === 0 || Dates.compare(currentDate, selectionEndDate) === 0)
            buttonState = "selected";

        else if (Dates.inRange(currentDate, startDate, selectionEndDate) || Dates.inRange(currentDate, selectionEndDate, startDate))
            buttonState = "inRange";

        if (availableDates !== null && availableDates.every(availableDate => Dates.compare(currentDate, availableDate) !== 0)) {
            buttonState = "disable";
        }
        if (buttonState !== "")
            className = className + this.classProps[buttonState];

        if (dateTime === new Date().toISOString()) {
            className = className + this.classProps["today"];
        }
        if (Dates.compare(currentDate, startDate) === 0) {
            if (Dates.compare(startDate, selectionEndDate) === -1) wrapperState = this.classProps["end"];
            if (Dates.compare(startDate, selectionEndDate) === 1) wrapperState = this.classProps["start"];
        }
        else if (Dates.compare(currentDate, selectionEndDate) === 0) {
            if (Dates.compare(startDate, selectionEndDate) === -1) wrapperState = this.classProps["start"];
            if (Dates.compare(startDate, selectionEndDate) === 1) wrapperState = this.classProps["end"];
        }

        return (
            <div className="date-wrapper" onClick={() => this.calenderClickHandler(realDate)} onMouseEnter={() => this.calenderHoverHandler(realDate)}>
                <div className={"start-column" + wrapperState}></div>
                <button className={className}>
                    <time dateTime={dateTime}>{label}</time>
                </button>
                <div className={"end-column" + wrapperState}></div>
            </div>

        );
    }
}