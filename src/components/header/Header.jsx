import React from 'react';

import CurrentTime from '../current-time/';
import SettingsWeather from '../settings-weather/';

import './Header.css';

import moon from '../../img/header/moon-phase-outline.png'

export default class Header extends React.Component {

    render() {

        const { ceilTemp, gettingWeather, weatherProperties: {icon, temp, humidity, wind, sunrise, city}, tempChange } = this.props;

        let tempHeader = ceilTemp(temp)
        
        return (
            <header className="header">
                
                <div className="header-container">

                    <div className="header__city">{city ? city : ''}</div>

                    <CurrentTime />

                    <div className="header-main">
                        <div className="header-main__img header-main__img_indents">
                            <img src={icon ? icon : moon} alt="moon" className="header-main__img_moon"/>
                        </div>
                        
                        <div className="header-main__temperature header-main__temperature_indents">
                            {tempHeader || 0}<sup className="header-main__temperature_sup">{tempChange ? '°C' : '°F' }</sup> 
                        </div>

                        <div className="header-main__input header-main__input_indents">
                            <form onSubmit={gettingWeather}>
                                <input 
                                    type="text" 
                                    name="city" 
                                    className="header-main__input_cities" 
                                    placeholder="Введите город..."
                                    autoComplete="off"
                                    />
                            </form>
                        </div>

                    </div>
                    
                </div>

                <SettingsWeather 
                    humidity={humidity}
                    wind={wind}
                    sunrise={sunrise}/>
            </header>
            
        )
    }
}