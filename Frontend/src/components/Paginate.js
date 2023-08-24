import React from 'react'
import { useDispatch } from 'react-redux'


import Pagination from '@mui/material/Pagination';

function Paginate({ pages, page, dispatcher_action}) {
    const dispatch = useDispatch();

    const updatePageNumber = (newValue) => {
        if (page !== newValue){
            dispatch(dispatcher_action({page:newValue}))
        }
    };

    return (pages > 1 && (
        <Pagination
        count={pages}
        page={page+1}
        variant="outlined" color="secondary"
        onChange={(event, value) => updatePageNumber(value-1)}
        />
    )
    )
}

export default Paginate
