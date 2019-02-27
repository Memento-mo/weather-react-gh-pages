export default class WeatherService {
    constructor() {
        this._apikey = 'adc82df3caf6fec401b4161227c71741';
        this._apibase = 'https://api.openweathermap.org/data/2.5/weather?q=';
        this._iconBase = 'http://openweathermap.org/img/w/';
        this._forecast = 'https://api.openweathermap.org/data/2.5/forecast?q=';
        this._coords = 'https://api.openweathermap.org/data/2.5/weather?'
    }

    async getWeather(url, metric) {
        const res = await fetch(`${this._apibase}${url}&appid=${this._apikey}&units=${metric}`)
        
        if(!res.ok) {
            alert(`Город не найден.`)
            throw new Error(`Произошла ошибка`)
        }

        const data = await res.json();

        return data;
    }

    async getForecastWeather(city, metric) {
        const res = await fetch(`${this._forecast}${city}&appid=${this._apikey}&units=${metric}`)

        const data = await res.json();

        return data;
    }

    async getWeatherCoords(position) {
        const res = await fetch(`${this._coords}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${this._apikey}&units=metric`)

        const data = await res.json();

        return data;
    }

    getIcon(icon) {
        const res = `${this._iconBase}${icon}.png`
        
        return res;
    }

}