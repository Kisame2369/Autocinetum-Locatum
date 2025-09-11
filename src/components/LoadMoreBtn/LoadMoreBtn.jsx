import { selectHasNextPage, selectCurrentPage } from '../../redux/cars/selectors';
import { useSelector } from 'react-redux';
import css from './LoadMoreBtn.module.css';
import { useDispatch } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations';

export default function LoadMoreBtn() {

    const dispatch = useDispatch();

    const hasNextPage = useSelector(selectHasNextPage);
    const currentPage = useSelector(selectCurrentPage);

    const handleLoadMore = () => {
        dispatch(fetchCars({ page: currentPage + 1 }));
    };

    return (
        <>
            {hasNextPage && (<button onClick={handleLoadMore} className={css.btn}>Load more</button>)}
        </>
    );
};