import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { fetchRegistration } from "../../redux/slices/register";
import axios from "axios";
import { selectIsRegister } from "../../redux/slices/register";

import "./Rent.scss"

export const Rent = () => {
    // const RequestStatus = useSelector(state => state.register.data.status);
    const isAuth = useSelector(selectIsRegister);
    const username = useSelector(state => state.userInfo.userInfo.id);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        register,
        formState:{errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
        // defaultValues: {
        //     username: "AAA",
        //     email: "AAA@gmail.com",
        //     password: 123
        // }
    });

    const onSubmit = async (data) => {
        // const info = await dispatch(fetchRegistration(data))

        const response = await axios.post("http://127.0.0.1:8000/api/payment/", {... data, username});
        console.log(response);
        
        console.log("isAuth", isAuth)
        // if (isAuth){
        //     console.log("workding")
        //     let fn = () => {navigate("/login")}
        //     fn()
        // }
 
        
        // reset()
    }

    return (
        <>
            <div className="form">
                <div className="form__container">
                    <div className="form__body">
                        <div className="form__title-block title-block">
                            <div className="title-block__title ">Billing Info</div>
                            <div className="title-block__sub-title">Please enter your billing info</div>
                        </div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                Name
                                <input placeholder="Your name"  {...register("name", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Phone Number
                                <input placeholder="Phone number"  {...register("phone_number", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Adress
                                <input placeholder="Your adress"  {...register("adress", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Town / City
                                <input placeholder="Your town / city"  {...register("city", {
                                    required: true,
                                })}/>
                            </label>
                        </form>
                    </div>
                </div>
            </div>

            <div className="form">
                <div className="form__container">
                    <div className="form__body">
                        <div className="form__title-block title-block">
                            <div className="title-block__title ">Rental Info</div>
                            <div className="title-block__sub-title">Please select your rental date</div>
                        </div>
                        <div className="title-block__title ">Pick - Up</div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                Locations
                                <input placeholder="Select your city"  {...register("pick_up_city", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Date
                                <input placeholder="Select your date"  {...register("pick_up_date", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Time
                                <input placeholder="Select your time"  {...register("pick_up_time", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Car
                                <input placeholder="Your car"  {...register("car", {
                                    required: true,
                                })}/>
                            </label>
                        </form>

                        <div className="title-block__title ">Drop - Off</div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                Locations
                                <input placeholder="Select your city"  {...register("drop_off_city", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Date
                                <input placeholder="Select your date"  {...register("drop_off_date", {
                                    required: true,
                                })} />
                            </label>
                            <label>
                                Time
                                <input placeholder="Select your time"  {...register("drop_off_time", {
                                    required: true,
                                })} />
                            </label>
                        </form>
                    </div>
                </div>
            </div>

            <div className="form">
                <div className="form__container">
                    <div className="form__body">
                        <div className="form__title-block title-block">
                            <div className="title-block__title ">Confirmation</div>
                            <div className="title-block__sub-title">We are getting to the end. Just few clicks and your rental is ready!</div>
                        </div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                <input {...register("agree1", {
                                    value: "I agree with sending an Marketing and newsletter emails. No spam, promissed!"
                                })} />
                            </label>
                            <label>
                                <input {...register("agree2", {
                                    value: "I agree with our terms and conditions and privacy policy."
                                })} />
                            </label>
                            <div className="form__buttons">
                                <Link to="/" className="btn btn_white">Back to main</Link>
                                <button type="submit" className="btn">
                                    Rent Now
                                </button>
                            </div>
                        </form>
                        <div className="confirm-end-block">
                            <img src={"/safe-image.svg"} className="img"></img>
                            <div className="title-block__title ">All your data are safe</div>
                            <div className="title-block__sub-title">We are using the most advanced security to provide you the best experience ever.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}