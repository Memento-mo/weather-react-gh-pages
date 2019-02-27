import React from 'react';

import Item from '../item/';

import './List-items.css';

export default class ListItems extends React.Component {

    render() {
        const { forecast, ceilTemp, tempChange } = this.props;

        const element = forecast.map(item => {
            const { id, ...itemProps } = item;

            return (
                <li 
                    key={id}
                    className="list-items__item list-items_item">
                
                    <Item 
                        {...itemProps} 
                        ceilTemp={ceilTemp}
                        tempChange={tempChange}/>
                </li>
            )
        })


        return (
            <ul className="list-items">
                {element}
            </ul>
        )
    }
}