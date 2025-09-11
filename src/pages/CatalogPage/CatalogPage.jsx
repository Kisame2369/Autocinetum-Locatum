import css from "./CatalogPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectCars } from "../../redux/cars/selectors";
import { fetchCars } from "../../redux/cars/operations";
import CarList from "../../components/CarList/CarList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import Filters from "../../components/Filters/Filters";
import { fetchBrands } from "../../redux/brands/operations";

export default function CatalogPage() { 

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCars({}), );
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchBrands({}), );
    }, [dispatch]);

    const cars = useSelector(selectCars);

    return (
        <div className={css.catalogPage}>
            <Filters/>
            <CarList cars={cars} />
            <LoadMoreBtn/>
        </div>
    );
};