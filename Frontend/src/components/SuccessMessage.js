// import React from 'react'

// function SuccessMessage({ message }) {
//     return (
//         <div class="p-4 mt-4 text-sm w-max text-black bg-green-400 rounded-lg dark:bg-green-400" role="alert">
//             <span class="font-medium">{message}</span>
//         </div>
//     )
// }

// export default SuccessMessage;



import React, { useState, useEffect } from 'react';

function SuccessMessage({ message }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShow(false);
        }, 10000);

        return () => {
            clearTimeout(timeId);
        };
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div class="p-4 mt-4 text-sm w-max text-black bg-green-400 rounded-lg dark:bg-green-400" role="alert">
            <span class="font-medium">{message}</span>
        </div>
    );
}

export default SuccessMessage;
