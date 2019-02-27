import React from 'react';

import Header from '../header/';
import ListItems from '../list-items/';
import WeatherService from '../../services/weather-services';
import ToggleButton from '../toggle-button/';

import './App.css';

let service = new WeatherService();
export default class App extends React.Component {

    state = {
         weatherProperties: {
            temp: undefined,
            humidity: undefined,
            wind: undefined,
            icon: undefined,
            sunrise: undefined,
            city: ''
        },
        forecast: [],
        temp: true
    }

    changeTemp = () => {
        this.setState({
            temp: !this.state.temp
        })
        
    }

    gettingWeather = async (e) => {
        e.preventDefault();

        const city = e.target.elements.city.value;

        let data;
        this.state.temp === false ? data = await service.getWeather(city, 'imperial') : data = await service.getWeather(city, 'metric');

        const ic = await this.gettingIcon(data.weather[0].icon);
        const sunrise = await this.gettingSunrise(data.sys.sunrise);
        const forecast = await this.gettingForecastWeather(city);
        
        return this.setState({
            weatherProperties: {
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                icon: ic,
                sunrise,
                value: '',
                city
            },
            forecast,
        })
    }

    gettingIcon = async (icon) => {
        const ic = service.getIcon(icon);

        return ic;
    }

    gettingSunrise(sunrise) {
        const date = new Date(sunrise * 1000);

        const time = {
            hours: date.getHours(),
            minutes: date.getMinutes()
        }

        time.minutes = time.minutes < 10 ? '0' + time.minutes : time.minutes

        const ampm = time.hours > 12 ? 'PM' : 'AM';

        return `${time.hours}:${time.minutes} ${ampm}`
    }

    async gettingForecastWeather(city) {
        let forecast;
        this.state.temp === false ? forecast = await service.getForecastWeather(city, 'imperial') : forecast = await service.getForecastWeather(city, 'metric');
        
        const forecastArray = [];
        const days = [];
        for(let item in forecast.list) {
            let index = forecast.list[item].dt_txt.indexOf(' ');
            let dt = forecast.list[item].dt_txt.slice(index + 1, 13);

            if(dt === '15') {
                forecastArray.push(forecast.list[item]);
            }
            
        }

        forecastArray.map(item => 
            this.gettingIcon(item.weather[0].icon).then(body => {
                days.push({
                    id: item['dt'],
                    icon: body,
                    tempMax: item.main['temp_max'],
                    weather: item.weather[0].description,
                    day: item['dt_txt']
                })
            })
        )
        
        return days;
    }

    ceilTemp(temp) {
        return Math.floor(temp);
    }

    async geolocationWeather(coords) {
        const data = await service.getWeatherCoords(coords);

        const ic = await this.gettingIcon(data.weather[0].icon);
        const sunrise = await this.gettingSunrise(data.sys.sunrise);

        const forecast = await this.gettingForecastWeather(data.name);

        return this.setState({
            weatherProperties: {
                temp: data.main.temp,
                humidity: data.main.humidity,
                wind: data.wind.speed,
                icon: ic,
                sunrise,
                city: data.name
            },
            forecast
        })
    }

    translationOfTemperature = (currentTemp, weather, forecast) => {
        const { humidity, wind, icon, sunrise, value, city} = weather

        forecast.map(item => 
            item.tempMax = currentTemp ? item.tempMax * (9/5) + 32 : (item.tempMax - 32) * (5/9)
        )

        this.setState({
            weatherProperties: {
                temp: currentTemp ? this.state.weatherProperties.temp * (9/5) + 32 : (this.state.weatherProperties.temp - 32) * (5/9),
                humidity,
                wind,
                icon,
                sunrise,
                value,
                city
            }
        })

}


    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.geolocationWeather(position)
        })

    }
    render() {

        const { weatherProperties, temp, forecast } = this.state

        return (
            <main className="weather-app">
                <div className="weather-app__block">
                    <div className="weather-app__block-header">
                        <div className="container">

                            <div className="weather-block header_text">
                            
                                <div className="weather-block__header">
                                    <Header 
                                        gettingWeather={this.gettingWeather}
                                        weatherProperties={weatherProperties}
                                        ceilTemp={this.ceilTemp}
                                        tempChange={temp}/>
                                </div>
                            

                            </div>

                        </div>
                    </div>
                    

                    <div className="weather-block__days days_text">
                        <div className="container-days">
                       
                            <ListItems 
                                forecast={forecast}
                                ceilTemp={this.ceilTemp}
                                tempChange={temp}/>
                        </div>
                    </div>
                </div>
                
                <div className="weather-toggle">
                    <ToggleButton 
                        changeTemp={this.changeTemp}
                        translationOfTemperature={() => this.translationOfTemperature(temp, weatherProperties, forecast)}
                        />
                </div>
                
            </main>
        )
    }
}