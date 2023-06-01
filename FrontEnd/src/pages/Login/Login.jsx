import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";

import "./Login.scss"
import { Form } from "../../components/Form/Form";
import { fetchAuth, selectIsAuth, login } from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        formState:{errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            username: "Daunich",
            password: 123
        }
    });

    const onSubmit = async (data) => {
        // login(data);
        const {payload} = await dispatch(fetchAuth(data));
        // const res = await dispatch(fetchAuth(data));

        // const res = fetchAuth(data)
        // console.log("res ", res)s
        // console.log("payload", payload)
        if (!payload){
            return alert("Не удалось войти")
        }  
        // if ('token' in payload.data){
        //     window.localStorage.setItem("token", payload.data.token)
        // }

        reset()
    }

    if (isAuth) {
        return <Navigate to="/" />
    }

    return (
        <>
            <div className="login">
                <div className="login__container">
                    <div className="login__body">
                        <div className="login__title-block title-block">
                            <div className="title-block__title ">Authorisation</div>
                            <div className="title-block__sub-title">Please enter your authorisation info</div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                Login
                                <input placeholder="Your login" {...register("username", {
                                    required: true,
                                    
                                })} />
                            </label>
                            <label>
                                Password
                                <input placeholder="Your password" {...register("password", {
                                    required: true,
                                })} />
                            </label>                                            
                            <div className="login__sign-up sign-up">
                                <div className="sign-up__text">Don`t have an account?</div>
                                <Link to="/registration" className="sign-up__link">Sign up</Link>
                            </div>
                            <div className="login__buttons">
                                <Link to="/" className="btn btn_white">Back to main</Link>
                                <button type="submit" className="btn">
                                    Login
                                    {/* <Link to="/registration" className="btn">Login</Link> */}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}