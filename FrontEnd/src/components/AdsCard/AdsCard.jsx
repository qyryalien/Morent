import React from 'react';
import "./AdsCard.scss";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentCarID } from '../../redux/slices/carList';
// import Koenigsegg from "/Koenigsegg.png";

export const AdsCard = ({title, text, imgUrl}) => {
    const dispatch = useDispatch()
    return(
        <>
            <div className="card">
                <div className="card__description-body ">
                    <div className="card-title">The Best Platform for Car Rental</div>
                    <div className="card-text">Ease of doing a car rental safely and reliably. Of course at a low price.</div>
                    
                </div>
                <div className="card__img-body">
                    <Link to="/rent" onClick={() => {dispatch(setCurrentCarID(0))}} className="card-btn btn">Rental Car</Link>
                    <img src={imgUrl} alt=""/>
                </div>
            </div>

        </>
    )
}