import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listDiseases } from '../actions/diseaseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Slider = () => {
    const diseaseList = useSelector(state => state.diseaseList);
    const { loading, error, diseases } = diseaseList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listDiseases())
    }, [dispatch])

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex]);

    const prevSlide = () => {
        const prevIndex = (currentIndex - 1 + diseases.length) % diseases.length;
        setCurrentIndex(prevIndex);
    };

    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % diseases.length;
        setCurrentIndex(nextIndex);
    };

    return (
        <>{loading ? (<Loader />) : error ? (<Message message={error} />) :
        <div className="carousel w-full h-96 relative overflow-hidden">
            {diseases.map((disease, index) => (
                <div
                    key={disease.id}
                    id={`slide${index}`}
                    className={`carousel-item absolute w-full h-full flex justify-center ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="aspect-w-16 aspect-h-9 max-h-full">
                        <img src={disease.img} alt={disease.title} className="object-cover h-96" />
                        <div className="absolute mb-2 inset-x-0 bottom-0 flex flex-col justify-center items-center ">
                            <h3 className="text-xl mb-2 text-white">{disease.title}</h3>
                            <button className="btn btn-primary mt-2">Details</button>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a
                            href={`#slide${(index - 1 + diseases.length) % diseases.length}`}
                            className="btn btn-circle"
                            onClick={prevSlide}
                        >
                            ❮
                        </a>
                        <a
                            href={`#slide${(index + 1) % diseases.length}`}
                            className="btn btn-circle"
                            onClick={nextSlide}
                        >
                            ❯
                        </a>
                    </div>
                </div>
            ))}
        </div>
        }</>
    );
};

export default Slider