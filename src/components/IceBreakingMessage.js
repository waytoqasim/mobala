import React from 'react';

export const IceBreakingMessage = ({
    setMsg,
    setShowIceBreakingMessage
}) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                rowGap: 5,
                marginLeft: 80
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 5,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'grey',
                    padding: 5,
                    cursor: 'pointer'
                }}
                onClick={(e) => {
                    setMsg(e.target.textContent);
                    setShowIceBreakingMessage(false);
                }}
            >
                Hello, I am interested in dealing with you.
            </div>
            <div
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 5,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'grey',
                    padding: 5,
                    cursor: 'pointer'
                }}
                onClick={(e) => {
                    setMsg(e.target.textContent);
                    setShowIceBreakingMessage(false);
                }}
            >
                Hello, Can we meet sometime and discuss?
            </div>
            <div
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderRadius: 5,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'grey',
                    padding: 5,
                    cursor: 'pointer'
                }}
                onClick={(e) => {
                    setMsg(e.target.textContent);
                    setShowIceBreakingMessage(false);
                }}
            >
                Hello,  Can you give me a better deal than what you are showing?
            </div>
        </div>
    )
}