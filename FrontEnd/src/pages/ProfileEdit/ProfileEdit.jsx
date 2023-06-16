import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axiosConfigs/axiosBaseSettings";
import { fetchProfileData, setUserInfo, updateUserProfile } from "../../redux/slices/personalFullInfo";
import { useDispatch, useSelector } from "react-redux"

import "./ProfileEdit.scss"
import { setCurentAuthSession } from "../../redux/slices/auth";

export const ProfileEdit = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let isAuth = useSelector(state => state.auth.curentAuthSession);
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [info, setInfo] = React.useState();
    
    async function fetchProfileData() {
        try {
            const response = await axios.get("/api/profile/");
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));
            }
            setIsLoaded(true);
            setInfo(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                dispatch(setCurentAuthSession(false));
                navigate("/login");
            }
            setIsLoaded(true);
            setError(error);
        }
    }     
    React.useEffect(() => {
        fetchProfileData()
    },[])

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

    const onSubmit = async (data) => {
        // updateUserProfile(data)
        await axios.patch("http://127.0.0.1:8000/api/profile/", {...data})
        .then(function (response) {
            console.log("STILL responce in block onSubmit", response);
            if (response.status === 401) {
                console.log("work setCurentAuthSession(false) in responce.status === 401");
                dispatch(setCurentAuthSession(false));
            }
            if (response.status === 200) {
                dispatch(setUserInfo(response.data));
                navigate("/profile")
                
            }
          })
        .catch(function (error) {
            console.log("STILL error in catch block onSubmit", error);
            if (error.response.status === 401) {
                //
                console.log("err catch if responce.status === 401");
                dispatch(setCurentAuthSession(false));
                navigate("/login")
            }
        });
        
        // reset()
    }

    if (!isAuth) {
        return <Navigate to="/" />
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