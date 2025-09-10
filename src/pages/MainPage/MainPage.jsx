import css from "./MainPage.module.css";
import { Link } from "react-router-dom";
import { selectCars } from "../../redux/cars/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCars } from "../../redux/cars/operations";
import { fetchBrands } from "../../redux/brands/operations.js";
import { selectBrands } from "../../redux/brands/selectors.js";

export default function MainPage() {
    
    const cars = useSelector(selectCars);
    const brands = useSelector(selectBrands);
    const dispatch = useDispatch();

     useEffect(() => {
        dispatch(fetchCars({}), );
     }, [dispatch]);
    
    useEffect(() => {
        dispatch(fetchBrands());
     }, [dispatch]);

    console.log(cars);
    console.log(brands);

    return (
        <div className={css.mainPage}>
            
            <div className={css.mainText}>
                <h1 className={css.titel}>Find your perfect rental car</h1>
                <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
                <Link to="/catalog">
                    <button className={css.button}>View Catalog</button>
                </Link>
            </div>
        </div>
    );
}

