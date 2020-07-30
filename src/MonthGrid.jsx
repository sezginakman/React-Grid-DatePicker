import React from "react";
import "./monthGrid.scss";
import DateButton from "./DateButton";
import { getNumberOfDays, toTwoDigitString } from "./dateHelper";
import classnames from "classnames";


export default class MonthGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dateList: []
        };
    }
    componentDidMount() {
        const { year, month } = this.props;
        this.className = classnames(['month-grid', this.props.className]);
        this.lenghtOfDays = getNumberOfDays(year, month);
        this.setState({
            dateList: Array.from({ length: this.lenghtOfDays }, (v, k) => k + 1).map((day) => {
                let date = `${year}-${toTwoDigitString(month)}-${toTwoDigitString(day)}`
                let realDate = new Date(year, month, day);
                let label = toTwoDigitString(day);
                return (<DateButton key={date} realDate={realDate} dateTime={date} label={label} ></DateButton>);
            })
        });
    }
    render() {
        return (
            <div ref={this.props.refProp} className="monthgrid-container" >
                <span className="month-name">{this.props.monthName}</span>
                <div className={this.className}>
                    {this.state.dateList}
                </div>
            </div>
        );
    }
}