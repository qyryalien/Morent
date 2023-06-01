import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCars } from '../redux/slices/carList';
import { fetchProfileData } from '../redux/slices/personalFullInfo';

import "./Home.scss"
// import "../style.scss"

import { AdsCard, Footer, Header, FiltersGroup, CarItem, Pagination } from '../components'; 
import { fetchAuth, userIsAuth } from '../redux/slices/auth';



export const Home = () => {
    
    const {renderList, listOfCars, status} = useSelector(state => state.carssList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCars())
        dispatch(fetchProfileData());
        // userIsAuth()
        // dispatch(fetchAuth(window.localStorage.getItem("token")));
    }, [])

    
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
                        <div className="filters-block">                                
                            <FiltersGroup title="BLOCK1" propertyList={["asd", "qwe", "zxc"]}></FiltersGroup>
                            <FiltersGroup title="BLOCK2" propertyList={["CCC", "BBB", "AAA"]}></FiltersGroup>
                        </div>
                        <div className="main-content__body">
                            <div className="car-list">
                                {status === "Loading" 
                                    ? <h2>Loading...</h2> 
                                    : renderList.map(data => <CarItem key={data.id} id={data.id} carName={data.title} carClass={data.cat_name} imgUrl={data.main_photo} specs={[data.gasoline, data.engine_name, data.capacity_name]} price={`$${data.price}.00`}></CarItem>)
                                }
                            </div>
                            <Pagination reqLen={listOfCars.length}></Pagination>
                        </div>
                    </div>
                </section>            
            </main>
        </>
    )
}