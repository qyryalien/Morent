import React from 'react';
import "./Socials.scss";
import {Link} from "react-router-dom";

export const Socials = () => {
    return (
        <div className='socials'>
            <div className="socials__container">
                <div className="socials__body">
                    <div className="socials__personal-card personal-card">
                        <div className="personal-card__photo">
                            <img src={"/Dima.jpg"} alt=""/>
                        </div>
                        <div className="personal-card__about-developer-body">                            
                            <div className="personal-card__name">Dmytro Hmelnitskiy</div>
                            <div className="personal-card__description">
                                My contribution to the project included the creation of key featuresand pages.
                                Using HTML and CSS, I made the following pages: a page with all availablecars,
                                category pages, user registration and authorization forms, profile page and
                                userorder viewer, as well as pages with detailed information about cars and
                                order creationforms.
                            </div>
                            <div className="personal-card__media media">
                                <div className="media__items">
                                    <div className="media__item">
                                        <div className="media__name">GitHub:</div>
                                        <div className="media__link"><a href="https://github.com/qyryalien">https://github.com/qyryalien</a></div>
                                    </div>
                                    <div className="media__item">
                                        <div className="media__name">LinkedIn:</div>
                                        <div className="media__link"><a href="https://www.linkedin.com/in/dmitriy-hmelnitskij-107569254/">linkedin/dmitriy-hmelnitskij</a></div>
                                    </div>
                                    <div className="media__item">
                                        <div className="media__name">Telegram:</div>
                                        <div className="media__link"><a href="https://t.me/QyryAlien">https://t.me/QyryAlien</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="socials__personal-card personal-card">
                        <div className="personal-card__photo">
                            <img src={"/userIcon.png"} alt=""/>
                        </div>
                        <div className="personal-card__about-developer-body">                            
                            <div className="personal-card__name">Mykola Bryksin</div>
                            <div className="personal-card__description">
                                The front-end was built on the React library. Styling and customization was
                                 done with regular SCSS. For requests to the server, axios was used, with
                                  additional settings through interceptors. The state of the application was
                                   made using react-redux. Asynchronous requests via AsyncThunk.
                            </div>
                            <div className="personal-card__media media">
                                <div className="media__items">
                                    <div className="media__item">
                                        <div className="media__name">GitHub:</div>
                                        <div className="media__link"><a href="https://github.com/NicholasVB">https://github.com/NicholasVB</a></div>
                                    </div>
                                    <div className="media__item">
                                        <div className="media__name">LinkedIn:</div>
                                        <div className="media__link"><a href=""></a></div>
                                    </div>
                                    <div className="media__item">
                                        <div className="media__name">Telegram:</div>
                                        <div className="media__link"><a href="https://t.me/NikolasKaGe">https://t.me/NikolasKaGe</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}