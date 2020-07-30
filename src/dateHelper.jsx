export const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
export const toTwoDigitString = (number) => String(number).padStart(2, '0');
export const getNumberOfDays = (year, month) => {
    const date = new Date(year, month, 1);
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
export const getDayOfWeek = (year, month) => new Date(year, month, 1).getDay();
export const getMonthsOneYearRange = (startYear, startMonth) => {
    const totalMonth = 12;
    return (Array.from({ length: totalMonth + 1 }, (_, i) => {
        return {
            month: startMonth + i >= totalMonth ? (startMonth + i) - totalMonth : startMonth + i,
            year: startMonth + i >= totalMonth ? startYear + 1 : startYear
        }
    }));
};
export const getStartDate = (year, month, firstDay) => {
    let startDayIndex = getDayOfWeek(year, month);
    return range(firstDay, 6, 1).concat(range(0, firstDay === 0 ? 0 : firstDay - 1, 1)).indexOf(startDayIndex) + 1;
}
export const today = new Date();

const _MS_PER_DAY = 1000 * 60 * 60 * 24;
// a and b are javascript Date objects
export const dateDiffInDays = (startDate, endDate) => {
    // Discard the time and time-zone information.
    const startDateUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endDateUtc = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
    return Math.floor(Math.abs(startDateUtc - endDateUtc) / _MS_PER_DAY);
}
export const Dates = {
    convert: function (d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year, d.month, d.date) :
                                NaN
        );
    },
    compare: function (a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        if (a !== null & b === null) return 1;
        if (a === null & b !== null) return -1;
        if (a === null & b === null) return 0;
        return (
            isFinite(a = this.convert(a).valueOf()) &&
                isFinite(b = this.convert(b).valueOf()) ?
                (a > b) - (a < b) :
                NaN
        );
    },
    inRange: function (d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        if (d === null || start === null || end === null) return false;       
        return (
            isFinite(d = this.convert(d).valueOf()) &&
                isFinite(start = this.convert(start).valueOf()) &&
                isFinite(end = this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
        );
    }
}