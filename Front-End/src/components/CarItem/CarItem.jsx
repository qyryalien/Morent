import React from 'react';
import "./CarItem.scss"

export const CarItem = ({carName, carClass, imgUrl, specs, price}) => {
    return (
        <>
            <div className='item-body'>
                <div className='item-body__title'>
                    <div className="item-body__carName">{carName}</div>
                    <div className="item-body__carClass">{carClass}</div>
                </div>
                <div className="item-body__img">
                    <img src={imgUrl} alt=""/>
                </div>
                <div className="item-body__specs">
                    {specs ? specs.map(characteristic => <p className='text' key={characteristic}>{characteristic}</p>) : <p>None</p>}
                </div>
                <div className="item-body__price">
                    <p className='text'><span>{price}/</span>day</p>
                </div>
                <div className="item-body__btns">
                    <div className="about btn"><a className="about__link">About</a></div>
                    <div className="rent-now btn"><a className="rent-now__link">Rent Now</a></div>
                </div>
            </div>
        </>
    )
}