import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import axios from "../../axiosConfigs/axiosAuthSettings";
import { setCurentAuthSession } from "../../redux/slices/auth";

import "./Login.scss"
import { Form } from "../../components/Form/Form";
// import { fetchAuth, selectIsAuth, login } from "../../redux/slices/auth";

export const Login = () => {
    const isAuth = useSelector(state => state.auth.curentAuthSession);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [info, setInfo] = React.useState();
    
    async function fetchAuth(params) {
        try {
            const response = await axios.post("/api/login/", params);
            if (response.status === 401) {
                dispatch(setCurentAuthSession(false));
                alert("Неверный логин или пароль, повторите попытку.")    
            }
            if (response.status === 200) {
                dispatch(setCurentAuthSession(true));
                setIsLoaded(true);
                setInfo(response.data);
                navigate("/");
            }
        } catch (error) {
            // try {
            //     const response2 = await axios.post("/api/login/", params);
            //     if (response2.status === 200) {
            //         dispatch(setCurentAuthSession(true));
            //         setIsLoaded(true);
            //         setInfo(response2.data);
            //         navigate("/");
            //     }
            // } catch (error2) {
            //     if (error2.response.status === 401) {
            //         dispatch(setCurentAuthSession(false));
            //         // navigate("/login");
            //         alert("Неверный логин или пароль, повторите попытку.")
            //         console.log("Неверный логин или пароль, повторите попытку.")
            //     }                
            // }
            if (error.response.status === 401) {
                    dispatch(setCurentAuthSession(false));
                    // navigate("/login");
                    alert("Неверный логин или пароль, повторите попытку.")
                    console.log("Неверный логин или пароль, повторите попытку.")
                }
            if (error.response.status === 200) {
                dispatch(setCurentAuthSession(true));
                setIsLoaded(true);
                setInfo(error.response.data);
                navigate("/");
            }
        }
    }     
    // React.useEffect(() => {
    //     fetchAuth(data)
    // },[])

    const onSubmit = async (data) => {
        // login(data);
        // const {payload} = 
        fetchAuth(data);
        // const res = await dispatch(fetchAuth(data));

        // const res = fetchAuth(data)
        // console.log("res ", res)s
        // console.log("payload", payload)
        // if (!payload){
        //     return alert("Не удалось войти")
        // }  
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