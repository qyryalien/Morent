import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarInfo } from "../../redux/slices/carFullInfo";
import { Link } from "react-router-dom";

import "./Car.scss";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

export const Car = () => {
    const dispatch = useDispatch();
    const { currentCarID } = useSelector(state => state.carssList);
    const { fullInfo } = useSelector(state => state.carInfo);

    let [size, setSize] = React.useState({});
    const ref = React.useRef(window);
    const baseSizeList = [767, 1440];
    
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
        dispatch(fetchCarInfo(currentCarID))
        window.addEventListener("resize", resizeHandler);
        resizeHandler();

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, [])
    
    
    let HTMLsizeChoiser = new Map();
    HTMLsizeChoiser.set(1440,
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
                                        <div className="specs-block__item">Gasoline <span>{fullInfo.gasoline}</span></div>
                                        <div className="specs-block__item">Capacity <span>{fullInfo.capacity_name}</span></div>
                                        <div className="specs-block__item">Type Car <span>{fullInfo.cat_name}</span></div>
                                        <div className="specs-block__item">Steering <span>{fullInfo.engine_name}</span></div>
                                    </div>
                                </div>
                                <div className="car-description__buttons-block">
                                    <Link to="/" className="btn btn_white">Back to main</Link>
                                    <Link to="/rent" className="btn ">Rent Now</Link>
                                    <div className="btn btn_white">View review</div>
                                    <div className="btn ">Leave a review</div>
                                </div>
                                
                            </div>
                            <div className="car-body__galery galery">
                                <div className="galery__img-container">
                                    <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.main_photo}`} alt=""/>
                                </div>
                                
                                <div className="galery__img-container">
                                    <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.inside_photo_one}`} alt=""/>
                                </div>
                                <div className="galery__img-container">
                                    <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.inside_photo_two}`} alt=""/>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>     
            </div>
        </>
    )

    HTMLsizeChoiser.set(767,
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
                                        <div className="specs-block__item">Gasoline <span>{fullInfo.gasoline}</span></div>
                                        <div className="specs-block__item">Capacity <span>{fullInfo.capacity_name}</span></div>
                                        <div className="specs-block__item">Type Car <span>{fullInfo.cat_name}</span></div>
                                        <div className="specs-block__item">Steering <span>{fullInfo.engine_name}</span></div>
                                    </div>
                                </div>
                                <div className="car-description__buttons-block">
                                    <Link to="/" className="btn btn_white">Back to main</Link>
                                    <Link to="/rent" className="btn ">Rent Now</Link>
                                    <div className="btn btn_white">View review</div>
                                    <div className="btn ">Leave a review</div>
                                </div>
                                
                            </div>
                            <div className="car-body__galery galery">
                            <Swiper
                                modules={[Navigation, A11y]}
                                spaceBetween={10}
                                loop={true}
                                slidesPerView={"auto"}
                                navigation
                                >
                                <SwiperSlide>
                                    <div className="galery__img-container">
                                        <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.main_photo}`} alt=""/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="galery__img-container">
                                        <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.inside_photo_one}`} alt=""/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="galery__img-container">
                                        <img src={`https://morent-backend-xavm.onrender.com/static${fullInfo.inside_photo_two}`} alt=""/>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            </div>
                        </div>  
                    </div>
                </div>     
            </div>
        </>
    )

    return (
        HTMLsizeChoiser.get(size.innerWidth)
    )
}