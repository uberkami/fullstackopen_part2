import React from 'react'

const Notification = ({ message, setMessage, error }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5
    }
    const alertStyle = {
        color: 'black',
        fontSize: 12,
        padding: 10,
        marginBottom: 5
    }
    let showStyle = alertStyle
    if (error) {
        showStyle = errorStyle
    } else {
        showStyle = alertStyle
    }

    if (message === null) {
        return null
    } else {
        setTimeout(() => {
            setMessage(null)
        }, 2500)
        return <div style={showStyle}>{message}</div>
    }
}

export default Notification