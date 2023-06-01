import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData, userGetOrders } from "../../redux/slices/personalFullInfo";
import { Pagination } from "../../components";

import "./Profile.scss"

export const Profile = () => {
    const dispatch = useDispatch()
    // const info = useSelector(state => state.userInfo.userInfo);
    let info = useSelector(state => state.userInfo.userInfo);
    let orders = useSelector(state => state.userInfo.userOrderList);
    
    // React.useEffect(() => {
    //     async function Fn() {
    //         let info2 = await dispatch(fetchProfileData());
            
    //         console.log("123", info2)
    //         // return info2
    //         console.log("456", info)
    //     }
    //     Fn()
    // }, [])


    React.useEffect(() => {
        
        dispatch(userGetOrders());
        // info = useSelector(state => state.userInfo.userInfo);
    }, [])
    return(
        <div className="profile">
            <div className="profile__container">
                <div className="profile__body">
                    <div className="profile__info-block info-block">
                        <div className="info-block__title">Your profile</div>
                        <div className="info-block__list info-list">
                            <div className="info-list__subtitles">
                                {(info ? Object.keys(info) : Array(5)).map(subtitle => <div className="info-list__subtitle">{subtitle}</div>)}
                            </div>
                            <div className="info-list__texts">
                                {(info ? Object.values(info) : Array(5)).map(text => <div className="info-list__text">{text}</div>)}
                            </div>
                        </div>
                    </div>
                    <div className="profile__buttons">
                        <Link to="/" className="btn btn_white">Back to main</Link>
                        <Link to="/profile/edit" className="btn">Change info</Link>
                        <Link  className="btn">Change password</Link>
                    </div>
                    <div className="profile__orders profile-orders-block">
                        <div className="profile-orders-block__title">Your orders</div>
                        <div className="profile-orders-block__list orders-list">
                            <div className="orders-list__subtitles">
                                <div className="orders-list__subtitle">Car name</div>
                                <div className="orders-list__subtitle">Pick-up city</div>
                                <div className="orders-list__subtitle">Drop-off city</div>
                                <div className="orders-list__subtitle">Status</div>
                            </div>
                            <div className="orders-list__items">
                                {(orders ? Object.values(orders) : Array(5)).map((order, id) => 
                                    <div className="orders-list__item" key={id}>
                                        <div className="orders-list__value">{order.car_name}</div>
                                        <div className="orders-list__value">{order.pick_up_city}</div>
                                        <div className="orders-list__value">{order.drop_off_city}</div>
                                        <div className="orders-list__value">{order.status}</div>
                                    </div>                                    
                                )}
                            </div>
                            
                        </div>
                    </div>
                    <Pagination reqLen={orders.length}></Pagination>
                </div>
                
            </div>

        </div>
    )
}