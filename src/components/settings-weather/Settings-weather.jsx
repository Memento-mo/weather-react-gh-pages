import React from 'react';

import './Settings-weather.css';

import arrow from '../../img/header/216277-32.png';

export default class SettingsWeather extends React.Component {
    render() {

        const { humidity, wind, sunrise } = this.props;

        return (
            <div className="header-submain">

                <div className="header-container">
                    <div className="header-submain__content">

                        <div className="header-submain__block">
                            <img src={arrow} alt="arrow" className="header-submain__block-arrow"/>
                            <div className="header-submain__block-text">
                                <div className="header-submain__block-text_title">
                                    {wind ? wind : 0} mph
                                </div>
                                <div className="header-submain__block-text_descr">
                                    wind
                                </div>
                            </div>
                        </div>
                        <div className="header-submain__block">
                            <img src={arrow} alt="arrow" className="header-submain__block-arrow"/>
                            <div className="header-submain__block-text">
                                <div className="header-submain__block-text_title">
                                    {humidity ? humidity : 0}%
                                </div>
                                <div className="header-submain__block-text_descr">
                                    humidity
                                </div>
                            </div>
                        </div>
                        <div className="header-submain__block">
                            <img src={arrow} alt="arrow" className="header-submain__block-arrow"/>
                            <div className="header-submain__block-text">
                                <div className="header-submain__block-text_title">
                                    {sunrise ? sunrise : '0:00 AM'}
                                </div>
                                <div className="header-submain__block-text_descr">
                                    sunrise
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}