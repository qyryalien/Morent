import React from 'react';
import { useDispatch } from 'react-redux';
import { setListOfCars, fetchAllCars } from '../../redux/slices/carList';
import axios from 'axios';

import "./FiltersGroup.scss";

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
        let allKeys = Array.from(document.querySelectorAll(".Filters-Group-title")).map(item => item.innerText);
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

    return (
        <>
            <div className="Filters-Group-title">{title}</div>
            <div className='parametrs-body'>
                {propertyList ? propertyList.map(item => <label key={item.name}><input onClick={filterCarList} className='parametrs' group={title} type='checkbox' value={item.id} />{item.name}</label>) : <div>None</div>}
            </div>
        </>
    )
}
