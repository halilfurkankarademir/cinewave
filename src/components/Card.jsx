import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdFamilyRestroom } from "react-icons/md";
import "./Card.css";

const Card = ({ title, img, movieId , type,duration}) => {
    const navigate = useNavigate();

    const handleClick = () => { //Navigate specific movie detail page with movie id  
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <img src={img} className="card-img-top" alt={title} />
            <div className="card-body">
                <h6>{title}</h6>
                <p><i class="bi bi-camera-reels-fill"></i> {type}</p>
            </div>
        </div>
    );
};

export default Card;
