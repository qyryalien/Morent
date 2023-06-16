import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData, userGetOrders } from "../../redux/slices/personalFullInfo";
import { Pagination } from "../../components";
import { setCurentAuthSession } from "../../redux/slices/auth";
import { setRenderOrderList } from "../../redux/slices/personalFullInfo";

import axios from "../../axiosConfigs/axiosBaseSettings";

import "./Profile.scss"

export const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const info = useSelector(state => state.userInfo.userInfo);
    // let info = useSelector(state => state.userInfo.userInfo);
    let {renderOrderList} = useSelector(state => state.userInfo);
    
    const [infoError, setInfoError] = React.useState(null);
    const [infoIsLoaded, setInfoIsLoaded] = React.useState(false);
    const [info, setInfo] = React.useState();

    async function fetchProfileData() {
        try {
            const response = await axios.get("/api/profile/");
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));
                
            }
            if (response.status === 200) {
                dispatch(setCurentAuthSession(true));
                setInfoIsLoaded(true);
                setInfo(response.data);
                // navigate("/");
            }
        } catch (error) {
            if (error.response.status === 401) {
                dispatch(setCurentAuthSession(false));
                navigate("/login");
            }
            // if (response.status === 200) {
            //     dispatch(setCurentAuthSession(true));
            //     setIsLoaded(true);
            //     setInfo(response.data);
            //     // navigate("/");
            // }
        }
    }  

    const [ordersError, setOrdersError] = React.useState(null);
    const [ordersIsLoaded, setOrdersIsLoaded] = React.useState(false);
    const [orders, setOrders] = React.useState();

    async function userGetOrders() {
        try {
            const response = await axios.get("/api/profile/orders");
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));
            }
            if (response.status === 200) {
                dispatch(setCurentAuthSession(true));
                setOrdersIsLoaded(true);
                setOrders(response.data);
                // navigate("/");
            }
        } catch (error) {
            if (error.response.status === 401) {
                    dispatch(setCurentAuthSession(false));
                    navigate("/login");
                }
            // if (response.status === 200) {
            //     dispatch(setCurentAuthSession(true));
            //     setIsLoaded(true);
            //     setInfo(response.data);
            //     // navigate("/");
            // }
        }
    } 

    React.useEffect(() => {
        fetchProfileData()
        userGetOrders()
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
                                {(renderOrderList ? Object.values(renderOrderList) : Array(5)).map((order, id) => 
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
                    {orders ? 
                        <Pagination reqLen={orders.length} itemList={orders} actionfn={setRenderOrderList}></Pagination>
                    : <div></div>
                    }
                </div>
                
            </div>

        </div>
    )
}