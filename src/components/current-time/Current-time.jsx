import React from 'react';


let hours = new Date().getHours()
let minutes = new Date().getMinutes()
let ampm = hours > 12 ? 'PM' : 'AM';

export default class CurrentTime extends React.Component {

    state = {
        time: `${hours}:${minutes} ${ampm}`
    }

    locTickTime() {
        let time = this.getLocalTime();
        
        return time;
    }

    getLocalTime() {
        let date = new Date();
    
        let time = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            ampm: 'AM'
        };
    
        if(time.hours === 12) {
            time.ampm = 'PM';
        } else if(time.hours > 12) {
            time.ampm = 'PM';
        }
    
        if(time.hours < 10) {
            time.hours = '0' + time.hours;
        }
    
        if(time.minutes < 10) {
            time.minutes = '0' + time.minutes;
        }

        return this.setState({ time: `${time.hours}:${time.minutes} ${time.ampm}` });
    }
    
    componentDidMount() {
        this.timerId = setInterval(() => this.locTickTime(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        return (
            <div className="header__time">
                { this.state.time }
            </div>
        )
    }
}
