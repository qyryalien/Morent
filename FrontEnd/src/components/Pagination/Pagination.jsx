import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRenderList } from "../../redux/slices/carList";
import "./Pagination.scss"

export const Pagination = ({reqLen}) => {
    const dispatch = useDispatch();
    
    const ChankSize = 5;
    const max = Math.ceil(reqLen/ChankSize);
    let [currentPage, setCurrentPage] = React.useState(1);
    let endPoiner = currentPage * ChankSize;
    let startPoiner = endPoiner - ChankSize;
    
    const {listOfCars} = useSelector(state => state.carssList);
    let renderPages = listOfCars.slice(startPoiner, endPoiner);


    React.useEffect(() => {
        dispatch(setRenderList(renderPages));
    }, [currentPage, listOfCars])

    const paginate = (currentPage) => {
        if (currentPage < 1 || currentPage > max) return;
        setCurrentPage(currentPage)
    }

    return (
        <div className='pagination'>
            <div className="pagination__body">
                <div className="pagination__btn_left btn" onClick={() => paginate(currentPage - 1)}></div>
                <div className="pagination__text-body">
                    {/* <p>1 of {Math.ceil(reqLen.len/ChankSize)}</p> */}
                    <p>{currentPage} of {max}</p>
                </div>
                    
                <div className="pagination__btn_right btn" onClick={() => paginate(currentPage + 1)}></div>
            </div>
        </div>
    )
}