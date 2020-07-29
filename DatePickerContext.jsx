import React from "react";

export const datepickerContextDefaultValue = {
    startDate: null,
    endDate: null,
    hoverDate: null,
    monthList: [],
    activeMonth: 0,
    multiSelect: false,
    maxDateRange: 0,
    minDate: null,
    setStartDate: (newStartDate) => { },
    setEndDate: (newEndDate) => { },
    setHoverDate: (newHoverDate) => { },
    setActiveMonth: (monthRef, newActiveMonth) => { },
    clearDates: (newStartDate) => {},
/*     onCalenderHoverHandler: (newDate) => { },
    onCalenderClickHandler: (newDate) => { }, */

}
export default React.createContext(datepickerContextDefaultValue);