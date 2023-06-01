import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axiosConfigs/axiosBaseSettings";
import { fetchProfileData, updateUserProfile } from "../../redux/slices/personalFullInfo";
import { useDispatch, useSelector } from "react-redux"

import "./ProfileEdit.scss"
import {Form} from "../../components/Form/Form";

export const ProfileEdit = () => {
    
    const info = useSelector(state => state.userInfo.userInfo);
    // const info = dispatch(fetchProfileData());
    
    const {
        register,
        formState:{errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            username: "",
            email: "",
            first_name: "",
            last_name: ""
        },
        values: info
    });

    const onSubmit = (data) => {
        // updateUserProfile(data)
        axios.patch("http://127.0.0.1:8000/api/profile/", {...data})
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
            <div className="profile-edit">
                <div className="profile-edit__container">
                    <div className="profile-edit__body">
                        <div className="profile-edit__title-block title-block">
                            <div className="title-block__title ">Profile edit</div>
                            <div className="title-block__sub-title">Please enter your profile info</div>
                        </div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                Login
                                <input   {...register("username")} />
                            </label>
                            <label>
                                Email
                                <input   {...register("email", {
                                    
                                })} />
                            </label>
                            <label>
                                First name
                                <input {...register("first_name")} />
                            </label>
                            <label>
                                Last name
                                <input {...register("last_name")} />
                            </label>
                            <div className="profile-edit__buttons">
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