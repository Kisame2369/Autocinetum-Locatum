import css from './Filters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectBrands } from '../../redux/brands/selectors';
import { fetchCars } from '../../redux/cars/operations';
import { resetCars, setFilters } from '../../redux/cars/slice';
import Select from 'react-select';
import { useState } from 'react';
import { customSelectStylesBrand, customSelectStylesPrice } from './Styles';

export default function Filters() {
    const dispatch = useDispatch();
    const brands = useSelector(selectBrands);

    const formatNumber = (value) => {
         if (!value) return '';
         const number = value.replace(/\D/g, '');
         return Number(number).toLocaleString();
    };

    const parseNumber = (value) => value.replace(/,/g, '');

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [minMileage, setMinMileage] = useState('');
    const [maxMileage, setMaxMileage] = useState('');

    const brandOptions = brands.map(brand => ({
        value: brand.toLowerCase(),
        label: brand
    }));

    const priceOptions = [
        { value: '30', label: '30' },
        { value: '40', label: '40' },
        { value: '50', label: '50' },
        { value: '60', label: '60' },
        { value: '70', label: '70' },
        { value: '80', label: '80' },
        { value: '90', label: '90' },
        { value: '100', label: '100' }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        
        const filters = {};
        filters.page = 1;
    
        if (selectedBrand) filters.brand = selectedBrand.value;
        if (selectedPrice) filters.rentalPrice = selectedPrice.value;
        if (minMileage) filters.minMileage = minMileage;
        if (maxMileage) filters.maxMileage = maxMileage;

        dispatch(resetCars());
        dispatch(fetchCars(filters));
        dispatch(setFilters(filters));
    };

    return (
        <form className={css.filters}>
            <div className={css.brand}>
                <label className={css.label} htmlFor="brand-select">Car brand</label>
                <Select
                    id="brand-select"
                    value={selectedBrand}
                    onChange={setSelectedBrand}
                    options={brandOptions}
                    placeholder="Choose a brand"
                    styles={customSelectStylesBrand}
                /></div>
            <div className={css.price}>
                <label className={css.label} htmlFor="rentalPrice-select">Price/ 1 hour</label>
                <Select
                    id="rentalPrice-select"
                    value={selectedPrice}
                    onChange={setSelectedPrice}
                    options={priceOptions}
                    placeholder="Choose a price"
                    styles={customSelectStylesPrice}
                    formatOptionLabel={(option, { context }) => {
                        const style = {
                            fontFamily: 'Manrope, sans-serif',
                            fontWeight: 500,
                            fontSize: '16px',
                            lineHeight: '20px',
                            color: 'var(--black)',
                        };

                        if (context === 'value') {
                            return <div style={style}>{`To $${option.value}`}</div>;
                        }

                        return <div style={style}>{option.label || `To $${option.value}`}</div>;
                    }}

                />
            </div>

            <div className={css.input}>
                <label className={css.label} htmlFor="mileage">Car mileage / km</label>
                
                <div className={css.div}>

                    <input
                        className={css.from}
                        placeholder="From"
                        type="text"
                        id="mileage"
                        name="minMileage"
                        value={minMileage ? formatNumber(minMileage) : ''}
                        onChange={(e) => setMinMileage(parseNumber(e.target.value))}
                        minLength="3"
                        maxLength="7" />
                    <input
                        className={css.to}
                        placeholder="To"
                        type="text"
                        id="mileage"
                        name="maxMileage"
                        value={maxMileage ? formatNumber(maxMileage) : ''}
                        onChange={(e) => setMaxMileage(parseNumber(e.target.value))}
                        minlength="3"
                        maxLength="7" />
                </div>
            </div>
            <button onClick={handleSearch} className={css.btn}>
                Search
            </button>
        </form>
    );
};