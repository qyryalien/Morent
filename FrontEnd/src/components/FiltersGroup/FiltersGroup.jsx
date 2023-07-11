import React from 'react';
import { useDispatch } from 'react-redux';
import { setListOfCars, fetchAllCars } from '../../redux/slices/carList';
import axios from 'axios';

import "./FiltersGroup.scss";
// import {ReactComponent as ReactLogo} from '../../../public/iconsfont/arrow-bottom';
// import {ReactComponent as ReactLogo} from 'ArrowLeft';

export const FiltersGroup = ({title, propertyList}) => {

    const dispatch = useDispatch()

    let valueTranslator = {
        "Category": "cat",
        "Engine": "engine",
        "Capacity": "capacity"
    }

    async function filterCarList() {
        let inputsObj = Array.from(document.querySelectorAll("input"))
            .filter(item => item.checked === true )
            .reduce((rezOb, item) => {
                if (!rezOb.hasOwnProperty(item.attributes.group.nodeValue)){
                    rezOb[valueTranslator[item.attributes.group.nodeValue]] = item.defaultValue
                } 
                return rezOb
            }, {})
        let allKeys = Array.from(document.querySelectorAll(".filters-block__title")).map(item => item.innerText);
        allKeys.forEach(key => {
            let arr = Array.from(document.querySelectorAll("input")).filter(item => item.attributes.group.nodeValue === key)
            if (arr.some(item => item.checked === true)){
                arr.filter(item => item.checked === false).forEach(item => item.disabled = true)  
            } else {
                arr.forEach(item => item.disabled = false)
            }
        })

        let paramsString = Object.entries(inputsObj).map(item => `${item[0]}=${item[1]}`).join("&")
        
        if (paramsString.length > 0){
            let params = `?${paramsString}`
            let response = await axios.get(`https://morent-backend-xavm.onrender.com/api/filter/${params}`)
            dispatch(setListOfCars(response.data))
        } else {
            dispatch(fetchAllCars())
        }
    }




    const [size, setSize] = React.useState({});
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

    // const swiperElRef = React.useRef(null);
    React.useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        resizeHandler();

        // swiperElRef.current.addEventListener('progress', (e) => {
        //     const [swiper, progress] = e.detail;
        //     console.log(progress);
        // });
        
        //     swiperElRef.current.addEventListener('slidechange', (e) => {
        //     console.log('slide changed');
        // });


        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);
  
  

    let HTMLsizeChoiser = new Map();
    HTMLsizeChoiser.set(1440,         
        <>
            <div className='filters-block'>
                <div className="filters-block__title">{title}</div>
                <div className='filters-block__parametrs-body'>
                    {propertyList 
                        ? propertyList.map(
                            item => 
                                <label key={item.name}>
                                    <input onClick={filterCarList} className='parametrs' group={title} type='checkbox' value={item.id} />{item.name}
                                </label>
                            ) 
                        : <div>None</div>
                    }
                            
                </div>
            </div>
        </>
    )

    function toggleSpoilerState(e){
        // console.log(e.currentTarget)
        e.currentTarget.classList.add("current");
        let elemet = document.querySelector(".current+.filters-block__parametrs-body .spoiler-body");
        elemet.classList.toggle("open");
        e.currentTarget.classList.remove("current");
    }
    HTMLsizeChoiser.set(1280,         
        <>
            <div className='filters-block'>
                <div className="spoiler-control-block" onClick={toggleSpoilerState}>
                    <div className="filters-block__title " >{title}</div>
                    <div className="spoiler-control-block__icon"  >
                        {/* <ReactLogo/> */}
                        <img src={"./iconsfont/arrow-bottom.svg"} alt=""/>
                    </div>
                </div>
                <div className='filters-block__parametrs-body'>
                    <div className="spoiler-body">
                        {propertyList 
                            ? propertyList.map(
                                item => 
                                    <label key={item.name}>
                                        <input onClick={filterCarList} className='parametrs' group={title} type='checkbox' value={item.id} />{item.name}
                                    </label>
                                ) 
                            : <div>None</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )

    return (
        HTMLsizeChoiser.get(size.innerWidth)
    )
}
