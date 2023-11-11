import React, { useEffect } from 'react'

function Alert({background,msg, removeAlert, list}) {
    // stop showing the alert
    useEffect(() => {
        const timeOut = setTimeout(() => {
            removeAlert()
        }, 2000)
        return ()=> clearTimeout(timeOut);
    }, [list])

    return (
        <p className={`${background} flex h-[40px] rounded-lg text-black text-lg tracking-widest items-center justify-center`}>{msg}</p>
    )
}

export default Alert