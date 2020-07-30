import React from "react";
import styled from 'styled-components';
import DatePickerContext from "./DatePickerContext";
import "./calendar.scss";

import MonthIndicator from "./MonthIndicator";
import MonthGrid from "./MonthGrid";
import DayOfWeekRow from "./DayOfWeekRow";

import { localization, scrollParentToChild } from "./service";
import { getMonthsOneYearRange, toTwoDigitString, getStartDate, Dates } from "./dateHelper";


const Month = styled(MonthGrid)`
    & > :first-child {
      grid-column: ${props => props.startDay};
    }
`;

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            hoverDate: null,
            monthList: [],
            activeMonth: 0,
            multiSelect: false,
            maxDateRange: 0,
            minDate: null,
            maxDate: null,
            availableDates: [],
            setStartDate: (newStartDate) => {
                this.setState({
                    ...this.state,
                    startDate: newStartDate,
                    endDate: (!this.state.multiSelect) ? newStartDate : null
                }, () => { if (!this.state.multiSelect) this.props.onDateChanged(newStartDate, newStartDate); });

            },
            setEndDate: (newEndDate) => {
                this.setState({ ...this.state, endDate: newEndDate }, () => {
                    if (Dates.compare(this.state.startDate, newEndDate) === 1)
                        this.props.onDateChanged(newEndDate, this.state.startDate)
                    else
                        this.props.onDateChanged(this.state.startDate, newEndDate)
                });
            },
            setHoverDate: (newHoverDate) => {
                this.setState({ ...this.state, hoverDate: newHoverDate });

            },
            setMaxDate: (newMaxDate) => {
                this.setState({ ...this.state, maxDate: newMaxDate });
            },
            setActiveMonth: (monthRef, newActiveMonth) => {
                this.setState({ ...this.state, activeMonth: newActiveMonth },
                    scrollParentToChild(this.containerRef.current, monthRef.current)
                );
            },
            clearDates: (newStartDate) => {
                this.setState({
                    ...this.state,
                    startDate: newStartDate,
                    endDate: (!this.state.multiSelect) ? newStartDate : null,
                    hoverDate: newStartDate,
                }, () => { if (!this.state.multiSelect) this.props.onDateChanged(newStartDate, newStartDate); });
            },
            /*  onCalenderHoverHandler:this.calenderHoverHandler,
             onCalenderClickHandler:this.calenderClickHandler */
        }
        this.region = "en";
        this.regionSettings = localization[this.region];
        this.monthComponents = [];
        this.setMonthListAndComponent = this.setMonthListAndComponent.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.monthIndicatorClickHandler = this.monthIndicatorClickHandler.bind(this);
        this.getDayOfWeekRowProps = this.getDayOfWeekRowProps.bind(this);
        this.getCalendarContainerProps = this.getCalendarContainerProps.bind(this);
        /*   this.calenderHoverHandler=this.calenderHoverHandler.bind(this);
          this.calenderClickHandler=this.calenderClickHandler.bind(this); */
        this.containerRef = React.createRef();
    }
    componentDidMount() {
        let months = [];
        this.monthComponents = [];
        this.setMonthListAndComponent(months, this.monthComponents)
        this.setState({
            ...this.state,
            monthList: months,
            multiSelect: this.props.hasOwnProperty("multiSelect"),
            maxDateRange: this.props.hasOwnProperty("multiSelect") ? this.props.multiSelect["maxDateRange"] ?? 0 : 0,
            minDate: this.props["minDate"],
            startDate: this.props["startDate"] ?? null,
            endDate: this.props.hasOwnProperty("multiSelect") ? (this.props["endDate"] ?? this.props["startDate"] ?? null) : this.props["startDate"],
            availableDates: this.props["availableDates"] ?? null
        }, () => {
            setTimeout(() => {
                if (this.state.startDate !== null) {
                    var currentMonthIndex = this.state.monthList.findIndex(date => date.month === this.state.startDate.getMonth());
                    if (currentMonthIndex > -1) {
                        var currentMonth = this.state.monthList[currentMonthIndex];
                        if (currentMonth !== null && currentMonth.reactRef.current !== null)
                        scrollParentToChild(this.containerRef.current, currentMonth.reactRef.current);
                    }
                }
            }, 250);
        });
    }
    onScroll = (event) => {
        var activeDateIndex = this.state.monthList.findIndex(date => (this.containerRef.current.offsetTop + event.target.scrollTop) - date.reactRef.current.offsetTop <= 0);
        if (activeDateIndex !== this.state.activeMonth)
            this.setState({ ...this.state, activeMonth: activeDateIndex });
    }
    monthIndicatorClickHandler = (monthRef, newActiveMonth) => {
        this.state.setActiveMonth(monthRef, newActiveMonth);
    };
    setMonthListAndComponent = (months, monthComponents) => {
        const yearProp = this.props.minDate.getFullYear();
        const monthProp = this.props.minDate.getMonth();
        getMonthsOneYearRange(yearProp, monthProp).map((date) => {
            date.reactRef = React.createRef();
            date.dateTime = `${date.year}-${toTwoDigitString(date.month)}`;
            let { reactRef, year, month } = date;
            let monthKey = `${year}${month}`;
            let monthsProps = {
                refProp: reactRef,
                key: monthKey,
                monthName: this.regionSettings.monthNames[month],
                startDay: getStartDate(year, month, this.regionSettings.firstDay),
                year: year,
                month: month
            }
            monthComponents.push(<Month {...monthsProps}></Month>);
            months.push(date);
        });
    }
    getMonthIndicatorProps = () => ({
        onClick: this.monthIndicatorClickHandler,
        monthList: this.state.monthList,
        monthNames: this.regionSettings.monthNames
    });
    getDayOfWeekRowProps = () => ({
        className: "week",
        dayNamesMin: this.regionSettings.dayNamesMin,
        firstDay: this.regionSettings.firstDay
    });
    getCalendarContainerProps = () => ({
        className: "month-container",
        ref: this.containerRef,
        onScroll: this.onScroll
    });

    render() {
        return (
            <DatePickerContext.Provider value={this.state}>
                <div className={"calendar"}>
                    <MonthIndicator {...this.getMonthIndicatorProps()}></MonthIndicator>
                    <div className={"calendar-container"}>
                        <DayOfWeekRow {...this.getDayOfWeekRowProps()}></DayOfWeekRow>
                        <div ref={this.containerRef} className="month-container" onScroll={this.onScroll}>
                            {this.monthComponents}
                        </div>
                    </div>
                </div>
            </DatePickerContext.Provider>
        );
    }
}