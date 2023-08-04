import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Slider = ({items}) => {

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
        let prevIndex = (currentIndex - 1 + items.length) % items.length;
        if (isNaN(prevIndex)) {
            prevIndex = 0;
        }
        setCurrentIndex(prevIndex);
    };

    const nextSlide = () => {
        let nextIndex = (currentIndex + 1) % items.length;
        if (isNaN(nextIndex)) {
            nextIndex = 0;
        }
        setCurrentIndex(nextIndex);
    };

    return (
        <div className="carousel w-full h-96 relative overflow-hidden">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    id={`slide${index}`}
                    className={`carousel-item absolute w-full h-full flex justify-center ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <div className="aspect-w-16 aspect-h-9 max-h-full">
                        <img src={item.img} alt={item.img} className="object-cover h-96" />
                        {item.title?
                        <div className="absolute mb-2 inset-x-0 bottom-0 flex flex-col justify-center items-center ">
                            <h3 className="text-xl mb-2 text-white">{item.title}</h3>
                            <Link to={`/disease/${item.crop.title}/${item.title}/`}>
                                <button className="btn btn-primary mt-2">Details</button>
                            </Link>
                        </div>:<></>}
                    </div>
                    <div className="absolute flex justify-between transform-translate-y-1/2 left-5 right-5 top-1/2">
                        <a
                            href={`#slide${(index - 1 + items.length) % items.length}`}
                            className="btn btn-circle"
                            onClick={prevSlide}
                        >
                            ❮
                        </a>
                        <a
                            href={`#slide${(index + 1) % items.length}`}
                            className="btn btn-circle"
                            onClick={nextSlide}
                        >
                            ❯
                        </a>
                    </div>
                </div>
            ))}
        </div>
        
    );
};

export default Slider