import React from "react";
import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";

import "./ProfileEdit.scss"
import {Form} from "../../components/Form/Form";

export const ProfileEdit = () => {
    const {
        register,
        formState:{errors},
        handleSubmit,
        reset
    } = useForm({mode: "onBlur"});

    const onSubmit = (data) => {
        const JSONData = JSON.stringify(data);
        console.log("type ", typeof data)
        console.log("type2 ", typeof JSONData)
        axios.post("http://127.0.0.1:8000/api/register/", {...data})
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
        });
        
        reset()
    }

    return (
        <>
            <div className="profile">
                <div className="profile__container">
                    <div className="profile__body">
                        <div className="profile__title-block title-block">
                            <div className="title-block__title ">Profile edit</div>
                            <div className="title-block__sub-title">Please enter your profile info</div>
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
                            <div className="profile__buttons">
                                <Link to="/" className="btn btn_white">Back to main</Link>
                                <button type="submit" className="btn">
                                    Confirm
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