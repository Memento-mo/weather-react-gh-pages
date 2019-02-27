import React from 'react';

import './Item.css';

export default class Item extends React.Component {

    changeDate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const index = date.indexOf(' ');
        let day = new Date(date.slice(0, index));
        
        return days[day.getDay()]
    }

    render() {

        const { day, icon, tempMax, weather, ceilTemp, tempChange } = this.props;
        
        let dayOfTheWeek = this.changeDate(day);
        let temp = ceilTemp(tempMax);
        return (
            <div className="item">
                <div className="item-main">
                    <div className="weather-day">{dayOfTheWeek === undefined ? 'None' : dayOfTheWeek}</div>
                    <img src={icon} alt="icon" className="weather-icon"/>
                    <div className="weather-max"><div className="weather-temp">{temp || '0'}</div><sup>{ tempChange ? '°C' : '°F' }</sup></div>
                </div>
                <div className="weather-feel">
                    {weather || '0'}
                </div>
            </div>
        )
    }
}