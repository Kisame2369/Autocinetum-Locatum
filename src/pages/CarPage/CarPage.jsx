import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../../redux/cars/operations.js";
import { selectInfoCar, selectIsLoading } from "../../redux/cars/selectors.js";
import css from "./CarPage.module.css";
import CarForm from "../../components/Form/Form.jsx"

export default function CarPage() {
    
 const { id } = useParams();           
  const dispatch = useDispatch();
  const car = useSelector(selectInfoCar);
  const isLoading = useSelector(selectIsLoading)

  
  useEffect(() => {
    dispatch(fetchCarById(id));         
  }, [dispatch, id]);

  
  if (isLoading) return <div>Loading...</div>;
  if (!car) return null;
    
  const parts = car.address.split(",").map(str => str.trim());
  const city = parts[parts.length - 2];
  const country = parts[parts.length - 1];

  const mileage = car.mileage;
  const run  = mileage.toLocaleString("uk-UA");

  return (
    <div className={css.carPage}>
      <div className={css.left}>
        <img src={car.img} alt={car.model} className={css.image} />
        <CarForm />
      </div>
      <div className={css.right}>
        <div className={css.head}>
          <h2 className={css.titel}>{car.brand} {car.model}, {car.year}</h2>
          <p className={css.id}>id: {car.id.slice(0, 8)}</p>
        </div>
        <div className={css.body}>
          <svg className={css.map} width="16" height="16">
            <use href="/sprite.svg#icon-map"></use>
          </svg>
          <p className={css.location}>{city}, {country}</p>
          <p className={css.mileage}>Mileage: {run} km</p>
        </div>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
        <h3 className={css.listTitel}>Rental Conditions:</h3>
        <ul className={css.list}>
          {car.rentalConditions.map(condition => (
            <li className={css.listItem}>
              <svg className={css.check} width="16" height="16">
                <use href="/sprite.svg#icon-check"></use>
              </svg>
              {condition}
            </li>
          ))}
        </ul>
        <h3 className={css.listTitel}>Car Specifications:</h3>
        <ul className={css.list}>
          <li className={css.listItem}>
            <svg className={css.calendar} width="16" height="16">
              <use href="/sprite.svg#icon-calendar"></use>
            </svg>
            Year: {car.year}
          </li>
          <li className={css.listItem}>
            <svg className={css.car} width="16" height="16">
              <use href="/sprite.svg#icon-car"></use>
            </svg>
            Type: {car.type}
          </li>
          <li className={css.listItem}>
            <svg className={css.gas} width="16" height="16">
              <use href="/sprite.svg#icon-gas"></use>
            </svg>
            Fuel Consumption: {car.fuelConsumption}
          </li>
          <li className={css.listItem}>
            <svg className={css.gear} width="16" height="16">
              <use href="/sprite.svg#icon-gear"></use>
            </svg>
            Engine Size: {car.engineSize}
          </li>
        </ul>
        <h3 className={css.listTitel}>Accessories and functionalities:</h3>
        <ul className={css.lastList}>
          {car.accessories.map(accessory => (
            <li className={css.listItem}>
              <svg className={css.check} width="16" height="16">
                <use href="/sprite.svg#icon-check"></use>
              </svg>
              {accessory}
            </li>
          ))}
          {car.functionalities.map(functionality => (
            <li className={css.listItem}>
              <svg className={css.check} width="16" height="16">
                <use href="/sprite.svg#icon-check"></use>
              </svg>
              {functionality}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}