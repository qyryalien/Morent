import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRenderList } from "../../redux/slices/carList";
import "./Pagination.scss"

export const Pagination = ({reqLen, itemList, actionfn}) => {
    const dispatch = useDispatch();
    
    const ChankSize = 5;
    const max = Math.ceil(reqLen/ChankSize);
    let [currentPage, setCurrentPage] = React.useState(1);
    // let [localState, forseUpdate] = React.useState(true);
    let endPoiner = currentPage * ChankSize;
    let startPoiner = endPoiner - ChankSize;
    
    let renderPages = itemList.slice(startPoiner, endPoiner);


    React.useEffect(() => {
        dispatch(actionfn(renderPages));
    }, [currentPage])

    React.useEffect(() => {
        paginate(1)
        dispatch(actionfn(renderPages));
    }, [itemList])

    const paginate = (currentPage) => {
        if (currentPage > max) {
            setCurrentPage(max)
        }
        if (currentPage < 1 || currentPage > max) return;
        setCurrentPage(currentPage)
    }

    return (
        <div className='pagination'>
            <div className="pagination__body">
                <div className="pagination__btn_left btn" onClick={() => paginate(currentPage - 1, max, setCurrentPage)}>
                    <img src="/ArrowLeft.png" alt=""/>
                </div>
                <div className="pagination__text-body">
                    {/* <p>1 of {Math.ceil(reqLen.len/ChankSize)}</p> */}
                    <p>{currentPage} of {max}</p>
                </div>
                    
                <div className="pagination__btn_right btn" onClick={() => paginate(currentPage + 1, max, setCurrentPage)}>
                    <img src="/ArrowRight.png" alt=""/>
                </div>
            </div>
        </div>
    )
}