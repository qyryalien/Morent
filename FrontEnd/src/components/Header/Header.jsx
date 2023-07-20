import React from "react";
import { Link, useNavigate} from "react-router-dom"
import { setCurentAuthSession } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./Header.scss";

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let isAuth = useSelector(state => state.auth.curentAuthSession);
   

    async function logout() {
        let refresh = window.localStorage.getItem("refresh")
        const response = await axios.post("https://morent-backend-xavm.onrender.com/api/logout/", {refresh});
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
        dispatch(setCurentAuthSession(false));
        navigate("/");
    }
    
    return(
        <>
            <header className="header">
                <div className="header__container">
                    <div className="logo">
                        <div className="logo__text">
                            <Link to="/">MORENT</Link>
                        </div>
                    </div>
                    <div className="header__menu menu">
                        <div className="menu__items">
                            <div className="menu__item"><div to="/About" className="menu__item-link">About</div></div>
                            <div className="menu__item"><div to="/Community" className="menu__item-link">Community</div></div>
                            <div className="menu__item"><div to="/socials" className="menu__item-link">Socials</div></div>
                        </div>
                    </div>
                    <div className="header__btns-block">
                        <div className="login btn">
                            {isAuth 
                                ? <Link to="/profile" className="login__link">Profile</Link>
                                : <Link to="/login" className="login__link">Login</Link> 
                            }
                        </div>
                        {isAuth 
                            ? <button className="login btn btn_white" onClick={logout}>                        
                                <div className="login__link">Exit</div>
                            </button>
                            : <div></div> 
                        }
                    </div>
                </div>
                
            </header>
        </>
    )
}
