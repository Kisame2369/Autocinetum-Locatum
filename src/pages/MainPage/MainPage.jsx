import css from "./MainPage.module.css"
import { Link } from "react-router-dom";

export default function MainPage() {
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

