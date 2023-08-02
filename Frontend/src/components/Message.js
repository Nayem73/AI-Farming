import React from 'react'

function Message({message}) {
    return (
        <div class="p-4 m-4 text-sm w-max text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            <span class="font-medium">{message}</span> 
        </div>
    )
}

export default Message