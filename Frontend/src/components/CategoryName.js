import React, { useEffect, useState } from 'react';
import { listCrops } from '../actions/cropActions.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { listDiseases } from '../actions/diseaseActions.js';
import { useNavigate } from 'react-router-dom'


const CategoryName = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //_______________________my code______________________//
    const params = useParams();

    const keyword = params.keyword;

    const cropList = useSelector(state => state.cropList);

    const { loading, error, crops } = cropList;
    //_______________________my code______________________//

    useEffect(() => {
        dispatch(listCrops(keyword))
    }, [dispatch, keyword])






    



    const options = []
    crops.map((crop) => options.push(
        {
            value: crop.title,
            label: crop.title
        }
    ))

    const [selectedOption, setSelectedOption] = useState(null);

    const selectedCrop = (selected) => {

        navigate(`?crop=${selected.value}`);
        dispatch(listDiseases({crop:selected.value}));
    }

    return <Select className='shadow-lg p-0 bg-dark rounded-lg '
    options={options}
    onChange={selectedCrop}
    />
}

export default CategoryName
