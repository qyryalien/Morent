import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { fetchRegistration } from "../../redux/slices/register";
import axios from "axios";
import { selectIsRegister } from "../../redux/slices/register";

import "./Registration.scss"
import {Form} from "../../components/Form/Form";

export const Registration = () => {
    // const RequestStatus = useSelector(state => state.register.data.status);
    const isAuth = useSelector(selectIsRegister);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        register,
        formState:{errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    defaultValues: {
        username: "AAA",
        email: "AAA@gmail.com",
        password: 123
    }});

    const onSubmit = async (data) => {
        const info = await dispatch(fetchRegistration(data))
        console.log(info);
        if (!info) {
            return "Не удалось зарегистрироваться"
        }
        

        console.log("isAuth", isAuth)
        if (isAuth){
            console.log("workding")
            let fn = () => {navigate("/login")}
            fn()
        }
 
        
        reset()
    }

    return (
        <>
            <div className="registration">
                <div className="registration__container">
                    <div className="registration__body">
                        <div className="registration__title-block title-block">
                            <div className="title-block__title ">Registration</div>
                            <div className="title-block__sub-title">Please enter your registration info</div>
                        </div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                Login
                                <input placeholder="Your login"  {...register("username", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Email
                                <input placeholder="Your email"  {...register("email", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Password
                                <input placeholder="Your password"  {...register("password", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Confirm password
                                <input placeholder="Confirm your password"  />
                            </label>
                            <div className="registration__buttons">
                                <Link to="/" className="btn btn_white">Back to main</Link>
                                <button type="submit" className="btn">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}