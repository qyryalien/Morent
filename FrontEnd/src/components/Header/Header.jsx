import React from "react";
import {Routes, Route, Link, Navigate} from "react-router-dom"
import { selectIsAuth, tryLogin } from "../../redux/slices/auth";
import { userIsAuth } from "../../redux/slices/auth";

import { useDispatch, useSelector } from "react-redux";
import "./Header.scss"



export const Header = () => {
    const dispatch = useDispatch()
    // let isAuth = userIsAuth();
    // let isAuth = window.localStorage.getItem("token");
    let isAuth = useSelector(state => state.auth.curentAuthSession)
    console.log(isAuth)    

    React.useEffect(() => {
        
        dispatch(userIsAuth())
        console.log("HEARED did MOUNT")
        
        return ()=>{
            console.log("HEARED will UN--MOUNT")
        }
    }, [])
    
    return(
        <>
            <header className="header">
                <div className="header__container">
                    {/* <div className="btn" onClick={isAuth = userIsAuth}>Update</div> */}
                    <div className="logo">
                        <div className="logo__text">
                            <Link to="/">MORENT</Link>
                        </div>
                    </div>
                    <div className="header__menu menu">
                        <div className="menu__items">
                            <div className="menu__item"><Link to="/About" className="menu__item-link">About</Link></div>
                            <div className="menu__item"><Link to="/Community" className="menu__item-link">Community</Link></div>
                            <div className="menu__item"><Link to="/socials" className="menu__item-link">Socials</Link></div>
                        </div>
                    </div>
                    <div className="login btn">
                        {isAuth 
                            ? <Link to="/profile" className="login__link">Profile</Link>
                            : <Link to="/login" className="login__link">Login</Link> 
                        }
                                    
                        
                    </div>
                </div>
                
            </header>
            {/* {
                isAuth === false ? <Navigate to="/login" /> : 0
            } */}
        </>
    )
}