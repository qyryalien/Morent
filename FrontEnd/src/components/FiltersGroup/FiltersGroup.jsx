import React from 'react';
import "./FiltersGroup.scss"
// import axios from '../../axiosConfigs/axiosBaseSettings';
import axios from 'axios';
import { setListOfCars, setRenderList } from '../../redux/slices/carList';
import { useDispatch } from 'react-redux';
import { fetchAllCars } from '../../redux/slices/carList';

export const FiltersGroup = ({title, propertyList}) => {

    const dispatch = useDispatch()

    async function filterCarList() {
        let inputsObj = Array.from(document.querySelectorAll("input"))
            .filter(item => item.checked === true )
            .reduce((rezOb, item) => {
                if (!rezOb.hasOwnProperty(item.attributes.group.nodeValue)){
                    rezOb[item.attributes.group.nodeValue] = item.defaultValue
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
            let response = await axios.get(`http://127.0.0.1:8000/api/filter/${params}`)
            // dispatch(setRenderList(response.data))
            dispatch(setListOfCars(response.data))
        } else {
            // let response = await axios.get(`http://127.0.0.1:8000/api/filter/`)
            dispatch(fetchAllCars())
        }
    }

    return (
        <>
            <div className="Filters-Group-title">{title}</div>
            <div className='parametrs-body'>
                {propertyList ? propertyList.map(item => <label key={item.name}><input onClick={filterCarList} className='parametrs' group={title} type='checkbox' value={item.id} />{item.name}</label>) : <div>NONE textwqeqw</div>}
            </div>
        </>
    )
}