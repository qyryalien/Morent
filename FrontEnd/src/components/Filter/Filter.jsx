import React from "react";
import axios from 'axios';
import { FiltersGroup } from "../FiltersGroup/FiltersGroup";

import "./Filter.scss"



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

    let [size, setSize] = React.useState({});
    const ref = React.useRef(window);
    const baseSizeList = [1280, 1440];
    
    const resizeHandler = () => {
        let { innerHeight, innerWidth } = ref.current || {};
        for (let baseSize of baseSizeList) {
            if (baseSize >= innerWidth) {
                innerWidth = baseSize
                break;
            }
        }
        if (innerWidth > baseSizeList[baseSizeList.length - 1]) {
            innerWidth = baseSizeList[baseSizeList.length - 1];
        }
        setSize({ innerHeight, innerWidth });
    };


    React.useEffect(() => {
        fetchFiltersList()

        window.addEventListener("resize", resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [])

    let HTMLsizeChoiser = new Map();
    HTMLsizeChoiser.set(1440,         
        <>
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
                </div>
            </div>
        </>
    )

    function toggleFiltersBodyState(e){
        let elemet = document.querySelector(".filter-component");
        elemet.classList.toggle("open");
        // console.log(e.currentTarget)
        e.currentTarget.classList.toggle("clicked");
    }

    HTMLsizeChoiser.set(1280,         
        <>
        
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
                </div>
            </div>
            <div className='filter-component-wp'>
                <div className='filter-component__plus-icon' onClick={toggleFiltersBodyState}>
                    <img src={"/plus.svg"} alt=""/>
                </div>
            </div>
        </>
    )


    return(
        HTMLsizeChoiser.get(size.innerWidth)
    )
}