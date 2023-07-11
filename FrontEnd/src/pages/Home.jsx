import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCars } from '../redux/slices/carList';
import { setCurentAuthSession } from '../redux/slices/auth';
import { setRenderList } from '../redux/slices/carList';
import { AdsCard, FiltersGroup, CarItem, Pagination } from '../components'; 
import axios from 'axios';
// import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/scss";

import "./Home.scss";
// register();




export const Home = () => {
    const navigate = useNavigate();

    async function userIsAuth () {
        try {
            const response = await axios.get("https://morent-backend-xavm.onrender.com/api/profile/", {
				headers: { authorization: `Bearer ${window.localStorage.getItem("access")}` },
			});
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));   
            }
            if (response.status === 200) {
                dispatch(setCurentAuthSession(true));
            }
        } catch (error) {
            if (error.response.status === 401) {
                if (error.response.data.detail === "Authentication credentials were not provided.") {
                    console.log("Authentication credentials were not provided.");
                    dispatch(setCurentAuthSession(false));
                    return 0 
                }

                if(error.response.data.messages[0].message === "Token is invalid or expired") {
                    try {
                        let refresh = window.localStorage.getItem("refresh");
                        let responce = await axios.post("https://morent-backend-xavm.onrender.com/api/login/refresh", {refresh})
                        if (responce.status === 200) {
                            window.localStorage.setItem("access", responce.data.access);
                            
                            dispatch(setCurentAuthSession(true));
                            return 0;
                        }
    
                    } catch (error) {
                        
                        if (error.response.status === 401 && error.response.data.code === "token_not_valid") {
                            window.localStorage.removeItem("access")
                            window.localStorage.removeItem("refresh")
                            navigate("/login")
                            return 0;
                        }
                    }
                }
                dispatch(setCurentAuthSession(false));   
            }
        }
    };
    
    const {renderList, listOfCars, status} = useSelector(state => state.carssList);
    const dispatch = useDispatch();
    
    const [filtersError, setFiltersError] = React.useState(null);
    const [filtersIsLoaded, setfiltersIsLoaded] = React.useState(false);
    const [filtersList, setFiltersList] = React.useState();

    async function fetchFiltersList () {
        try {
            let response = await axios.get("https://morent-backend-xavm.onrender.com/api/all_category/")
            setFiltersList(Object.entries(response.data))
        } catch (error) {
            setFiltersError(error)
        }
    }

    React.useEffect(() => {
        userIsAuth()
        dispatch(fetchAllCars())
        fetchFiltersList()
    }, [])

    function toggleFiltersBodyState(e){
        // console.log(e.currentTarget)
        // e.currentTarget.classList.add("current");
        let elemet = document.querySelector(".filters-body");
        elemet.classList.toggle("open");
        // e.currentTarget.classList.remove("current");
    }

    return(
        <>
            <main className="page">
                <section className='adt'>
                    <div className="adt__container">
                        <div className="ads__body">
                            <AdsCard imgUrl="/Koenigsegg.png"></AdsCard>
                            <AdsCard imgUrl="/NissanR35.png"></AdsCard>
                        </div>
                    </div>
                </section>
                <section className='main-content'>
                    <div className="main-content__container">
                        <div className='filters-component-body'>
                            <div className="filters-body">
                                {/* <Swiper  slides-per-view="2"> */}
                                    {(filtersList ? filtersList : Array(3)).map(settingsFilterGroup => {
                                        return(
                                            // <SwiperSlide>
                                                <FiltersGroup key={settingsFilterGroup[0]} title={settingsFilterGroup[0]} propertyList={settingsFilterGroup[1]}></FiltersGroup>
                                            // </SwiperSlide>
                                        )
                                        })}
                                {/* </Swiper> */}
                            </div>
                            <div className='filters-plus-icon' onClick={toggleFiltersBodyState}>
                                <img src={"/plus.svg"} alt=""/>
                            </div>
                        </div>
                        <div className="main-content__body">
                            <div className="car-list">
                                {status === "Loading" 
                                    ? <div className='item-body empty-car-list'>Loading...</div> 
                                    : renderList.length === 0 
                                        ? <div className='item-body empty-car-list'>Product list is empty</div> 
                                        : renderList.map(data => <CarItem key={data.title} id={data.id} carName={data.title} carClass={data.cat_name} imgUrl={data.main_photo} specs={[data.gasoline, data.engine_name, data.capacity_name]} price={`$${data.price}.00`}></CarItem>)
                                }
                            </div>
                            <Pagination reqLen={listOfCars.length} itemList={listOfCars} actionfn={setRenderList}></Pagination>
                        </div>
                    </div>
                </section>            
            </main>
        </>
    )
}
