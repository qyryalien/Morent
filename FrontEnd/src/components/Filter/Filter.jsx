import React from "react";
import axios from 'axios';
import { FiltersGroup } from "../FiltersGroup/FiltersGroup";

import "./Filter.scss"

function toggleFiltersBodyState(e){
    let elemet = document.querySelector(".filters-body");
    elemet.classList.toggle("open");
    // console.log(e.currentTarget)
    e.currentTarget.classList.toggle("clicked");
}

export const Filter = () => {
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
        fetchFiltersList()
    }, [])

    return(
        <div className='filter-component'>
            <div className='filter-component__wrapper'>
                <div className="filter-component__body">
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
                <div className='filter-component__plus-icon' onClick={toggleFiltersBodyState}>
                    <img src={"/plus.svg"} alt=""/>
                </div>
            </div>
        </div>
    )
}