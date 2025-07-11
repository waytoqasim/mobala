import React, { useEffect, useState } from 'react';

import "../../App.css";


function Loading({ type, color }) {
  const [timer, setTimer] = useState(1);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer < 50) {
        setTimer(timer + 1);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(()=>{
    setBarWidth(barWidth + 100 / (2 ** (timer)));
  },[timer]);

  return (
    <div style={{
      width: '100%',
      height: '5px',
      backgroundColor: 'lightgray',
    }}>
      <div style={{
        width: `${barWidth}%`,
        height: '100%',
        backgroundColor: 'blue',
      }} />
    </div>
  );
};

export default Loading;
