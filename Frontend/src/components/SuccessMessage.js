import React from 'react'

function SuccessMessage({ message }) {
    return (
        <div class="p-4 mt-4 text-sm w-max text-black bg-green-400 rounded-lg dark:bg-green-400" role="alert">
            <span class="font-medium">{message}</span>
        </div>
    )
}

export default SuccessMessage;