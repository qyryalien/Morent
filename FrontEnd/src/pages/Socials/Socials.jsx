import React from 'react';
import "./Socials.scss";
import {Link} from "react-router-dom";

export const Socials = () => {
    return (
        <div className='Socials'>
            Page Socials
            <Link to="/">Go HOME</Link>
        </div>
    )
}