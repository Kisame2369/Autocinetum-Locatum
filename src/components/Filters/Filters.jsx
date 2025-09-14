import css from './Filters.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectBrands } from '../../redux/brands/selectors';
import { fetchCars } from '../../redux/cars/operations';
import { resetCars, setFilters } from '../../redux/cars/slice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
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

    const validationSchema = Yup.object({
        minMileage: Yup.string()
            .matches(/^\d+$/, 'Only numbers allowed')
            .test('min-length', 'Minimum 3 characters', (value) => {
                if (!value) return true;
                return value.replace(/,/g, '').length >= 3;
            }),
        maxMileage: Yup.string()
            .matches(/^\d+$/, 'Only numbers allowed')
            .test('min-length', 'Minimum 3 characters', (value) => {
                if (!value) return true; 
                return value.replace(/,/g, '').length >= 3;
            })
            .test('greater-than-min', 'Must be greater than "From" value', function(value) {
                const { minMileage } = this.parent;
                if (!value || !minMileage) return true;
                const minNum = parseInt(parseNumber(minMileage));
                const maxNum = parseInt(parseNumber(value));
                return maxNum > minNum;
            })
    });

    const handleSubmit = (values) => {
        const filters = {};
        filters.page = 1;
    
        if (values.selectedBrand) filters.brand = values.selectedBrand.value;
        if (values.selectedPrice) filters.rentalPrice = values.selectedPrice.value;
        if (values.minMileage) filters.minMileage = parseNumber(values.minMileage);
        if (values.maxMileage) filters.maxMileage = parseNumber(values.maxMileage);

        dispatch(resetCars());
        dispatch(fetchCars(filters));
        dispatch(setFilters(filters));
    };


    const DropdownIndicator = ({ selectProps, ...props }) => (
        <div
            {...props.innerProps}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                transform: selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                cursor: 'pointer'
            }}
        >
            <svg className={css.arrow} width="16" height="16">
                <use href="/sprite.svg#icon-arrow"></use>
            </svg>
        </div>
    );


    return (
        <Formik
            initialValues={{
                selectedBrand: null,
                selectedPrice: null,
                minMileage: '',
                maxMileage: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue, errors, touched }) => (
                <Form className={css.filters}>
                    <div className={css.brand}>
                        <label className={css.label} htmlFor="brand-select">Car brand</label>
                        <Select
                            id="brand-select"
                            value={values.selectedBrand}
                            onChange={(selectedOption) => setFieldValue('selectedBrand', selectedOption)}
                            options={brandOptions}
                            placeholder="Choose a brand"
                            styles={customSelectStylesBrand}
                            components={{ DropdownIndicator }}
                        />
                    </div>
                    
                    <div className={css.price}>
                        <label className={css.label} htmlFor="rentalPrice-select">Price/ 1 hour</label>
                        <Select
                            id="rentalPrice-select"
                            value={values.selectedPrice}
                            onChange={(selectedOption) => setFieldValue('selectedPrice', selectedOption)}
                            options={priceOptions}
                            placeholder="Choose a price"
                            styles={customSelectStylesPrice}
                            components={{ DropdownIndicator }}
                            formatOptionLabel={(option, { context }) => {
                                const style = {
                                    fontFamily: 'Manrope, sans-serif',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '20px',
                                    ...(context === 'value' && { color: 'var(--black)' })
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
                            <div className={css.fieldWrapper}>
                                <Field
                                    name="minMileage"
                                    type="text"
                                    className={`${css.from} ${errors.minMileage && touched.minMileage ? css.error : ''}`}
                                    placeholder="From"
                                    value={values.minMileage ? formatNumber(values.minMileage) : ''}
                                    onChange={(e) => setFieldValue('minMileage', parseNumber(e.target.value))}
                                    minLength="3"
                                    maxLength="7"
                                />
                                <ErrorMessage name="minMileage" component="div" className={css.errorMessage} />
                            </div>
                            
                            <div className={css.fieldWrapper}>
                                <Field
                                    name="maxMileage"
                                    type="text"
                                    className={`${css.to} ${errors.maxMileage && touched.maxMileage ? css.error : ''}`}
                                    placeholder="To"
                                    value={values.maxMileage ? formatNumber(values.maxMileage) : ''}
                                    onChange={(e) => setFieldValue('maxMileage', parseNumber(e.target.value))}
                                    minLength="3"
                                    maxLength="7"
                                />
                                <ErrorMessage name="maxMileage" component="div" className={css.errorMessage} />
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" className={css.btn}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    );
};