import css from "./Header.module.css"
import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <div className={css.header}>
            <nav className={css.navbar}>
                <NavLink to="/">
                    <svg className={css.logo} width="104" height="16">
                        <use href="../../../public/sprite.svg#icon-Logo"></use>
                    </svg>
                </NavLink>
                <div className={css.navLinks}>
                    <NavLink to="/" className={css.link}>Home</NavLink>
                    <NavLink to="/catalog" className={css.link}>Catalog</NavLink>
                </div>
            </nav>
        </div>

    );
}