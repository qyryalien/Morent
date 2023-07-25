import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setUserInfo } from "../../redux/slices/personalFullInfo";
import { useDispatch, useSelector } from "react-redux"
import { setCurentAuthSession } from "../../redux/slices/auth";
import axios from "../../axiosConfigs/axiosBaseSettings";

import "./ProfileEdit.scss"

export const ProfileEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        fetchProfileData();
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
        await axios.patch("https://morent-backend-xavm.onrender.com/api/profile/", {...data})
        .then(function (response) {
            
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));
            }
            if (response.status === 200) {
                dispatch(setUserInfo(response.data));
                navigate("/profile");
                
            }
          })
        .catch(function (error) {
            if (error.response.status === 401) {
                dispatch(setCurentAuthSession(false));
                navigate("/login");
            }
        });
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
                                <Link to="/" className="btn btn_white link">Back to main</Link>
                                <button type="submit" className="btn link">
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
