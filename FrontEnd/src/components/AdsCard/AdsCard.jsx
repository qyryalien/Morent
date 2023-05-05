import React from 'react';
import "./AdsCard.scss";
// import Koenigsegg from "/Koenigsegg.png";

export const AdsCard = ({title, text, imgUrl}) => {
    return(
        <>
            <div className="card">
                <div className="card__description-body ">
                    <div className="card-title">The Best Platform for Car Rental</div>
                    <div className="card-text">Ease of doing a car rental safely and reliably. Of course at a low price.</div>
                    
                </div>
                <div className="card__img-body">
                    <div className="card-btn btn">Rental Car</div>
                    <img src={imgUrl} alt=""/>
                </div>
            </div>

        </>
    )
}