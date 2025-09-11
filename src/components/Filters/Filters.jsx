import css from './Filters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectBrands } from '../../redux/brands/selectors';
import { fetchCars } from '../../redux/cars/operations';

export default function Filters() {

    const dispatch = useDispatch
    
    const brands = useSelector(selectBrands)

    const handleSearch = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target.form);
        const filters = {};

    
        if (formData.get('brands')) filters.brand = formData.get('brands');
        if (formData.get('rentalPrice')) filters.rentalPrice = formData.get('rentalPrice');
        if (formData.get('minMileage')) filters.minMileage = formData.get('minMileage');
        if (formData.get('maxMileage')) filters.maxMileage = formData.get('maxMileage');

        dispatch(fetchCars(filters));
    };

    return (
        <form className={css.filters}>

            <label for="brand-select">Car brand</label>
            <select name="brands" id="brand-select">
                <option value="" hidden>Choose a brand</option>
                {brands.map(brand => (
                    <option value={brand.toLowerCase()}>{brand}</option>
                ))}
            </select>

            <label for="rentalPrice-select">Price/ 1 hour</label>
            <select name="rentalPrice" id="rentalPrice-select">
                <option value="" hidden>Choose a price</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="60">60</option>
                <option value="70">70</option>
                <option value="80">80</option>
                <option value="90">90</option>
                <option value="100">100</option>
            </select>

            <label for="mileage">Car mileage / km</label>

            <input
                placeholder="From"
                type="text"
                id="mileage"
                name="minMileage"
                required
                minlength="3"
                maxlength="7" />
            <input
                placeholder="To"
                type="text"
                id="mileage"
                name="maxMileage"
                required
                minlength="3"
                maxlength="7" />
            
            <button onClick={handleSearch} className={css.btn}>
                Search
            </button>


        </form>
        

    );
};