import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axiosConfigs/axiosAuthSettings";

import "./Registration.scss"

export const Registration = () => {
    const navigate = useNavigate();
    
    const {
        register,
        formState:{errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/register/", data);
            if (response.status === 200) {
                navigate("/login")
            }
            
        } catch (error) {
            // нужно проверять что пришло в ответе? Например, что уже есть аткой пользователь или просто показывать alert 
            alert("Не удалось зарегистрироваться")
        }
        // reset()
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
                                <input placeholder="Confirm your password"  
                                {...register("confirm", {
                                    required: true,
                                })}
                                />
                            </label>
                            <div className="registration__buttons">
                                <Link to="/" className="btn btn_white link">Back to main</Link>
                                <button type="submit" className="btn link">
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