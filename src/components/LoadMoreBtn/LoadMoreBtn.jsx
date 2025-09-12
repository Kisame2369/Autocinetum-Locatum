import { selectHasNextPage, selectCurrentPage, selectCurrentFilters } from '../../redux/cars/selectors';
import { useSelector } from 'react-redux';
import css from './LoadMoreBtn.module.css';
import { useDispatch } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations';

export default function LoadMoreBtn() {

    const dispatch = useDispatch();

    const hasNextPage = useSelector(selectHasNextPage);
    const currentPage = useSelector(selectCurrentPage);
    const currentFilters = useSelector(selectCurrentFilters)

    const handleLoadMore = () => {
        dispatch(fetchCars({ 
            ...currentFilters, 
            page: currentPage + 1 
        }));
    };

    return (
        <>
            {hasNextPage && (<button onClick={handleLoadMore} className={css.btn}>Load more</button>)}
        </>
    );
};