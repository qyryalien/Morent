import React from 'react';
import { Link } from "react-router-dom"
import { setCurrentCarID } from '../../redux/slices/carList';

import "./CarItem.scss"
import { useDispatch } from 'react-redux';

export const CarItem = ({id, carName, carClass, imgUrl, specs, price}) => {
    const dispatch = useDispatch()
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
                    {specs ? specs.map(characteristic => <p className='text'>{characteristic}</p>) : <p>None</p>}
                </div>
                <div className="item-body__price">
                    <p className='text'><span>{price}/</span>day</p>
                </div>
                <div className="item-body__btns">
                    <div className="about btn"><Link onClick={() => {dispatch(setCurrentCarID(id))}}  to="/car" className="about__link">About</Link></div>
                    <div className="rent-now btn"><Link onClick={() => {dispatch(setCurrentCarID(id))}} to="/rent" className="rent-now__link">Rent Now</Link></div>
                </div>
            </div>
        </>
    )
}