import React from 'react';
import "./FiltersGroup.scss"

export const FiltersGroup = ({title, propertyList}) => {
    // console.log(typeof propertyList)
    return (
        <>
            <div className="Filters-Group-title">{title}</div>
            <div className='parametrs-body'>
                {propertyList ? propertyList.map(item => <label key={item}><input className='parametrs' type='checkbox' value={item} />{item}</label>) : <div>NONE textwqeqw</div>}
            </div>
        </>
    )
}