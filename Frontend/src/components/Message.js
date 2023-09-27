// import React from 'react'

// function Message({message}) {
//     return (
//         <div class="p-4 m-4 text-sm w-max text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
//             <span class="font-medium">{message}</span> 
//         </div>
//     )
// }

// export default Message


import React, { useState, useEffect } from 'react';

function Message({ message }) {
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
        <div class="flex justify-center p-4 m-4 text-sm w-max text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            <span class="font-medium">{message}</span>
        </div>
    );
}

export default Message;
