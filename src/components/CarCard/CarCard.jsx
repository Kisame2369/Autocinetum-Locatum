import css from "./CarCard.module.css"; 
import { Link } from "react-router-dom";

export default function CarCard({ car }) {

    const parts = car.address.split(",").map(str => str.trim());
    const city = parts[parts.length - 2];
    const country = parts[parts.length - 1];

    const mileage = car.mileage;
    const run  = mileage.toLocaleString("uk-UA");


    return (
        <div className={css.carCard}>
            <img src={car.img} alt={car.model} className={css.image} />
            <div className={css.head}>
                <h2 className={css.titel}>{car.brand} <span className={css.model}>{car.model}</span>, {car.year}</h2>
                <h2 className={css.price}>${car.rentalPrice}</h2>
            </div>
            <div className={css.info}>
                <div className={css.top}>
                <span className={css.info}>{city}</span>
                <svg className={css.separator} width="2" height="16">
                    <use href="../../../public/sprite.svg#icon-separator"></use>
                </svg>
                <span className={css.info}>{country}</span>
                <svg className={css.separator} width="2" height="16">
                    <use href="../../../public/sprite.svg#icon-separator"></use>
                </svg>
                <span className={css.info}>{car.rentalCompany}</span>
                <svg className={css.separator} width="2" height="16">
                    <use href="../../../public/sprite.svg#icon-separator"></use>
                    </svg>
                </div>
                <div className={css.bottom}>
                    <span className={css.info}>{car.type}</span> 
                    <svg className={css.separator} width="2" height="16">
                    <use href="../../../public/sprite.svg#icon-separator"></use>
                    </svg>
                    <span className={css.info}>{run} km</span>
                </div>
            </div>
            <Link to={`/catalog/${car.id}`}>
                <button className={css.button}>Read More</button>
            </Link>    
        </div>
    );
};