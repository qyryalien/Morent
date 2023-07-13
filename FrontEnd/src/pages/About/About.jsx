import React from 'react';
import "./About.scss"
import {Link} from "react-router-dom";

import { AdsCard, FiltersGroup, CarItem, Pagination } from '../../components'; 

export const About = () => {
    return (
        <main class="main-container">
                <header class="main-header">HEADER</header>
                <div class="main-content">MAIN CONTENT</div>
                <footer class="main-footer">FOOTER</footer>
        </main>
        // <section className='main-content'>
        //     <div className="main-content__container">
        //         <div className="wr">
        //             <div className='filters-component-body'>
        //                 <div className='filters-body-wrapper'>
        //                     <div className="filters-body">
        //                         <p>Горизонтальній список</p>
        //                     </div>
        //                 </div>
        //                 <div className='filters-plus-icon'>
        //                     <img src={"/plus.svg"} alt=""/>
        //                 </div>
        //             </div>
        //             <div className="main-content__body">
        //                 <p>ОЧЕНЬ БОЛЬШОЙ элемент с машинками</p>
        //                 <p>БЛОК пагинации</p>
        //             </div>

        //         </div>
        //     </div>
        // </section>
    )
}