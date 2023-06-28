import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarInfo } from "../../redux/slices/carFullInfo";
import { Link } from "react-router-dom";
import "./Car.scss"


export const Car = () => {
    const dispatch = useDispatch();
    const { currentCarID } = useSelector(state => state.carssList);
    
    
    React.useEffect(() => {
        dispatch(fetchCarInfo(currentCarID))
    }, [])
    
    const { fullInfo } = useSelector(state => state.carInfo);
    

    return (
        <>
            <div className="car">
                <div className="car__container">
                    <div className="car-promo-card">
                        <div className="car-promo-card__body car-body">
                            <div className="car-body__description car-description">
                                <div className="car-description__top-block top-block">    
                                    <div className="top-block__title">{fullInfo.title}</div>
                                    <div className="top-block__rating">star 4/5</div>
                                    <div className="top-block__reviev">440+ Reviewer</div>
                                </div>
                                <div className="car-description__text-block text-block">
                                    <div className="text-block__main-text">NISMO has become the embodiment of Nissan's outstanding performance, inspired by the most unforgiving proving ground, the "race track".</div>
                                    <div className="text-block__specs-block specs-block">
                                        <div className="specs-block__gasoline">Gasoline <span>{fullInfo.gasoline}</span></div>
                                        <div className="specs-block__capacity">Capacity <span>{fullInfo.capacity_name}</span></div>
                                        <div className="specs-block__typecar">Type Car <span>{fullInfo.cat_name}</span></div>
                                        <div className="specs-block__steering">Steering <span>{fullInfo.engine_name}</span></div>
                                    </div>
                                </div>
                                <div className="car-description__buttons-block">
                                    <Link to="/" className="btn btn_white">Back to main</Link>
                                    <Link to="/rent" className="btn ">Rent Now</Link>
                                    <div className="btn btn_white">View review</div>
                                    <div className="btn ">Leave a review</div>
                                </div>
                                
                            </div>
                            <div className="car-body__galery">
                                <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.main_photo}`} alt=""/>
                                <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.inside_photo_one}`} alt=""/>
                                <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.inside_photo_two}`} alt=""/>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </>
    )
}