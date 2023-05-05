import React from "react";
import {Routes, Route, Link} from "react-router-dom"
// import styles from "./Header.module.scss";
import "./Header.scss"

export const Header = () => {
    return(
        <>
            <header className="header">
                <div className="header__container">
                    <div className="logo">
                        <div className="logo__text">
                            <h1>MORENT</h1>
                        </div>
                    </div>
                    <div className="header__menu menu">
                        <div className="menu__items">
                            <div className="menu__item"><Link to="/About" className="menu__item-link">About</Link></div>
                            <div className="menu__item"><Link to="/Community" className="menu__item-link">Community</Link></div>
                            <div className="menu__item"><Link to="/socials" className="menu__item-link">Socials</Link></div>
                        </div>
                    </div>
                    <div className="login btn"><Link to="/login" className="login__link">Login</Link></div>
                </div>
            </header>
        </>
    )
}