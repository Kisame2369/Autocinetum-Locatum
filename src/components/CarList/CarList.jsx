import css from './CarList.module.css';
import CarCard from '../CarCard/CarCard';

export default function CarList({ cars }) { 
    return (
        <div>
            <ul className={css.carList}>
                {cars.map(car => (
                    <li key={car.id} className={css.carListItem}>
                        <CarCard car={ car } />
                    </li>
                ))}
            </ul>
        </div>
    );
}