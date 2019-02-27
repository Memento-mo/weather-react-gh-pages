import React from 'react';

import './toggle-button.css';

export default class ToggleButton extends React.Component {

    state = {
        checked: false
    }

    handleChange = (e) => {
        let checked = e.target.checked;
        
        return this.setState({
            checked
        })
    }

    render() {

        const { checked } = this.state;
        const { changeTemp, translationOfTemperature } = this.props;

        let buttonC = 'button-c';
        let buttonF = 'button-f';

        if(checked) {
            buttonF += ' color-text'
        } 

        if(!checked) {
            buttonC += ' color-text'
        }
        
        return (
            <div className="toggle-button-cover">
                <div className="button-cover" onClick={changeTemp}>
                    <div className={buttonC}>°C</div>
                    <div className="button r" id="button-1">
                        <input type="checkbox" className="checkbox" onChange={this.handleChange} onClick={translationOfTemperature}/>
                        <div className="knobs"></div>
                        <div className="layer"></div>
                    </div>
                    <div className={buttonF}>°F</div>
                </div>
            </div>
        )
    }
}
