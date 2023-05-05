import React from "react";
import { Link } from "react-router-dom";

import "./Login.scss"

export const Login = () => {
    return (
        <>
            <div className="login">
                <div className="login__container">
                    <div className="login__body">
                        <div className="login__title"></div>
                        <div className="login__sub-title"></div>
                        <form action="">
                            <label >
                                Login
                                <input type="text" placeholder="Your login" />
                            </label>
                            <label>
                                Password
                                <input type="password" placeholder="Your password"/>
                            </label>
                        </form>
                        <div className="login__sign-up sign-up">
                            <div className="sign-up__text">Don`t have an account?</div>
                            <div className="sign-up__link">Sign up</div>
                        </div>
                        <div className="login__buttons">
                            <Link to="/" className="btn btn_white">Back to main</Link>
                            <Link to="/registration" className="btn">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}