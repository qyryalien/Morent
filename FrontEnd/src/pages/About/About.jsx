import React from 'react';
import "./About.scss"
import {Link} from "react-router-dom";

export const About = () => {
    return (
        <div className='About'>
            Page About
            <Link to="/">Go HOME</Link>
        </div>
    )
}