import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { setCurentAuthSession } from "../../redux/slices/auth";
import axios from "../../axiosConfigs/axiosBaseSettings";


import "./Rent.scss"

export const Rent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [infoError, setInfoError] = React.useState(null);
    const [infoIsLoaded, setInfoIsLoaded] = React.useState(false);
    const [info, setInfo] = React.useState();

    async function fetchProfileData() {
        try {
            const response = await axios.get("/api/profile/");
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));
            }
            if (response.status === 200) {
                dispatch(setCurentAuthSession(true));
                setInfoIsLoaded(true);
                setInfo(response.data);
            }
        } catch (error) {
            if (error.response.status === 401) {
                dispatch(setCurentAuthSession(false));
                navigate("/login");
            }
        }
    }  

    const [citys, setCitys] = React.useState();
    async function fetchCitysList() {
        try {
            const response = await axios.get("/api/city");
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));
            }
            if (response.status === 200) {
                setCitys(response.data);
            }
        } catch (error) {
            if (error.response.status === 401) {
                dispatch(setCurentAuthSession(false));
                navigate("/login");
            }
        }
    }  

    let { listOfCars } = useSelector(state => state.carssList);
    let { currentCarID } = useSelector(state => state.carssList);
    let curentCar;
    if (currentCarID !== 0){
        curentCar = listOfCars.filter(car => car.id === currentCarID)[0];
    }

    React.useEffect(() => {
        fetchCitysList()
        fetchProfileData()
    }, [])

    const {
        register,
        formState:{errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        
        let username = info.id;
        try {
            let response;
            if (currentCarID !== 0) {
                let car = curentCar.id;
                response = await axios.post("https://morent-backend-xavm.onrender.com/api/payment/", {... data, username, car});
            } else {
                response = await axios.post("https://morent-backend-xavm.onrender.com/api/payment/", {... data, username});
            } 
            
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));
                navigate("/login");
            }
            if (response.status === 200) {
                dispatch(setCurentAuthSession(true));
                navigate("/");
            }
        } catch (error) {
            if (error.response.status === 401) {
                dispatch(setCurentAuthSession(false));
                navigate("/login");
            }
        }
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
                                <select 
                                    name="Age"
                                    {...register("pick_up_city", {
                                        required: true,
                                    })}
                                >
                                    <option>{"Select your city"}</option>
                                    {(citys ? citys : Array(3)).map(item => {
                                        return <option value={item.name}>{item.name}</option>
                                    })}
                                </select>
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
                                {currentCarID !== 0 
                                    ?   <input placeholder="Your car" readonly value={curentCar.title} {...register("car", {
                                            required: true,
                                        })}/>
                                    :   <select 
                                            {...register("car", {
                                                required: true,
                                            })}
                                        >
                                            <option>{"Your car"}</option>
                                            {(listOfCars ? listOfCars : Array(3)).map(car => {
                                                return <option value={car.id}>{car.title}</option>
                                            })}
                                        </select>  
                                }
                                
                            </label>
                        </form>

                        <div className="title-block__title ">Drop - Off</div>
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                Locations
                                <select 
                                    name="Age"
                                    {...register("drop_off_city", {
                                        required: true,
                                    })}
                                >
                                    <option>{"Select your city"}</option>
                                    {(citys ? citys : Array(3)).map(item => {
                                        return <option value={item.name}>{item.name}</option>
                                    })}
                                </select>
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
                            <label className="checkbox-body">{"I agree with sending an Marketing and newsletter emails. No spam, promissed!"}
                                <input type='checkbox' {...register("agree1", {
                                    value: "I agree with sending an Marketing and newsletter emails. No spam, promissed!",
                                    required: true,
                                })} />
                            </label>
                            <label className="checkbox-body">{"I agree with our terms and conditions and privacy policy."}
                                <input type='checkbox' {...register("agree2", {
                                    value: "I agree with our terms and conditions and privacy policy.",
                                    required: true,
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
